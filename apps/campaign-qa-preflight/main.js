// Find the HTML elements that JavaScript will fill or listen to.
const campaignSummary = document.querySelector('#campaign-summary');
const placementRows = document.querySelector('#placement-rows');
const placementSelect = document.querySelector('#placement-select');
const bannerFileInput = document.querySelector('#banner-file');
const runCheckButton = document.querySelector('#run-check');
const uploadStatus = document.querySelector('#upload-status');
const sampleCleanButton = document.querySelector('#sample-clean');
const sampleBrokenButton = document.querySelector('#sample-broken');
const reportSection = document.querySelector('#report');
const reportBody = document.querySelector('#report-body');
const sheetRows = document.querySelector('#sheet-rows');
const downloadSheetButton = document.querySelector('#download-sheet');

// Stores the accepted file. It uses let because the value changes with each upload.
let selectedFile = null;

// Stores the latest result for each placement, like {'PL-001': result}.
const results = {};

// Reject files far larger than any banner before trying to unpack them.
const maxUploadMb = 20;

const verdictText = {cleared: 'Cleared for trafficking', review: 'Cleared with warnings', hold: 'Hold for fixes'};
const statusText = {pass: 'Pass', warn: 'Warning', fail: 'Fail', skip: 'Not checked'};

// File names and code from a .zip can't be trusted, so make them safe before using innerHTML.
// Without this, a file named <img src=x onerror=...> could run as code on the page.
const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (character) => `&#${character.charCodeAt(0)};`);

// Find the placement chosen in the dropdown.
const getSelectedPlacement = () => campaignData.placements.find(({id}) => id === placementSelect.value);

// Display the insertion order on the page.
const renderCampaign = () => {
  // Destructuring pulls out the values we need so we don't repeat campaignData.
  const {advertiser, campaignName, ioNumber, flightStart, flightEnd, maxFileKb, placements} = campaignData;
  const fields = [['Advertiser', advertiser], ['Campaign', campaignName], ['IO number', ioNumber], ['Flight', `${flightStart} to ${flightEnd}`], ['Max weight', `${maxFileKb} KB`]];

  campaignSummary.innerHTML = fields.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('');

  // map() turns each placement into one HTML row.
  // join('') combines the rows into one string, without commas between them.
  placementRows.innerHTML = placements.map(({id, publisher, width, height, clickUrl}) => `
    <tr>
      <td>${id}</td>
      <td>${publisher}</td>
      <td>${width}x${height}</td>
      <td>${clickUrl}</td>
    </tr>
  `).join('');
};

// Build the placement dropdown from the same data as the table.
// A new placement in campaign-data.js will appear in both places automatically.
const renderPlacementOptions = () => {
  placementSelect.innerHTML = campaignData.placements.map(({id, publisher, width, height}) => `
    <option value="${id}">${id} | ${publisher} | ${width}x${height}</option>
  `).join('');
};

// Show the saved report for the selected placement, or directions if there isn't one.
const renderReport = () => {
  const result = results[placementSelect.value];

  if (!result) {
    reportBody.innerHTML = '<p class="empty">Choose a banner and run the check. Each result appears here with what to fix.</p>';
    return;
  }

  const {checks, counts, verdict, fileName, sizeKb} = result;
  const tally = [`${counts.pass} passed`, `${counts.warn} ${counts.warn === 1 ? 'warning' : 'warnings'}`, `${counts.fail} failed`];
  if (counts.skip) tally.push(`${counts.skip} not checked`);

  const rows = checks.map(({label, status, found, fix}) => `
    <li class="check check-${status}">
      <span class="badge">${statusText[status]}</span>
      <div>
        <h3>${escapeHtml(label)}</h3>
        <p>${escapeHtml(found)}</p>
        ${fix ? `<p class="fix">Fix: ${escapeHtml(fix)}</p>` : ''}
      </div>
    </li>
  `).join('');

  reportBody.innerHTML = `
    <div class="verdict">
      <p class="stamp stamp-${verdict}">${verdictText[verdict]}</p>
      <div>
        <p class="file-name">${escapeHtml(fileName)}, ${sizeKb.toFixed(1)} KB</p>
        <p>${tally.join(', ')}</p>
      </div>
    </div>
    <ul class="checks">${rows}</ul>
  `;
};

// Build one object per placement so the table and the CSV stay identical.
const getSheetData = () => campaignData.placements.map((placement) => {
  const {id, publisher, width, height, clickUrl} = placement;
  const result = results[id];
  const failed = result ? result.checks.filter(({status}) => status === 'fail').map(({label}) => label).join('; ') : '';

  return {id, publisher, size: `${width}x${height}`, clickUrl, fileName: result?.fileName || '', weight: result ? `${result.sizeKb.toFixed(1)} KB` : '', verdict: result?.verdict || 'none', status: result ? verdictText[result.verdict] : 'Not checked', failed};
});

