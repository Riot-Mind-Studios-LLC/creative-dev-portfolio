# Orrin Strata — DCO Banner Set

One 300x250 banner template on the machine.js framework, driven by an eight-row feed. Eight ads from one build. Orrin Strata is a fictional brand; all offers are invented.

## How it works

- **The feed:** `feed.js` holds 8 rows, one per audience: New York, Los Angeles, Chicago, Miami, Seattle, Austin, a retargeting row ("Still thinking it over?"), and a conquest row aimed at gas-car owners. Each row sets the headline, offer, detail line, paint color, call to action, and a click URL tagged with that row's ID.
- **The template:** `main.js` is built on the machine.js framework (unchanged) and its builderTimeLine class. It reads its row from `?id=`, auto-fits the copy, paints the car, and runs a 7.75-second, 3-frame sequence: the car drives in with the headline, then the offer and detail appear, then the end frame shows the paint swatch and the call-to-action button. Hovering the banner pulses the button once the animation finishes.
- **The preview page:** all 8 ads in two rows of four, each with its audience label, offer, paint, call to action, and a Replay button. A "Replay all" button restarts every ad at once, and the full feed table sits below.

## Tested

- All 8 variants render with no errors, and every element stays inside the 300x250 frame.
- Auto-fit shrank the Chicago and Seattle offers to fit one line.
- Clicking the Chicago ad opened its own tagged URL.
- The preview page has no sideways scrolling on phones.
- The `banner/` folder is about 79 KB with no image files.

## Files

```
orrin-dco/
├── index.html        Preview page: all variants side by side + the feed table
└── banner/
    ├── index.html    Banner shell (ad.size meta, script load order, click handler)
    ├── machine.js    Framework core, unchanged
    ├── feed.js       The feed — one row per ad
    ├── car.js        Inline SVG car, recolored per row
    └── main.js       Template logic: reads the row, fits copy, builds the timeline
```

## View a single variant

Open `banner/index.html?id=nyc` (ids: nyc, la, chi, mia, sea, aus, rt, cq). No id loads the first row.

## Add or change an ad

Edit or add a row in `banner/feed.js`. No changes to `main.js`. The preview page and table pick up new rows automatically.

## Banner weight

About 79 KB uncompressed for the whole `banner/` folder, with no image files. GSAP loads from a CDN and is not counted.
