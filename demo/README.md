# Banner Staging Site — Project Setup Guide

This file explains every change you need to make when duplicating the staging template for a new project. Work through each section in order from top to bottom.

---

## Before You Start — Folder Setup

Duplicate the entire staging template folder and rename it for the new project. Then populate the following directories before touching the HTML:

```
staging/
├── index.html          ← edit this file using the steps below
├── report.html         ← do not edit — auto-populates from index.html
├── style.css           ← do not edit
├── main.js             ← do not edit
├── manifest.json       ← update with new banner file names (see Step 9)
├── logo.png            ← replace with current agency/studio logo if different
├── banners/            ← drop each banner folder in here, named by size
│   ├── 300x250/
│   │   └── index.html
│   └── [size]/
│       └── index.html
├── images/             ← drop fallback JPGs in here, named by size
│   ├── 300x250.jpg
│   └── [size].jpg
├── zips/               ← drop source zip files in here, named by size
│   ├── 300x250.zip
│   └── [size].zip
└── assets/
    └── deck.pdf        ← replace with current project design deck
```

**Naming convention:** all banner folders, image files, and zip files must match the banner size exactly using lowercase and no spaces. Examples: `300x250`, `728x90`, `160x600`.

---

## Step 1 — Page Title

Find this near the top of `index.html` inside the `<head>`:

```html
<!-- PROJECT NAME -->
<title>Mercedes Benz F1</title>
```

Replace `Mercedes Benz F1` with the new project name. This is what appears in the browser tab.

---

## Step 2 — Project Title (Page Header)

Find this in the page header section:

```html
<div class="report-eyebrow">Ad Banner Staging & Review</div>
<h1 class="project-title">Mercedes Benz F1</h1>
```

The eyebrow label "Ad Banner Staging & Review" is static — do not change it. Replace `Mercedes Benz F1` in the `<h1>` with the new project name. This is the large heading displayed at the top of the page.

---

## Step 3 — Project Meta Fields

Find the project meta block. Update each field value. There are currently 7 fields total.

**Client**
```html
<div class="meta-label">Client</div>
<div class="meta-value">Mercedes Benz</div>
```
Replace `Mercedes Benz` with the client name.

**Campaign**
```html
<div class="meta-label">Campaign</div>
<div class="meta-value">Campaign Name</div>
```
Replace `Campaign Name` with the campaign name.

**Concept**
```html
<div class="meta-label">Concept</div>
<div class="meta-value">F1</div>
```
Replace `F1` with the concept name or description.

**CTA Treatment**
```html
<div class="meta-label">CTA Treatment</div>
<div class="meta-value">LEARN MORE</div>
```
Replace `LEARN MORE` with the CTA copy used in the banners.

**Project Start Date**
```html
<div class="meta-label">Project Start Date</div>
<div class="meta-value">April 17, 2026</div>
```
Replace with the actual project start date.

**Ad Server / Platform**
```html
<div class="meta-label">Ad Server / Platform</div>
    <!-- <div class="meta-value">Google Ad Manager</div> -->
    <div class="meta-value">DoubleClick</div>
    <!-- <div class="meta-value">Flashtalking</div> -->
    <!-- <div class="meta-value">Sizmek</div> -->
```
Uncomment the correct platform and comment out the others. If none match, replace the active `meta-value` text with the correct platform name.

**Delivery Date**
```html
<div class="meta-label">Delivery Date</div>
<div class="meta-value">Month DD, YYYY</div>
```
Replace with the actual delivery or handoff date. This field is also used by `report.html` to populate the project timeline.

**Important:** The `nth-last-child` count in `style.css` is currently set to `7` to match 7 meta fields. If you ever add or remove a meta field, update this number to match the new total:
```css
@media (min-width: 600px) {
  .meta-field:nth-last-child(-n+7) {
    border-bottom: none;
  }
}
```

---

## Step 4 — Validate Button

Find the Validate button:

```html
<a class="validate-btn"
  href="https://h5validator.appspot.com/dcm/asset?batch=..."
  target="_blank" rel="noopener">
  Validate
</a>
```

Replace the `href` value with the validation results URL for this project. Get this URL from the Google HTML5 Ad Validator after running validation on the new banner files.

---

## Step 5 — Design Deck

Drop the new project's design deck PDF into the `assets/` folder and name it `deck.pdf`. The Design Deck button already points to `assets/deck.pdf` so no HTML change is needed as long as the file name matches.