// Show each placement's QA status in the trafficking sheet.
const renderSheet = () => {
  const {flightStart, flightEnd} = campaignData;

  sheetRows.innerHTML = getSheetData().map(({id, publisher, size, fileName, weight, verdict, status}) => `
    <tr>
      <td>${id}</td>
      <td>${publisher}</td>
      <td>${size}</td>
      <td>${flightStart} to ${flightEnd}</td>
      <td>${escapeHtml(fileName) || '&ndash;'}</td>
      <td>${weight || '&ndash;'}</td>
      <td><span class="sheet-status sheet-${verdict}">${status}</span></td>
    </tr>
  `).join('');
};

// Run the QA checks and show the result.
const runFile = async (file) => {
  const placement = getSelectedPlacement();

  // Lock the buttons so a second click can't start an overlapping check.
  const buttons = [runCheckButton, sampleCleanButton, sampleBrokenButton];
  buttons.forEach((button) => { button.disabled = true; });
  uploadStatus.textContent = `Checking ${file.name}...`;

  // A damaged .zip makes JSZip throw an error, so catch it and explain the problem.
  try {
    results[placement.id] = await runChecks(file, placement, campaignData);
    uploadStatus.textContent = `Checked ${file.name} against ${placement.id}.`;
    renderReport();
    renderSheet();
    reportSection.focus();
  } catch {
    uploadStatus.textContent = `Rejected: ${file.name} couldn't be opened as a .zip file. Zip it again and retry.`;
  }

  sampleCleanButton.disabled = false;
  sampleBrokenButton.disabled = false;
  runCheckButton.disabled = !selectedFile;
};

// Say which file is ready to check.
const renderFileStatus = () => {
  // file.size is in bytes. Divide by 1024 to get kilobytes.
  // toFixed(1) keeps one decimal place for a cleaner display.
  uploadStatus.textContent = selectedFile ? `Ready: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)` : 'No file selected.';
};

// Changing the placement shows its saved report and clears the old status message.
const handlePlacementChange = () => {
  renderReport();
  renderFileStatus();
};

// Validate the file each time the user makes a selection.
const handleFileChange = (event) => {
  // files is a list. This pulls out the first file, or undefined if there isn't one.
  const [file] = event.target.files;
  selectedFile = null;
  runCheckButton.disabled = true;

  // Guard clause: stop early if the user cancelled the file picker.
  if (!file) {
    uploadStatus.textContent = 'No file selected.';
    return;
  }

  // Check the real filename because the accept attribute is only a filter.
  // toLowerCase() makes .ZIP and .zip pass the same test.
  if (!file.name.toLowerCase().endsWith('.zip')) {
    event.target.value = ''; // Clear the rejected file from the input.
    uploadStatus.textContent = `Rejected: ${file.name} is not a .zip file.`;
    return;
  }

  if (file.size > maxUploadMb * 1024 * 1024) {
    event.target.value = '';
    uploadStatus.textContent = `Rejected: ${file.name} is over ${maxUploadMb} MB.`;
    return;
  }

  selectedFile = file;
  runCheckButton.disabled = false;
  renderFileStatus();
};

// Samples are stored as base64 text so they work without a server.
// atob() turns the text back into bytes, and File wraps the bytes like a real upload.
const makeSampleFile = ({name, data}) => new File([Uint8Array.from(atob(data), (character) => character.charCodeAt(0))], name, {type: 'application/zip'});

// The clean sample matches the selected placement's size.
const runCleanSample = () => runFile(makeSampleFile(sampleBanners[`${getSelectedPlacement().width}x${getSelectedPlacement().height}`]));
const runBrokenSample = () => runFile(makeSampleFile(sampleBanners.broken));

// Build the CSV text. A cell with a comma, quote, or line break needs quotes around it.
// A leading ', tells a spreadsheet to treat =, +, -, or @ as text, not as a formula.
const toCsvCell = (value) => {
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : String(value);
  return /[",\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
};

// Create the CSV and hand it to the browser as a download.
const downloadSheet = () => {
  const {advertiser, campaignName, ioNumber, flightStart, flightEnd} = campaignData;
  const header = ['IO Number', 'Advertiser', 'Campaign', 'Placement ID', 'Publisher', 'Size', 'Flight Start', 'Flight End', 'Click URL', 'Creative File', 'Weight', 'QA Status', 'Failed Checks'];
  const rows = getSheetData().map(({id, publisher, size, clickUrl, fileName, weight, status, failed}) => [ioNumber, advertiser, campaignName, id, publisher, size, flightStart, flightEnd, clickUrl, fileName, weight, status, failed]);
  const csv = [header, ...rows].map((row) => row.map(toCsvCell).join(',')).join('\r\n');

  // A temporary link is the standard way to save a file made in the browser.
  const url = URL.createObjectURL(new Blob([csv], {type: 'text/csv'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = `${ioNumber}-trafficking-sheet.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// Run these once when the page loads.
renderCampaign();
renderPlacementOptions();
renderReport();
renderSheet();

// Connect each control to the function it runs.
bannerFileInput.addEventListener('change', handleFileChange);
placementSelect.addEventListener('change', handlePlacementChange);
runCheckButton.addEventListener('click', () => runFile(selectedFile));
sampleCleanButton.addEventListener('click', runCleanSample);
sampleBrokenButton.addEventListener('click', runBrokenSample);
downloadSheetButton.addEventListener('click', downloadSheet);
