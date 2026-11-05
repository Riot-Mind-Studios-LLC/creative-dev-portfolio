// The inspector. Everything here reads the .zip and reports what it finds.
// Nothing in the banner is ever run: its code is treated as text, the same way
// you would read a label on a package without opening the product.

const textExtensions = /\.(html?|css|js)$/i;
const imageExtensions = /\.(png|jpe?g|gif|webp)$/i;
const backupNames = /(backup|fallback|static)/i;
const junkFiles = /(^|\/)(__MACOSX\/|\.DS_Store$|Thumbs\.db$)/;
const sourceFiles = /\.(psd|ai|fla|sketch|aep)$/i;

// Skip reading any single text file above this size. Real banner code is far smaller,
// and the limit stops a huge file from freezing the browser tab.
const maxTextBytes = 2 * 1024 * 1024;

// One row of the report. status is pass, warn, fail, or skip.
// found says what the tool saw. fix says what to do about it.
const makeCheck = (label, status, found, fix = '') => ({label, status, found, fix});

// A row for a check that couldn't run because an earlier problem blocked it.
const skipCheck = (label, reason) => makeCheck(label, 'skip', reason);

// Remove JavaScript comments so old, commented-out code can't trigger a false alarm.
// The whitespace rule keeps the // inside "https://" from counting as a comment.
const stripJsComments = (code) => code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/.*$/gm, '$1');

// Sort a reference into one of three bins: ignore it, it's external, or it's in the .zip.
const classifyRef = (ref) => {
  if (/^(data:|blob:|#|about:|javascript:|mailto:|tel:)/i.test(ref)) return 'ignore';
  return /^(https?:)?\/\//i.test(ref) ? 'external' : 'local';
};

// Turn a relative path into a full path from the top of the banner.
// URL does the hard part: it resolves ./ and ../ and removes ?query and #hash.
// The zip.invalid address is a stand-in that never gets contacted.
const resolvePath = (ref, baseFolder) => {
  const {pathname} = new URL(ref, `https://zip.invalid/${baseFolder}`);
  return decodeURIComponent(pathname.slice(1));
};

// Pull file references out of CSS: url(...) values and @import lines.
const findCssRefs = (css) => [...css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)|@import\s+['"]([^'"]+)['"]/g)].map((match) => match[1] || match[2]);