---

## Step 6 — Footer

Find the footer:

```html
<span class="footer-left">F1 &nbsp;·&nbsp; Mercedes Benz</span>
```

Replace `F1` with the project name and `Mercedes Benz` with the client name.

---

## Step 7 — Sticky Navigation

Find the sticky nav block. For each banner size in this project, uncomment the corresponding nav link and its divider. Comment out any sizes that are not part of this project.

```html
<!-- 300x250 -->
<a class="nav-link" href="#s-300x250">300 × 250</a>

<!-- 160x600 — uncomment if this size is in the project -->
<!-- <div class="nav-divider"></div> -->
<!-- <a class="nav-link" href="#s-160x600">160 x 600</a> -->

<!-- 300x600 -->
<div class="nav-divider"></div>
<a class="nav-link" href="#s-300x600">300 x 600</a>
```

Rules:
- Every active nav link needs a `nav-divider` before it except the first one
- The `href` value must match the `id` on the corresponding `<section>` tag exactly
- If you need a size that is not already in the nav, add a new link following the same pattern

---

## Step 8 — Banner Size Sections

The template includes these sizes by default: 300×250, 300×600, 320×50, 728×90, 970×250. For each size in this project, update the following inside its `<section class="size-block">` block.

**For each banner row, update these 5 fields:**

**1. File size** — update with the actual compressed zip file size:
```html
<td class="col-filesize">0 KB</td>
```
Replace `0 KB` with the actual size (e.g. `189 KB`).

**2. Runtime** — update with the actual animation duration:
```html
<td class="col-runtime">0s</td>
```
Replace `0s` with the actual runtime (e.g. `3.5s`).

**3. Notes** — add any relevant notes for this banner or leave as is:
```html
<td class="col-modified">No Notes</td>
```
Replace `No Notes` with any relevant note or leave it as `No Notes`.

**4. Status** — one `<td>` must be active (uncommented) and the other three must be commented out:
```html
<td class="col-status"><span class="status-badge status-draft">Draft</span></td>
<!-- <td class="col-status"><span class="status-badge status-inreview">In Review</span></td> -->
<!-- <td class="col-status"><span class="status-badge status-approved">Approved</span></td> -->
<!-- <td class="col-status"><span class="status-badge status-delivered">Delivered</span></td> -->
```
To change status: comment out the current active row and uncomment the correct one. Never delete the commented-out rows — you will need them for future status updates.

**5. Clickthrough URL** — update the `href` in the files drawer for each banner:
```html
<a class="drawer-cta-link" href="https://PASTE-URL-HERE" target="_blank" rel="noopener">View URL ↗</a>
```
Replace `https://PASTE-URL-HERE` with the actual destination URL for that banner's exit click. If the URL is not yet confirmed, set `href="#"` as a temporary placeholder.

**Do not edit these — they are auto-populated or static:**
- `Latest Version` — auto-filled from the file's last modified date on the server
- `Fallback Image` — pulls automatically from `images/[size].jpg`
- `Download Zip` button — pulls automatically from `zips/[size].zip`
- `Show Files` button — pulls automatically from `manifest.json`

---

## Step 8a — Adding a New Banner Size

If this project requires a size not already in the template, do the following:

1. Copy any existing `<section class="size-block">` block in full
2. Update the `id` on the `<section>` tag to match the new size (e.g. `id="s-160x600"`)
3. Update the `size-label` span to show the correct dimensions (e.g. `160 × 600`)
4. Update the `size-tag` span to the correct IAB name (see reference list below)
5. Update all file paths inside the row: `images/[size].jpg`, `banners/[size]/index.html`, `zips/[size].zip`
6. Update the `data-size` attribute on the Show Files button to match the new size
7. Update the `id` on the files drawer row and the file list to match the new size
8. Update the clickthrough URL `href` in the files drawer for this size
9. Add the new size to the sticky nav (see Step 7)
10. Add the new size to `manifest.json` (see Step 9)

**IAB size tag names for reference:**
- 300×250 → Medium Rectangle
- 728×90 → Leaderboard
- 160×600 → Wide Skyscraper
- 300×600 → Half Page
- 970×250 → Billboard
- 970×90 → Large Leaderboard
- 336×280 → Large Rectangle
- 320×50 → Mobile Banner
- 320×100 → Large Mobile Banner

---

