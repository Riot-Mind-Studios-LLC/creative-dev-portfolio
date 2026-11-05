# Campaign QA Preflight

Checks an HTML5 banner .zip against a mock insertion order, explains each failure, and exports a trafficking sheet as a CSV file.

This is a simulated workflow using fictional campaign data. It doesn't connect to an ad server.

## Run it

Open `index.html` in Chrome. It needs no server, build step, or internet connection.

## What it checks

| Check | Fails or warns when |
|---|---|
| Package structure | `index.html` is missing or inside a folder, or system or source files are included |
| File weight | The .zip is over the insertion order limit |
| Backup image | No backup image exists, or it isn't the placement size |
| Dimensions | The `ad.size` meta tag doesn't match the placement, or is missing |
| clickTag declared | clickTag is missing, misspelled, or not a global variable |
| Click exit | The click doesn't use clickTag |
| Click URL | clickTag doesn't match the insertion order, or is empty |
| Referenced files | A file named in the HTML, CSS, or JavaScript isn't in the .zip |
| Secure calls | Anything is called over `http://` |
| External calls | A file loads from a host that isn't approved |

Banner code is read as text and never run. Animation length and on-screen rendering aren't tested.

## Change the campaign

Edit `campaign-data.js`. The tables, dropdown, checks, and CSV all read from that file.

## Files

| File | Job |
|---|---|
| `index.html` | Page structure |
| `style.css` | Page styling |
| `campaign-data.js` | The mock insertion order |
| `qa-checks.js` | The QA rules |
| `main.js` | Page behavior, report, and CSV export |
| `samples-data.js` | Sample banners used by the page's sample buttons |
| `samples/` | The same sample banners as regular .zip files |
| `vendor/jszip.min.js` | JSZip 3.10.2 (MIT license), which reads .zip files |
| `fonts/` | Archivo (SIL Open Font License) |