// Find image paths written as text in JavaScript, such as a preload list.
const findJsImageRefs = (code) => [...code.matchAll(/["'`]([\w./-]+\.(?:png|jpe?g|gif|webp|svg))["'`]/gi)].map((match) => match[1]);

// Unpack the .zip into a simple object the checks can read.
const readPackage = async (file) => {
  const zip = await JSZip.loadAsync(file);

  // Keep real files only. Folders appear in a .zip as their own entries.
  const allPaths = Object.values(zip.files).filter((entry) => !entry.dir).map((entry) => entry.name);
  const junk = allPaths.filter((path) => junkFiles.test(path));
  const paths = allPaths.filter((path) => !junkFiles.test(path));

  // The shortest path wins, so a banner's main index.html beats one buried deeper.
  const indexPath = paths.filter((path) => /(^|\/)index\.html?$/i.test(path)).sort((a, b) => a.length - b.length)[0];
  const rootFolder = indexPath ? indexPath.slice(0, indexPath.lastIndexOf('/') + 1) : '';

  // Read every code file as text. Skipped files are remembered so the report can mention them.
  const texts = {};
  const skipped = [];
  for (const path of paths.filter((item) => textExtensions.test(item))) {
    const bytes = await zip.file(path).async('uint8array');
    if (bytes.length > maxTextBytes) {
      skipped.push(path);
      continue;
    }
    texts[path] = new TextDecoder().decode(bytes);
  }

  return {zip, paths, junk, skipped, texts, indexPath, rootFolder, sizeKb: file.size / 1024};
};

// Read index.html once and collect what the later checks need.
// DOMParser builds a document without running scripts or loading files.
const readBanner = (pkg) => {
  const doc = new DOMParser().parseFromString(pkg.texts[pkg.indexPath] || '', 'text/html');
  const jsPaths = Object.keys(pkg.texts).filter((path) => /\.js$/i.test(path));
  const cssPaths = Object.keys(pkg.texts).filter((path) => /\.css$/i.test(path));

  // Combine inline scripts with .js files so the checks search one block of code.
  const inlineScripts = [...doc.querySelectorAll('script:not([src])')].map((script) => script.textContent);
  const code = [...inlineScripts, ...jsPaths.map((path) => pkg.texts[path])].map(stripJsComments).join('\n');

  // Each reference remembers its source, because paths are relative to the file they're in.
  const htmlRefs = [...doc.querySelectorAll('[src], link[href]')].map((node) => node.getAttribute('src') || node.getAttribute('href'));
  const inlineCss = [...doc.querySelectorAll('style')].map((style) => style.textContent);
  const styleAttrs = [...doc.querySelectorAll('[style]')].map((node) => node.getAttribute('style'));

  const refs = [
    ...htmlRefs.map((ref) => ({ref, base: pkg.rootFolder, source: 'html'})),
    ...[...inlineCss, ...styleAttrs].flatMap(findCssRefs).map((ref) => ({ref, base: pkg.rootFolder, source: 'css'})),
    ...cssPaths.flatMap((path) => findCssRefs(pkg.texts[path]).map((ref) => ({ref, base: path.slice(0, path.lastIndexOf('/') + 1), source: 'css'}))),
    ...findJsImageRefs(code).map((ref) => ({ref, base: pkg.rootFolder, source: 'js'}))
  ];

  const links = [...doc.querySelectorAll('a[href]')].map((node) => node.getAttribute('href'));
  return {doc, code, refs, links};
};

// Rule 1: The package has to be something an ad server can accept.
const checkPackage = (pkg) => {
  const label = 'Package structure';
  if (!pkg.indexPath) return makeCheck(label, 'fail', 'No index.html found in the .zip.', 'Add an index.html. Ad servers load it first.');
  if (pkg.rootFolder) return makeCheck(label, 'fail', `index.html is inside the folder ${pkg.rootFolder}`, 'Zip the banner files themselves, not the folder that holds them.');

  const extras = [...pkg.junk, ...pkg.paths.filter((path) => sourceFiles.test(path))];
  if (extras.length) return makeCheck(label, 'warn', `Unneeded files in the .zip: ${extras.length} (${extras.slice(0, 3).join(', ')})`, 'Remove system and design source files. They add weight and some ad servers reject them.');

  return makeCheck(label, 'pass', `index.html is at the top level with ${pkg.paths.length} files in the package.`);
};

// Rule 2: The banner has to declare the size the placement bought.
const checkSize = (banner, placement) => {
  const label = 'Dimensions';
  const expected = `${placement.width}x${placement.height}`;
  const content = banner.doc.querySelector('meta[name="ad.size"]')?.getAttribute('content') || '';
  const match = content.match(/width=(\d+)\s*,\s*height=(\d+)/i);

  if (!match) return makeCheck(label, 'warn', `No ad.size meta tag, so the size couldn't be confirmed. Expected ${expected}.`, `Add <meta name="ad.size" content="width=${placement.width},height=${placement.height}"> to the head.`);

  const declared = `${match[1]}x${match[2]}`;
  if (declared !== expected) return makeCheck(label, 'fail', `Banner declares ${declared}. Placement needs ${expected}.`, `Send the ${expected} version, or check that this banner went to the right placement.`);

  return makeCheck(label, 'pass', `Banner declares ${declared}, matching the placement.`);
};

// Rule 3: The zipped package has to fit the insertion order's weight limit.
const checkWeight = (pkg, maxFileKb) => {
  const label = 'File weight';
  const size = pkg.sizeKb.toFixed(1);
  if (pkg.sizeKb > maxFileKb) return makeCheck(label, 'fail', `${size} KB is over the ${maxFileKb} KB limit.`, `Remove ${(pkg.sizeKb - maxFileKb).toFixed(1)} KB. Compress images first, then remove unused files.`);
  return makeCheck(label, 'pass', `${size} KB is within the ${maxFileKb} KB limit.`);
};

// Rule 4: clickTag is how the ad server tracks clicks, so it has to exist as a global.
const checkClickTag = (banner) => {
  const label = 'clickTag declared';
  const match = banner.code.match(/\b(var|let|const)\s+(clicktag)\s*=\s*["'`]?([^"'`;\n]*)/i) || banner.code.match(/(window)\.(clicktag)\s*=\s*["'`]?([^"'`;\n]*)/i);

  if (!match) return {check: makeCheck(label, 'fail', 'No clickTag variable found.', 'Declare var clickTag = "..." in the head of index.html.'), value: null};

  const [, keyword, name, value] = match;
  if (name !== 'clickTag') return {check: makeCheck(label, 'warn', `Found ${name}, with non-standard capitalization.`, 'Rename it to clickTag. Some ad servers match the name exactly.'), value};
  if (keyword === 'let' || keyword === 'const') return {check: makeCheck(label, 'warn', `clickTag uses ${keyword}, which doesn't create window.clickTag.`, 'Use var clickTag so the ad server can reach it.'), value};

  return {check: makeCheck(label, 'pass', 'clickTag is declared as a global variable.'), value};
};

// Rule 5: Declaring clickTag isn't enough. The click has to actually use it.
const checkExit = (banner) => {
  const label = 'Click exit';
  const usesClickTag = /(window\.open\(\s*(window\.)?clicktag|(location|href)(\.href)?\s*=\s*(window\.)?clicktag|Enabler\.exit|getClickTag)/i.test(banner.code);
  const hardCoded = banner.code.match(/window\.open\(\s*["'`]([^"'`]+)/i)?.[1] || banner.links.find((link) => classifyRef(link) === 'external');

  if (usesClickTag) return makeCheck(label, 'pass', 'The click handler uses clickTag.');
  if (hardCoded) return makeCheck(label, 'fail', `The click goes to a hard-coded URL: ${hardCoded}`, 'Open clickTag instead. A hard-coded URL bypasses click tracking.');
  return makeCheck(label, 'fail', 'No click handler using clickTag was found.', 'Add a click listener that calls window.open(window.clickTag).');
};

// Rule 6: The destination in the banner has to match the insertion order.
const checkClickUrl = (value, placement) => {
  const label = 'Click URL';
  if (value === null) return skipCheck(label, 'Not checked because no clickTag value was found.');

  // A trailing slash doesn't change the destination, so it shouldn't fail the check.
  const clean = (url) => url.trim().replace(/\/$/, '');
  if (!clean(value)) return makeCheck(label, 'warn', 'clickTag is empty, so the destination comes from the ad server.', `Confirm the ad server is set to ${placement.clickUrl}.`);
  if (clean(value) !== clean(placement.clickUrl)) return makeCheck(label, 'fail', `clickTag goes to ${value}. The insertion order says ${placement.clickUrl}.`, 'Update clickTag to the insertion order URL, or confirm the change with the client.');
  return makeCheck(label, 'pass', 'clickTag matches the insertion order.');
};

// Rule 7: Publishers show the backup image when the HTML5 banner can't run.
const checkBackup = async (pkg, placement) => {
  const label = 'Backup image';
  const path = pkg.paths.find((item) => imageExtensions.test(item) && backupNames.test(item.split('/').pop()));

  if (!path) return makeCheck(label, 'fail', 'No backup image found.', `Add a ${placement.width}x${placement.height} image with backup, fallback, or static in its name.`);

  // createImageBitmap reads the real pixel size from the image data.
  try {
    const bitmap = await createImageBitmap(await pkg.zip.file(path).async('blob'));
    const {width, height} = bitmap;
    bitmap.close();
    if (width !== placement.width || height !== placement.height) return makeCheck(label, 'fail', `${path} is ${width}x${height}. Placement needs ${placement.width}x${placement.height}.`, 'Export the backup image at the placement size.');
    return makeCheck(label, 'pass', `${path} is ${width}x${height}.`);
  } catch {
    return makeCheck(label, 'warn', `${path} couldn't be read as an image.`, 'Re-export the backup image and check that it opens.');
  }
};

// Rule 8: Every file the banner asks for has to be in the package.
const checkLocalFiles = (pkg, banner) => {
  const label = 'Referenced files';
  const available = new Set(pkg.paths);
  const locals = banner.refs.filter(({ref}) => classifyRef(ref) === 'local');
  const missing = locals.filter(({ref, base}) => !available.has(resolvePath(ref, base)));
  const unique = (items) => [...new Set(items.map(({ref}) => ref))];

  // A path in JavaScript might be built at runtime, so a miss there is a warning.
  // A path in HTML or CSS is written out in full, so a miss there is a real break.
  const broken = unique(missing.filter(({source}) => source !== 'js'));
  const possible = unique(missing.filter(({source}) => source === 'js'));

  if (broken.length) return makeCheck(label, 'fail', `Missing from the .zip: ${broken.join(', ')}`, 'Add the files or fix the paths. File names are case-sensitive on ad servers.');
  if (possible.length) return makeCheck(label, 'warn', `Named in JavaScript but not in the .zip: ${possible.join(', ')}`, 'Add the files, or confirm these paths are never loaded.');
  if (pkg.skipped.length) return makeCheck(label, 'warn', `Too large to scan: ${pkg.skipped.join(', ')}`, 'Check these files by hand. Banner code should be far smaller than 2 MB.');
  return makeCheck(label, 'pass', `All ${unique(locals).length} referenced files are in the package.`);
};

// Find http:// addresses, leaving out XML namespaces and local development addresses.
// Those contain http:// but the banner never loads them from the web.
const findInsecure = (banner) => {
  const inFiles = banner.refs.map(({ref}) => ref).filter((ref) => /^http:\/\//i.test(ref));
  const inCode = [...banner.code.matchAll(/http:\/\/[^\s"'`)]+/gi)].map(([url]) => url);
  return [...new Set([...inFiles, ...inCode, ...banner.links.filter((link) => /^http:\/\//i.test(link))])].filter((url) => !/^http:\/\/(www\.w3\.org|localhost|127\.0\.0\.1)/i.test(url));
};

// Rule 9: A secure publisher page blocks anything loaded over plain http.
const checkSecure = (banner) => {
  const label = 'Secure calls';
  const insecure = findInsecure(banner);
  if (insecure.length) return makeCheck(label, 'fail', `Non-secure calls found: ${insecure.join(', ')}`, 'Change every call to https://. Secure pages block http:// requests.');
  return makeCheck(label, 'pass', 'No non-secure calls found.');
};

// Rule 10: Files from outside the .zip need approval and aren't counted in file weight.
const checkExternal = (banner, approvedHosts) => {
  const label = 'External calls';
  const hosts = banner.refs.filter(({ref}) => classifyRef(ref) === 'external').map(({ref}) => new URL(ref, 'https://zip.invalid').hostname);
  const unapproved = [...new Set(hosts)].filter((host) => !approvedHosts.includes(host));

  if (unapproved.length) return makeCheck(label, 'warn', `Not on the approved host list: ${unapproved.join(', ')}`, 'Bundle these files in the .zip, or get the host approved by the publisher.');
  return makeCheck(label, 'pass', hosts.length ? 'All external calls use approved hosts.' : 'No external calls found.');
};

// The label for each check that depends on index.html, in report order.
const bannerChecks = ['Dimensions', 'clickTag declared', 'Click exit', 'Click URL', 'Referenced files', 'Secure calls', 'External calls'];

// Combine the checks into one finished report.
const runChecks = async (file, placement, campaign) => {
  const pkg = await readPackage(file);
  const packageCheck = checkPackage(pkg);
  const weightCheck = checkWeight(pkg, campaign.maxFileKb);
  const backupCheck = await checkBackup(pkg, placement);

  // Without index.html, there's no banner code to inspect.
  let bannerResults = bannerChecks.map((label) => skipCheck(label, 'Not checked because index.html is missing.'));

  if (pkg.indexPath) {
    const banner = readBanner(pkg);
    const {check: clickTagCheck, value} = checkClickTag(banner);
    bannerResults = [checkSize(banner, placement), clickTagCheck, checkExit(banner), checkClickUrl(value, placement), checkLocalFiles(pkg, banner), checkSecure(banner), checkExternal(banner, campaign.approvedHosts)];
  }

  const checks = [packageCheck, weightCheck, backupCheck, ...bannerResults];
  const count = (status) => checks.filter((check) => check.status === status).length;
  const counts = {pass: count('pass'), warn: count('warn'), fail: count('fail'), skip: count('skip')};

  // One failure holds the banner. Warnings need a person to look, but don't block it.
  const verdict = counts.fail || counts.skip ? 'hold' : counts.warn ? 'review' : 'cleared';

  return {checks, counts, verdict, fileName: file.name, sizeKb: pkg.sizeKb};
};