## Step 8b — Removing a Banner Size

If this project does not use a size that is in the template, delete the entire `<section class="size-block">` block for that size and comment out or remove its nav link in the sticky nav.

---

## Step 9 — manifest.json

Open `manifest.json` in the root directory. Update the file lists for each banner size to reflect the actual files inside each banner folder. The keys must match the size names exactly.

```json
{
  "300x250": [
    "index.html",
    "machine.min.js",
    "main.js",
    "bg_1.jpg",
    "logo.png"
  ],
  "728x90": [
    "index.html",
    "machine.min.js",
    "main.js",
    "bg.jpg",
    "logo.png"
  ]
}
```

Rules:
- One key per banner size
- Key names must match the size folder names exactly (e.g. `300x250`, not `300×250`)
- List every file inside that banner's folder
- Remove keys for any sizes that are not part of this project
- Add new keys for any new sizes added (see Step 8a)

---

## Step 10 — Drop All Project Files Into Place

Before uploading to the server, confirm the following are all in place:

- [ ] Each banner folder is inside `banners/` and contains its `index.html` and all assets
- [ ] Each fallback image is inside `images/` and named `[size].jpg`
- [ ] Each zip file is inside `zips/` and named `[size].zip`
- [ ] The design deck PDF is inside `assets/` and named `deck.pdf`
- [ ] `logo.png` is in the root directory
- [ ] `manifest.json` keys match the actual banner folders
- [ ] All clickthrough URLs are updated in the files drawers
- [ ] Delivery date is filled in the meta block

---

## Step 11 — Upload to Server and Test

Upload the entire project folder to your staging server. Open the URL in a browser and verify:

- [ ] Project title and all meta fields display correctly
- [ ] All fallback images load
- [ ] All banner previews open correctly in the modal
- [ ] All Show Files drawers expand and list the correct files
- [ ] All clickthrough URL links open the correct destinations
- [ ] All Download Zip buttons trigger a file download
- [ ] The Design Deck button opens the PDF
- [ ] The Validate button opens the correct results page
- [ ] The Project Report link opens `report.html` in the same tab and populates correctly
- [ ] The Print / Save as PDF output on the report page looks clean
- [ ] The sticky nav highlights correctly as you scroll

---

## About report.html

`report.html` is a standalone project report page that auto-populates by reading `index.html` and `manifest.json` using JavaScript. It requires no manual editing for each new project — just keep it in the root directory alongside `index.html` and it will always reflect the current project data.

The report includes:
- All project meta fields (client, campaign, concept, CTA, ad server, start date, delivery date)
- Summary stats — total banners, total files, runtime
- Status overview — counts of Draft, In Review, Approved, and Delivered banners
- Project timeline — start date to delivery date
- Full banner breakdown table — size, IAB format, status, file size, file count, and notes

It is accessible from the top bar of `index.html` via the Project Report link and opens in the same browser tab. It will not populate correctly when opened via `file://` locally — always test on the server or via a local server.

---

## Running a Local Server for Testing

To preview the staging site locally before deploying, run Python's built-in HTTP server from your project folder:

```bash
cd "/path/to/your/staging/folder"
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. Stop the server with `Ctrl+C` when done.

If updates are not reflecting after a save, use `Cmd + Shift + R` in Chrome to hard reload and bypass the cache. For active development, open Chrome DevTools, go to the Network tab, and check "Disable cache" — this forces fresh file loads on every reload as long as DevTools is open.

Features that require a local server to work correctly (do not work via `file://`):
- Fallback images loading
- Show Files drawer (reads `manifest.json` via fetch)
- Project Report page (reads `index.html` and `manifest.json` via fetch)
- Latest Version timestamp

---

## Notes

- Do not edit `style.css`, `main.js`, or `report.html` for per-project updates. All per-project changes live in `index.html` and `manifest.json` only.
- The `Latest Version` column populates automatically from the HTML file's last modified date on the server. It will not show correctly when previewing locally via `file://` — this is expected.
- If you add or remove meta fields from the project info block, update the `nth-last-child` count in the `@media (min-width: 600px)` rule in `style.css` to match the new total. Currently set to `7`.
- All status changes are made by commenting and uncommenting the correct `<td>` row in each banner section — never delete the commented-out status rows, you will need them for future status updates.
- The eyebrow label "Ad Banner Staging & Review" above the project title is static copy — do not change it per project.