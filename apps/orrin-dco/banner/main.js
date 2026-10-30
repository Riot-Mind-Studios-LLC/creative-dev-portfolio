/* =================================================================================
Banner Info
===================================================================================
Orrin Strata — DCO Template | 300x250
Adrian Velazquez
Creative Developer
-----------------
For: Orrin Strata (fictional brand, portfolio demo)

One template, many ads. Every piece of copy, the paint color, and the click
destination come from one row of feed.js. Nothing in this file is row-specific.
================================================================================= */

/* =================================================================================
SETUP — banner dimensions, feed row, and preload list
================================================================================= */
var machine = machine || {}; // ensure machine namespace exists (defined in machine.js)

// Global references — top level so debug tools can read them directly
var banner;
var hit;
var main_tl;

machine.main = function () {
  // Banner size comes from <meta name="ad.size"> so the template has one source of truth
  const { width, height } = machine.utils.getDimensions();

  // ---- FEED ROW -------------------------------------------------------------
  // Pick the row from ?id= (preview page and QA links). Falls back to the first
  // row so the banner always renders, even with a missing or mistyped id.
  const rowId = new URLSearchParams(window.location.search).get("id");
  const row =
    window.ORRIN_FEED.find((r) => r.id === rowId) || window.ORRIN_FEED[0];

  // Click destination is per row — the index.html click handler reads window.clickTag
  window.clickTag = row.exit_url;

  // No image files — type is live text and the car is inline SVG, so the
  // preload list is empty. Kept for template consistency.
  const images = [];

  /* ===============================================================================
  CREATE ELEMENTS
  =================================================================================
  Live text instead of text images: feed copy changes per row, so it can't be
  baked into PNGs. System font stack keeps the banner free of font downloads.
  ================================================================================= */
  machine.defaults = {
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    color: "#eef2f5",
  };

  machine.preloadImages(images, function () {
    banner = machine.createElement({
      id: "banner",
      width: width,
      height: height,
      background:
        "linear-gradient(165deg, #2a343e 0%, #141a20 55%, #0b0d10 100%)",
      overflow: "hidden",
      cursor: "pointer",
      boxSizing: "border-box",
      parent: document.body,
    });

    /* --- Brand --- */
    const logo = machine.createElement({
      id: "logo",
      left: 16,
      top: 14,
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: "0.14em",
      innerHTML: "ORRIN<span style='color:#5fd4c4'>/</span>STRATA",
      parent: banner,
    });
    const legal = machine.createElement({
      id: "legal",
      top: 16,
      fontSize: 7,
      letterSpacing: "0.08em",
      color: "#6f7b87",
      whiteSpace: "nowrap",
      innerHTML: "CONCEPT AD · FICTIONAL BRAND",
      parent: banner,
    });

    /* --- Frame 1: headline --- */
    const headline = machine.createElement({
      id: "headline",
      left: 16,
      top: 40,
      width: 268,
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.12,
      parent: banner,
    });

    /* --- Frame 2: offer + detail --- */
    const offer = machine.createElement({
      id: "offer",
      left: 16,
      top: 40,
      width: 268,
      fontSize: 22,
      fontWeight: 700,
      lineHeight: 1.12,
      color: "#5fd4c4",
      parent: banner,
    });
    const detail = machine.createElement({
      id: "detail",
      left: 16,
      width: 268,
      fontSize: 12,
      lineHeight: 1.3,
      color: "#a9b4be",
      parent: banner,
    });

    /* --- Car --- */
    const car = machine.createElement({
      id: "car",
      left: 70,
      top: 104,
      width: 214,
      height: 99,
      innerHTML: ORRIN_CAR_SVG,
      parent: banner,
    });

    /* --- End frame --- */
    const paint = machine.createElement({
      id: "paint",
      left: 16,
      top: 220,
      fontSize: 9,
      letterSpacing: "0.04em",
      color: "#a9b4be",
      parent: banner,
    });
    const swatch = machine.createElement({
      id: "swatch",
      left: 16,
      top: 208,
      width: 10,
      height: 10,
      borderRadius: "50%",
      border: "1px solid rgba(255,255,255,0.35)",
      boxSizing: "border-box",
      parent: banner,
    });
    const cta = machine.createElement({
      id: "cta",
      top: 208,
      height: 26,
      padding: "0 14px",
      lineHeight: "26px",
      borderRadius: 13,
      backgroundColor: "#5fd4c4",
      color: "#06201d",
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      parent: banner,
    });

    /* --- Hit / click element + border --- */
    hit = machine.createElement({
      id: "hit",
      width: width,
      height: height,
      border: "solid 1px #3a444e",
      boxSizing: "border-box",
      parent: banner,
    });

    /* ===============================================================================
    FEED → ELEMENTS
    =================================================================================
    textContent (not innerHTML) so feed copy is always treated as text.
    ================================================================================= */
    headline.textContent = row.headline;
    offer.textContent = row.offer;
    detail.textContent = row.detail;
    paint.textContent = `Shown in ${row.paint_name}`;
    cta.textContent = row.cta;

    // Paint the car and the end-frame swatch with the row's color
    gsap.set(car.querySelectorAll(".car-body"), {
      attr: { fill: row.paint_hex },
    });
    gsap.set(swatch, { backgroundColor: row.paint_hex });

    /* ===============================================================================
    ASSET ADJUSTMENTS — fit dynamic copy, then lay out around it
    =================================================================================
    fitText shrinks the font 1px at a time until the element fits its box.
    This is the DCO safety net: the longest headline in the feed still fits
    two lines without anyone hand-adjusting a single row.
    ================================================================================= */
    const fitText = function (el, maxHeight, minSize) {
      let size = parseFloat(el.style.fontSize);
      while (el.offsetHeight > maxHeight && size > minSize) {
        size -= 1;
        el.style.fontSize = `${size}px`;
      }
    };

    fitText(headline, 56, 16); // two lines max
    fitText(offer, 26, 15); // one line max
    fitText(detail, 32, 10); // two lines max

    // Detail sits right under the offer, whatever size the offer ended up
    gsap.set(detail, { top: 40 + offer.offsetHeight + 6 });

    // Right-align elements whose width depends on their copy
    gsap.set(legal, { left: width - legal.offsetWidth - 14 });
    gsap.set(cta, { left: width - cta.offsetWidth - 14 });

    // Paint label sits beside the swatch
    gsap.set(paint, { left: 32, top: 208, lineHeight: "10px" });

    /* ===============================================================================
    MAIN TIMELINE — the primary animation sequence
    =================================================================================
    Total run time ~8.5s, plays once, ends on the end frame.

    POSITIONING MODE REFERENCE:
      .offset(n)   — next tween starts n seconds after the LAST TWEEN's start position
      .chain(n)    — next tween starts n seconds after the LAST TWEEN ends
      .add("label") — labels go BEFORE a mode call, never after (see machine.js)
    ================================================================================= */
    main_tl = new builderTimeLine({ onComplete: run_cta })

      // --- Frame 1: car drives in, headline rises ---
      .add("frame_1")
      .offset(0.2)
      .from(car, 1.2, { x: -300, ease: "power3.out" })
      .offset(0.5)
      .from(headline, 0.7, { y: 14, opacity: 0, ease: "power2.out" })
      .chain(2.3)
      .to(headline, 0.4, { y: -10, opacity: 0, ease: "power1.in" })

      // --- Frame 2: offer + detail, car eases forward ---
      .add("frame_2")
      .chain(0.05)
      .from(offer, 0.6, { y: 14, opacity: 0, ease: "power2.out" })
      .offset(0.15)
      .from(detail, 0.6, { y: 10, opacity: 0, ease: "power2.out" })
      .offset(0)
      .to(car, 2.6, {
        x: -8,
        scale: 1.04,
        transformOrigin: "50% 100%",
        ease: "sine.inOut",
      })

      // --- End frame: paint label + CTA ---
      .add("endFrame")
      .chain(0.2)
      .from([swatch, paint], 0.5, { opacity: 0, ease: "power1.out" })
      .offset(0.1)
      .from(cta, 0.55, { scale: 0.6, opacity: 0, ease: "back.out(2)" });

    /* ===============================================================================
    USER INTERACTIONS — CTA pulse on hover after the timeline completes
    ================================================================================= */
    function run_cta() {
      // Built once and restarted on each hover so timelines never stack
      const cta_tl = new builderTimeLine({
        repeat: 1,
        yoyo: true,
        paused: true,
      }).to(cta, 0.35, { scale: 1.06, ease: "power2.inOut" });

      hit.addEventListener("mouseenter", function () {
        cta_tl.restart();
      });
    }
  }); // end machine.preloadImages()
}; // end machine.main()
