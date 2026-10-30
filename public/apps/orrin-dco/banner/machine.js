/**
 * =============================================================================
 * MACHINE.JS — Banner Production Framework
 * =============================================================================
 * Author      : Adrian Velazquez
 * Role        : Creative Developer
 * Version     : 2.0.0 (GSAP 3 / ES2025)
 * Updated     : 2026
 *
 * Description :
 *   Core utility framework for building HTML5 ad banners. Provides element
 *   creation, image preloading, asset caching, canvas masking, dynamic script
 *   loading, and the custom builderTimeLine class used across all banner builds.
 *
 * Dependencies:
 *   GSAP 3 (gsap, ScrollTrigger not required — core only)
 *   Loaded externally via CDN before this file in index.html
 *
 * Usage:
 *   All banner logic lives in main.js.
 *   machine.main() is called from <body onload="machine.main();">
 *   This file must be loaded before main.js in index.html.
 * =============================================================================
 */

"use strict";

// =============================================================================
// NAMESPACE
// =============================================================================
// machine is the global namespace for the entire framework.
// All methods, utilities, and state live on this object.
// Using var here intentionally to allow re-declaration across files
// without conflict (main.js also opens with: var machine = machine || {})
var machine = machine || {};


// =============================================================================
// UTILITY METHODS — machine.utils
// =============================================================================
// A collection of math and color helper functions used across banner builds.
// These are stateless pure functions — no side effects, no DOM interaction.

machine.utils = {

  // ---------------------------------------------------------------------------
  // MATH UTILITIES
  // ---------------------------------------------------------------------------

  /**
   * dist — Euclidean distance between two 2D points
   * @param  {number} x1 — X coordinate of point 1
   * @param  {number} y1 — Y coordinate of point 1
   * @param  {number} x2 — X coordinate of point 2
   * @param  {number} y2 — Y coordinate of point 2
   * @return {number} distance in pixels
   */
  dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  },

  /**
   * angle — Angle in radians between two 2D points
   * @param  {number} x1, y1 — origin point
   * @param  {number} x2, y2 — target point
   * @return {number} angle in radians
   */
  angle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  },

  /**
   * norm — Normalize a value from a known min/max range to a 0–1 value
   * @param  {number} value — the value to normalize
   * @param  {number} min   — range minimum
   * @param  {number} max   — range maximum
   * @param  {boolean} clamp — if true, result is clamped to 0–1
   * @return {number} normalized value
   */
  norm(value, min, max, clamp) {
    const result = (value - min) / (max - min);
    return clamp ? machine.utils.clamp(result, 0, 1) : result;
  },

  /**
   * lerp — Linear interpolation between two values
   * @param  {number} t    — progress (0–1)
   * @param  {number} min  — start value
   * @param  {number} max  — end value
   * @param  {boolean} clamp — if true, result is clamped to min/max
   * @return {number} interpolated value
   */
  lerp(t, min, max, clamp) {
    const result = (max - min) * t + min;
    return clamp ? machine.utils.clamp(result, min, max) : result;
  },

  /**
   * map — Re-map a value from one range to another
   * @param  {number} value   — input value
   * @param  {number} fromMin — input range min
   * @param  {number} fromMax — input range max
   * @param  {number} toMin   — output range min
   * @param  {number} toMax   — output range max
   * @param  {boolean} clamp  — if true, output is clamped to toMin/toMax
   * @return {number} re-mapped value
   */
  map(value, fromMin, fromMax, toMin, toMax, clamp) {
    return machine.utils.lerp(
      machine.utils.norm(value, fromMin, fromMax, clamp),
      toMin,
      toMax,
      clamp
    );
  },

  /**
   * clamp — Constrain a value between a min and max
   * @param  {number} value
   * @param  {number} min
   * @param  {number} max
   * @return {number} clamped value
   */
  clamp(value, min, max) {
    return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
  },

  /**
   * inRange — Check whether a value falls within a min/max range (inclusive)
   * @param  {number} value
   * @param  {number} min
   * @param  {number} max
   * @return {boolean}
   */
  inRange(value, min, max) {
    return value >= Math.min(min, max) && value <= Math.max(min, max);
  },

  /**
   * random — Returns a random number between 0 and 1
   * Uses a seeded LCG (linear congruential generator) if machine.randomSeed is set.
   * Falls back to Math.random() if no seed is configured.
   * @return {number} 0–1
   */
  random() {
    if (machine.randomSeed) {
      machine.randomSeed = (machine.utils.a * machine.randomSeed + machine.utils.c) % machine.utils.m;
      return machine.randomSeed / machine.utils.m;
    }
    return Math.random();
  },

  // LCG seed constants (Numerical Recipes values)
  a : 1664525,
  c : 1013904223,
  m : 4294967296,

  /**
   * randomRange — Random float between min and max
   * @param  {number} min
   * @param  {number} max
   * @return {number}
   */
  randomRange(min, max) {
    return min + machine.utils.random() * (max - min);
  },

  /**
   * randomInt — Random integer between min and max (inclusive)
   * @param  {number} min
   * @param  {number} max
   * @return {number}
   */
  randomInt(min, max) {
    return Math.floor(min + machine.utils.random() * (max - min + 1));
  },

  /**
   * toDegrees — Convert radians to degrees
   * @param  {number} radians
   * @return {number} degrees
   */
  toDegrees(radians) {
    return (180 * radians) / Math.PI;
  },

  /**
   * toRadians — Convert degrees to radians
   * @param  {number} degrees
   * @return {number} radians
   */
  toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  },

  /**
   * sign — Return the sign of a number: 1, -1, or 0
   * @param  {number} value
   * @return {number}
   */
  sign(value) {
    return value > 0 ? 1 : value === 0 ? 0 : -1;
  },

  /**
   * roundToPlaces — Round a number to a specified number of decimal places
   * @param  {number} value
   * @param  {number} places — decimal places
   * @return {number}
   */
  roundToPlaces(value, places) {
    const factor = Math.pow(10, places);
    return Math.round(value * factor) / factor;
  },

  /**
   * roundToNearest — Round a value to the nearest multiple of a step
   * Example: roundToNearest(17, 5) → 15
   * @param  {number} value
   * @param  {number} step
   * @return {number}
   */
  roundToNearest(value, step) {
    return Math.round(value / step) * step;
  },

  /**
   * shortestArc — Shortest angular distance between two angles (in radians)
   * Useful for rotation interpolation that avoids spinning the long way around
   * @param  {number} from — start angle in radians
   * @param  {number} to   — end angle in radians
   * @return {number} signed delta in radians
   */
  shortestArc(from, to) {
    return Math.abs(to - from) < Math.PI
      ? to - from
      : to > from
        ? to - from - 2 * Math.PI
        : to - from + 2 * Math.PI;
  },

  /**
   * wrap — Wrap a value within a 0–length range (like modulo, but always positive)
   * Example: wrap(-1, 5) → 4
   * @param  {number} value
   * @param  {number} length — wrap boundary
   * @return {number}
   */
  wrap(value, length) {
    return ((value % length) + length) % length;
  },

  // ---------------------------------------------------------------------------
  // COLOR UTILITIES
  // ---------------------------------------------------------------------------

  /**
   * lerpColor — Interpolate between two hex colors
   * @param  {number} t     — progress 0–1
   * @param  {string} colorA — hex color string (e.g. "#ff0000")
   * @param  {string} colorB — hex color string
   * @return {string} hex color string at position t
   */
  lerpColor(t, colorA, colorB) {
    const a = machine.utils.hexToRGB(colorA);
    const b = machine.utils.hexToRGB(colorB);
    const result = {
      r : Math.round(machine.utils.lerp(t, a.r, b.r)),
      g : Math.round(machine.utils.lerp(t, a.g, b.g)),
      b : Math.round(machine.utils.lerp(t, a.b, b.b))
    };
    return machine.utils.rgbToHex(result.r, result.g, result.b);
  },

  /**
   * invertColor — Invert a hex or RGB color
   * Accepts a hex string, or three separate R, G, B integer arguments.
   * Returns the same format it received.
   * @param  {string|number} color — hex string OR red channel integer
   * @return {string} inverted hex or rgb string
   */
  invertColor(color) {
    // If called as invertColor(r, g, b) — three separate args
    if (arguments.length === 3) {
      color = machine.utils.rgbToHex(
        parseInt(arguments[0]),
        parseInt(arguments[1]),
        parseInt(arguments[2])
      );
    }

    // Handle rgb(...) string input — convert to hex first
    const rgbMatch = color.replace(/ /g, "").match(/\d+,\d+,\d+/g);
    if (rgbMatch) {
      const parts = rgbMatch[0].split(",").map(Number);
      color = machine.utils.rgbToHex(parts[0], parts[1], parts[2]);
    }

    // Perform bitwise XOR inversion on the numeric color value
    let num = parseInt(color.substring(1), 16);
    num ^= 0xFFFFFF;
    const inverted = "#" + ("000000" + num.toString(16)).slice(-6);

    // Return matching format
    if (arguments.length === 3) return machine.utils.hexToRGB(inverted);
    if (rgbMatch) {
      const { r, g, b } = machine.utils.hexToRGB(inverted);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return inverted;
  },

  /**
   * rgbToHex — Convert R, G, B integers to a hex color string
   * @param  {number} r — 0–255
   * @param  {number} g — 0–255
   * @param  {number} b — 0–255
   * @return {string} "#rrggbb"
   */
  rgbToHex(r, g, b) {
    return "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },

  /**
   * hexToRGB — Convert a hex color string to an {r, g, b} object
   * Accepts shorthand (#rgb) or full (#rrggbb) format.
   * @param  {string} hex
   * @return {{r:number, g:number, b:number}|null}
   */
  hexToRGB(hex) {
    // Expand shorthand #rgb → #rrggbb
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r : parseInt(result[1], 16),
          g : parseInt(result[2], 16),
          b : parseInt(result[3], 16)
        }
      : null;
  },

  // ---------------------------------------------------------------------------
  // BANNER DIMENSION UTILITY
  // ---------------------------------------------------------------------------

  /**
   * getDimensions — Read banner width and height from the <meta name="ad.size"> tag
   * This is set in index.html: <meta name="ad.size" content="width=300,height=250">
   * @return {{width:number, height:number}}
   */
  getDimensions() {
    const metaTag     = document.querySelector("[name='ad.size']");
    const contentAttr = metaTag.getAttribute("content");
    const widthMatch  = /width=(\d+)/.exec(contentAttr);
    const heightMatch = /height=(\d+)/.exec(contentAttr);
    return {
      width  : parseInt(widthMatch[1]),
      height : parseInt(heightMatch[1])
    };
  }

}; // end machine.utils


// =============================================================================
// IMAGE CACHE
// =============================================================================
// Stores preloaded image elements keyed by their src path.
// machine.createElement reads from this cache when applying backgroundImages.
// machine.preloadImages populates this cache before the banner starts.

machine.image_cache = {};


// =============================================================================
// DEFAULTS
// =============================================================================
// Global default properties applied to every element created by machine.createElement.
// You can override these in main.js before calling createElement if needed.
// Example: machine.defaults = { fontFamily: "Arial" };

machine.defaults = {};


// =============================================================================
// createElement — machine.createElement(config)
// =============================================================================
// The primary DOM factory for the framework.
// Takes a configuration object and returns a styled, positioned DOM element
// with GSAP shorthand methods attached directly to it.
//
// Supports these element types via config.type:
//   "div"    — default, standard block element
//   "img"    — standard image tag
//   "canvas" — canvas element, sets width/height attributes
//   "video"  — video element, supports autoplay/loop/muted/controls/poster
//   "sprite" — a div with a sprite sheet background, includes frame stepping
//
// Batch mode:
//   If you pass an OBJECT of config objects (instead of a single config),
//   createElement will recursively create each one and return a matching object.
//   Example:
//     const { bg, logo } = machine.createElement({ bg: {...}, logo: {...} });
//
// Positioning shortcuts in config:
//   parent      — DOM element or string ID to append this element to
//   insertBefore — insert this element before the specified element
//   insertAfter  — insert this element after the specified element
//   center       — center both axes within parent
//   centerX      — center horizontally
//   centerY      — center vertically
//
// GSAP shorthand methods attached to returned element:
//   el.set(vars)               → gsap.set(el, vars)
//   el.to(duration, vars)      → gsap.to(el, { duration, ...vars })
//   el.from(duration, vars)    → gsap.from(el, { duration, ...vars })
//   el.fromTo(duration, from, to) → gsap.fromTo(el, ...)
//   el.get(prop)               → read a GSAP transform or inline style value
//   el.center()                → center both axes
//   el.centerX() / centerHorizontal()
//   el.centerY() / centerVertical()
//   el.putInContainer(overflow) → wrap element in an overflow-hidden div
//   el.appendChildren(arr)     → append multiple children at once

machine.createElement = function(config) {

  // ---- BATCH MODE -----------------------------------------------------------
  // If every value in the config object is a plain object (not a primitive,
  // not null, and not an array), treat this as a batch call.
  // Guards: null has typeof "object" but is not a config — exclude it.
  //         Arrays have typeof "object" but are not element configs — exclude them.
  let isBatch = true;
  for (const key in config) {
    const val = config[key];
    if (
      typeof val !== "object" || // primitive — definitely not a config object
      val === null              || // null typeof "object" is a JS quirk — not a config
      Array.isArray(val)           // arrays are data, not element configs
    ) {
      isBatch = false;
      break;
    }
  }

  if (isBatch) {
    // Build and return a matching object of created elements
    const batch = {};
    for (const key in config) {
      batch[key] = machine.createElement(config[key]);
    }
    return batch;
  }

  // ---- SINGLE ELEMENT MODE --------------------------------------------------

  // Resolve a string ID or element reference to an actual DOM element
  const resolveEl = (ref) => typeof ref === "string" ? document.getElementById(ref) : ref;

  // Merge framework defaults + user config into a working options object
  config = config || {};
  const opts = machine.combineObjects(
    { type: "div", position: "absolute", force3D: true }, // base defaults
    machine.defaults,                                       // user-set defaults
    config                                                  // this element's config
  );

  // Create the raw DOM element — use createElementNS for SVG/XML namespaces
  const el = opts.ns
    ? document.createElementNS(opts.ns, opts.type)
    : document.createElement(opts.type);

  // ---- TYPE-SPECIFIC SETUP --------------------------------------------------

  if (opts.type === "canvas") {
    // Canvas needs width/height as element attributes (not CSS)
    el.width  = opts.width;
    el.height = opts.height;
  }

  if (opts.type === "video") {
    // Video attributes must be set as element properties, not CSS
    if (opts.autoplay)  el.autoplay  = opts.autoplay;
    if (opts.loop)      el.loop      = opts.loop;
    if (opts.controls)  el.controls  = opts.controls;
    if (opts.muted)     el.muted     = opts.muted;
    if (opts.poster)    el.poster    = opts.poster;
    if (opts.preload)   el.preload   = opts.preload;
  }

  if (opts.type === "sprite") {
    // Sprite requires backgroundImage, width, height, and frames to be defined
    if (!opts.backgroundImage) throw new Error("backgroundImage is required for sprite elements.");
    if (!opts.width)           throw new Error("width is required for sprite elements.");
    if (!opts.height)          throw new Error("height is required for sprite elements.");
    if (!opts.frames)          throw new Error("frames is required for sprite elements.");

    el.width  = opts.width;
    el.height = opts.height;
    el.frame  = opts.frame || 1;
    el.frames = opts.frames;

    // Total sprite sheet width = individual frame width × number of frames
    opts.backgroundSize = `${el.width * el.frames}px ${el.height}px`;

    // update() shifts the backgroundPosition to show the current frame
    el.update = function() {
      el.frame = Math.floor(el.frame);
      el.style.backgroundPosition = `${-el.width * (el.frame - 1)}px 0px`;
    };

    el.update();
  }

  // ---- VIDEO SOURCES --------------------------------------------------------
  // Add <source> child elements for video types
  if (opts.sources) {
    opts.sources.forEach(source => {
      const sourceEl  = document.createElement("source");
      sourceEl.src    = source.url;
      sourceEl.type   = source.type;
      el.appendChild(sourceEl);
    });
  }

  // ---- GSAP SHORTHAND METHODS -----------------------------------------------
  // These are attached directly to the DOM element so you can call:
  //   logo.to(1, { opacity: 0 })  instead of  gsap.to(logo, { duration: 1, opacity: 0 })

  el.appendChildren = function(children) {
    children.forEach(child => this.appendChild(child));
    return this;
  };

  el.set = function(vars) {
    gsap.set(this, vars);
    return this;
  };

  // NOTE: GSAP 3 uses { duration } inside the vars object
  el.to = function(duration, vars) {
    gsap.to(this, { duration, ...vars });
    return this;
  };

  el.from = function(duration, vars) {
    gsap.from(this, { duration, ...vars });
    return this;
  };

  el.fromTo = function(duration, fromVars, toVars) {
    gsap.fromTo(this, fromVars, { duration, ...toVars });
    return this;
  };

  /**
   * el.get(prop) — Read a GSAP transform value or inline CSS value
   * Checks _gsap (GSAP 3 internal store) first, then falls back to inline style.
   * Strips "px" units and returns a float for numeric values.
   */
  el.get = function(prop) {
    // GSAP 3 stores transform state on el._gsap
    if (this._gsap && (this._gsap[prop] !== undefined)) {
      return this._gsap[prop];
    }
    const styleVal = this.style[prop];
    return styleVal && styleVal.slice(-2) === "px"
      ? parseFloat(styleVal)
      : styleVal;
  };

  // Centering helpers — use GSAP set for consistency
  el.centerX = el.centerHorizontal = function() {
    gsap.set(this, { left: 0, right: 0, marginLeft: "auto", marginRight: "auto" });
    return this;
  };

  el.centerY = el.centerVertical = function() {
    gsap.set(this, { top: 0, bottom: 0, marginTop: "auto", marginBottom: "auto" });
    return this;
  };

  el.center = function() {
    gsap.set(this, { top: 0, left: 0, right: 0, bottom: 0, margin: "auto" });
    return this;
  };

  /**
   * el.putInContainer(overflow)
   * Wraps this element in a new div that matches its current position/size.
   * Useful for clipping animations without affecting the element's own coords.
   * The element is repositioned to 0,0 inside the container.
   * @param {string} overflow — CSS overflow value, defaults to "hidden"
   */
  el.putInContainer = function(overflow) {
    this.container = machine.createElement({
      left     : this.get("left"),
      top      : this.get("top"),
      width    : this.get("width"),
      height   : this.get("height"),
      overflow : overflow || "hidden",
      parent   : this.parentNode
    });
    this.set({ left: 0, top: 0 });
    this.container.appendChild(this);
  };

  // ---- SET ELEMENT ID -------------------------------------------------------
  if (opts.id) el.id = opts.id;

  // ---- DOM INSERTION --------------------------------------------------------
  if (opts.insertBefore) {
    const ref = resolveEl(opts.insertBefore);
    ref.parentNode.insertBefore(el, ref);
  } else if (opts.insertAfter) {
    const ref = resolveEl(opts.insertAfter);
    ref.parentNode.insertBefore(el, ref.nextElementSibling);
  } else if (opts.parent) {
    const parentEl = resolveEl(opts.parent);
    parentEl.appendChild(el);
  }

  // ---- CENTERING ------------------------------------------------------------
  if (opts.center)           el.center();
  if (opts.centerX)          el.centerX();
  if (opts.centerY)          el.centerY();
  if (opts.centerHorizontal) el.centerHorizontal();
  if (opts.centerVertical)   el.centerVertical();

  // ---- INNER HTML -----------------------------------------------------------
  if (opts.innerHTML) el.innerHTML = opts.innerHTML;

  // ---- CLEAN UP OPTS BEFORE PASSING TO GSAP ---------------------------------
  // These properties were handled above — remove them so GSAP doesn't
  // try to interpret them as animatable CSS properties
  const nonGsapProps = [
    "ns", "innerHTML", "retina", "parent", "id", "type",
    "autoplay", "loop", "controls", "muted", "poster", "preload", "sources",
    "center", "centerHorizontal", "centerVertical", "centerY", "centerX",
    "insertBefore", "insertAfter"
  ];
  const gsapOpts = machine.deleteProps(opts, nonGsapProps);

  // ---- BACKGROUND IMAGE HANDLING --------------------------------------------
  // If backgroundImage is provided, load from cache or wait for it to load.
  // Retina images are scaled down by 50% using width/height auto-calculation.

  if (opts.backgroundImage) {
    const src = opts.backgroundImage;

    const applyImage = function() {
      // SVG images need to be temporarily in the DOM for dimension reading
      const isSVG = src.slice(-4) === ".svg";
      if (isSVG) document.body.appendChild(this);

      // Calculate display width/height.
      // retina: true — the image file is @2x (e.g. 600x500 file = 300x250 display).
      // Halve the native image dimensions to get the correct CSS display size.
      // If the user passed explicit width/height in the config, those are used as-is.
      const displayWidth  = gsapOpts.width  || Math.round(opts.retina ? this.width  / 2 : this.width);
      const displayHeight = gsapOpts.height || Math.round(opts.retina ? this.height / 2 : this.height);

      gsapOpts.width  = displayWidth;
      gsapOpts.height = displayHeight;

      // Set backgroundSize to match the display dimensions exactly.
      // Without this, the browser renders the image at its full native resolution
      // regardless of the element's width/height, causing overflow on retina assets.
      // "contain" and "cover" are intentionally avoided — we want pixel-perfect
      // placement at the correct display size, not scaled-to-fit behavior.
      gsapOpts.backgroundSize = displayWidth + "px " + displayHeight + "px";

      // Ensure background starts at the top-left corner with no repeat.
      // backgroundRepeat defaults to "no-repeat" in machine.createElement already,
      // but setting it explicitly here ensures it survives the applyImage async path.
      gsapOpts.backgroundRepeat   = gsapOpts.backgroundRepeat   || "no-repeat";
      gsapOpts.backgroundPosition = gsapOpts.backgroundPosition || "0px 0px";

      // Apply the image as a CSS background
      gsapOpts.backgroundImage = "url(" + src + ")";
      applyGsapOpts();

      if (isSVG) document.body.removeChild(this);
    };

    const cachedImg = machine.image_cache[src];
    if (cachedImg) {
      // Image is already preloaded — apply immediately
      applyImage.call(cachedImg);
    } else {
      // Not in cache — log warning and load on the fly
      console.log(`Image ${src} has not been preloaded.`);
      const img = document.createElement("img");
      img.src   = src;
      img.onload = applyImage;
      machine.image_cache[src] = img;
    }

  } else {
    // No background image — apply GSAP styles immediately
    applyGsapOpts();
  }

  // Applies the cleaned opts object to the element via gsap.set
  function applyGsapOpts() {
    gsap.set(el, gsapOpts);
  }

  return el;

}; // end machine.createElement


// =============================================================================
// applyMask — machine.applyMask(sourceEl, maskEl)
// =============================================================================
// Composites two preloaded image elements together using canvas:
//   maskEl   defines the shape (drawn first as the mask)
//   sourceEl defines the content that shows through the mask shape
// The two elements are removed from the DOM and replaced by a <canvas> element
// positioned at sourceEl's original location.
//
// IMPORTANT: Both elements must have been preloaded via machine.preloadImages()
// and must have backgroundImage applied via machine.createElement().
//
// @param  {HTMLElement} sourceEl — element whose image is the visible content
// @param  {HTMLElement} maskEl   — element whose image defines the mask shape
// @return {HTMLCanvasElement}    — the resulting composited canvas

machine.applyMask = function(sourceEl, maskEl) {

  // Extract the filename from a url(...) style string to look it up in cache
  const extractFilename = (urlStr) =>
    urlStr.replace(/(url\(|\)|'|")/gi, "").split("/").slice(-1)[0];

  // Look up both images in the preload cache
  const sourceImg = machine.image_cache[extractFilename(sourceEl.style.backgroundImage)];
  const maskImg   = machine.image_cache[extractFilename(maskEl.style.backgroundImage)];

  // Create a canvas at sourceEl's current position
  const canvas = machine.createElement({
    type         : "canvas",
    width        : sourceEl.get("width"),
    height       : sourceEl.get("height"),
    left         : sourceEl.get("left"),
    top          : sourceEl.get("top"),
    insertBefore : sourceEl  // inserts canvas where sourceEl was
  });

  const ctx = canvas.getContext("2d");

  // Step 1: Draw the mask image — this defines the shape
  ctx.drawImage(maskImg, 0, 0, maskEl.get("width"), maskEl.get("height"));

  // Step 2: Switch to source-in compositing — only draw where mask is opaque
  ctx.globalCompositeOperation = "source-in";

  // Step 3: Draw the source image — only visible within the mask shape
  ctx.drawImage(sourceImg, 0, 0, sourceEl.get("width"), sourceEl.get("height"));

  // Step 4: Reset compositing mode
  ctx.globalCompositeOperation = "source-over";

  // Remove the original elements — canvas replaces them
  sourceEl.parentElement.removeChild(sourceEl);
  maskEl.parentElement.removeChild(maskEl);

  return canvas;

}; // end machine.applyMask


// =============================================================================
// preloadImages — machine.preloadImages(urls, callback, context)
// =============================================================================
// Preloads an array of image URLs and caches them in machine.image_cache.
// Fires callback once ALL images have finished loading.
// All images must be fully loaded before the banner starts so that
// machine.createElement can apply them as background images immediately.
//
// @param {string[]}  urls     — array of image file paths (relative to banner root)
// @param {function}  callback — called when all images are loaded; receives the array of img elements
// @param {object}    context  — optional `this` context for the callback

machine.preloadImages = function(urls, callback, context) {
  let loadedCount = 0; // tracks how many images have finished loading
  const imgElements = []; // holds all created img elements

  // Edge case: if the images array is empty, fire callback immediately
  if (urls.length === 0) {
    setTimeout(() => context ? callback.call(context) : callback(), 0);
    return;
  }

  urls.forEach(src => {
    const img       = document.createElement("img");
    img.src         = src;
    img.shortSrc    = src; // store path for cache key lookup
    imgElements.push(img);

    img.onload = function() {
      loadedCount++;
      // Store this image in the shared cache keyed by its src path
      machine.image_cache[this.shortSrc] = this;

      // Once all images are loaded, fire the callback
      if (loadedCount === urls.length) {
        context ? callback.call(context, imgElements) : callback(imgElements);
      }
    };

    img.onerror = function() {
      // Log a clear error and still increment so the banner doesn't hang
      // silently if one asset is missing or mis-named.
      console.error("machine.preloadImages: failed to load image \"" + this.shortSrc + "\". " +
        "Check the filename and path in your images array.");
      loadedCount++;
      if (loadedCount === urls.length) {
        context ? callback.call(context, imgElements) : callback(imgElements);
      }
    };
  });

}; // end machine.preloadImages


// =============================================================================
// include — machine.include(urls, callback)
// =============================================================================
// Dynamically injects one or more external JavaScript files into the <head>.
// Used by the debug tools to load machine_scrubber.min.js and deBug.min.js
// at runtime without blocking the initial page load.
//
// @param {string|string[]} urls     — path or array of paths to JS files
// @param {function}        callback — called after the script loads (optional)

machine.include = function(urls, callback) {
  // Normalize: accept a single string or an array
  const list = Array.isArray(urls) ? urls : [urls];

  // Track how many files have loaded so the callback only fires once —
  // after ALL files in the list have finished loading, not once per file.
  let loadedCount = 0;

  list.forEach(src => {
    console.log(`#include '${src}'`);
    const script    = document.createElement("script");
    script.type     = "text/javascript";
    script.src      = src;
    document.head.appendChild(script);

    script.onload = function() {
      console.log(`Resource loaded: ${script.src}`);
      loadedCount++;
      // Only fire the user callback after every file in the list has loaded
      if (loadedCount === list.length && typeof callback === "function") {
        callback();
      }
    };

    script.onerror = function() {
      console.error(`machine.include: could not load resource '${src}'`);
      // Still increment so remaining files aren't blocked
      loadedCount++;
      if (loadedCount === list.length && typeof callback === "function") {
        callback();
      }
    };
  });

}; // end machine.include


// =============================================================================
// combineObjects — machine.combineObjects(...objects)
// =============================================================================
// Shallow merges any number of objects left to right into a new object.
// Later arguments override earlier ones for matching keys.
// Used internally to merge defaults + user config before passing to GSAP.
//
// @param  {...object} objects — any number of plain objects
// @return {object}   merged result

machine.combineObjects = function(...objects) {
  const result = {};
  objects.forEach(obj => {
    for (const key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}; // end machine.combineObjects


// =============================================================================
// deleteProps — machine.deleteProps(obj, keysToRemove)
// =============================================================================
// Returns a shallow copy of obj with the specified keys removed.
// Used to strip framework-only properties before passing opts to gsap.set().
//
// @param  {object}   obj          — source object
// @param  {string[]} keysToRemove — array of key names to exclude
// @return {object}   new object without the specified keys

machine.deleteProps = function(obj, keysToRemove) {
  const result = machine.combineObjects({}, obj);
  keysToRemove.forEach(key => delete result[key]);
  return result;
}; // end machine.deleteProps


// =============================================================================
// CONSOLE SAFETY — Polyfill for environments without a console
// =============================================================================
// Prevents errors in old ad-serving environments that strip the console object.
// Covers log, warn, and error — all three are used by the debug tools.
if (!window.console) {
  window.console = {
    log  : function() {},
    warn : function() {},
    error: function() {}
  };
}


// =============================================================================
// builderTimeLine — Custom GSAP 3 Timeline Class
// =============================================================================
// Extends gsap.timeline() with a chainable, position-aware API designed
// for banner animation sequencing.
//
// POSITIONING MODES:
//   offset(n)   — place next tween n seconds after the last tween's START position (default)
//   chain(n)    — place next tween n seconds after the last tween ENDS
//   end(n)      — place next tween n seconds after the entire timeline END
//   absolute(n) — place next tween at an exact timestamp n seconds from timeline start
//   lock(mode, n) — hold the current mode across multiple adds (prevents auto-reset)
//
// PLAYBACK HELPERS:
//   .loop(count, label) — replay the timeline count times from a label
//   .start(tl)          — play a child timeline from within the sequence
//   .stagger(...)       — add a staggered group of tweens
//
// All methods return `this` for chaining.
//
// Example usage in main.js:
//   const main_tl = new builderTimeLine()
//     .offset(0.5)
//     .add(fade_in(logo))
//     .chain(1)
//     .add(fade_out(logo));

class builderTimeLine {

  /**
   * constructor
   * @param {object} vars — standard gsap.timeline() config vars
   *                        e.g. { onComplete: myFunc, repeat: -1 }
   */
  constructor(vars) {
    // Create the underlying GSAP 3 timeline
    this._tl = gsap.timeline(vars);

    // Internal state for position tracking
    this.addPosition = 0;  // current position offset (seconds)
    this.mode        = "offset"; // default positioning mode
    this.locked      = false;    // when true, mode/addPosition persist across adds
    this.children    = [];       // internal record of added tweens and their positions
  }

  // ---------------------------------------------------------------------------
  // duration / seek / play / pause / kill
  // Proxy the most commonly needed GSAP timeline methods
  // ---------------------------------------------------------------------------

  /** Returns the total duration of the timeline in seconds */
  duration()       { return this._tl.duration(); }

  /** Returns the current time scale of the timeline */
  timeScale()      { return this._tl.timeScale(); }

  /** Returns the delay of the timeline */
  delay()          { return this._tl.delay(); }

  /** Seek to a label or time position */
  seek(pos)        { this._tl.seek(pos); return this; }

  /** Play the timeline */
  play()           { this._tl.play(); return this; }

  /** Pause the timeline */
  pause()          { this._tl.pause(); return this; }

  /** Kill the timeline and remove it from GSAP's tracking */
  kill()           { this._tl.kill(); return this; }

  /** Restart the timeline from time 0 and play forward */
  restart()        { this._tl.restart(); return this; }

  /** Add a labeled marker at the current position */
  addLabel(name, pos) { this._tl.addLabel(name, pos); return this; }

  // ---------------------------------------------------------------------------
  // add(tween) — Insert a pre-built sub-timeline at the computed position
  // ---------------------------------------------------------------------------
  // Used when you pass a full gsap.timeline() or builderTimeLine as a unit —
  // for example the sub-timelines returned by fade_in() / fade_out() in main.js,
  // or the stagger sub-timelines built inside staggerTo/staggerFrom/staggerFromTo.
  //
  // For simple tweens (.to, .from, .fromTo, .set), use those shorthand methods
  // directly — they call _computePosition and _recordChild without going through add().
  //
  // If a builderTimeLine is passed, its internal ._tl is unwrapped automatically.

  add(tween) {

    // ---- STRING LABEL SHORTCUT ----
    // If a string is passed, treat it as a timeline label and insert it
    // at the current computed position WITHOUT touching _recordChild.
    // This preserves position math — labels have no duration and should
    // not be counted as children in the sequencing system.
    // Example: main_tl.add("frame_1") inserts a seekable label marker.
    if (typeof tween === "string") {
      const labelPos = this._computePosition(0);
      this._tl.addLabel(tween, labelPos);
      // Do NOT call _recordChild — labels are zero-duration markers,
      // not tweens, and must not affect the next position calculation.
      //
      // NOTE ON MODE CONSUMPTION:
      // _computePosition() resets mode back to "offset" and addPosition to 0
      // after it runs — this is intentional for tweens but means a pending
      // .chain() or .offset() call placed immediately before .add("label")
      // will be consumed by the label and lost.
      // Rule: always place label adds BEFORE setting a positioning mode,
      // not after. Example — correct: .add("frame_2").chain(2).add(tween)
      return this;
    }

    // Unwrap builderTimeLine instances — we need the raw gsap.timeline()
    const gsapTween = tween._tl ? tween._tl : tween;

    const duration = gsapTween.duration ? gsapTween.duration() : 0;
    const position = this._computePosition(duration);

    this._tl.add(gsapTween, position);
    this._recordChild(position, duration);

    return this;
  }

  // ---------------------------------------------------------------------------
  // _computePosition(duration) — PRIVATE
  // ---------------------------------------------------------------------------
  // Calculates the timeline position (in seconds) for the next tween or sub-tl
  // based on the current mode and addPosition.
  // Called by add(), set(), to(), from(), fromTo() before inserting anything.
  //
  // @param  {number} duration — duration of the tween being inserted (seconds)
  // @return {number} absolute position in seconds from timeline start

  _computePosition(duration) {
    let position;

    if (this.mode === "end") {
      // Place after the timeline's current total duration + offset
      position = this._tl.duration() + this.addPosition;

    } else if (this.mode === "absolute") {
      // Place at an exact second regardless of other tweens
      position = this.addPosition;

    } else {
      // "offset" and "chain" both reference the last recorded child.
      //
      // PERFORMANCE NOTE — no sort needed:
      // Children are always pushed via _recordChild() in the same order
      // they are added (index === children.length at push time), so the
      // last element in the array is always the most recently added child.
      // Sorting on every add() was O(n log n) repeated n times — for a
      // complex banner with 30+ stacked animations this adds up fast.
      // Direct array tail access is O(1) and always correct.
      const last = this.children[this.children.length - 1];
      position   = last ? last.position : 0;

      if (this.mode === "chain") {
        // Chain: start from where the last tween ENDS
        position += last ? last.duration : 0;
        position += this.addPosition;
      } else {
        // Offset (default): start from where the last tween STARTED + offset
        position += this.addPosition;
      }
    }

    // Reset mode and offset after computing, unless locked
    if (!this.locked) {
      this.addPosition = 0;
      this.mode        = "offset";
    }

    return position;
  }

  // ---------------------------------------------------------------------------
  // _recordChild(position, duration) — PRIVATE
  // ---------------------------------------------------------------------------
  // Stores the position and duration of the most recently added tween
  // so the next _computePosition() call has the data it needs.
  //
  // @param {number} position — the position (seconds) the tween was placed at
  // @param {number} duration — the duration (seconds) of the tween

  _recordChild(position, duration) {
    this.children.push({
      position : position,
      duration : duration,
      index    : this.children.length
    });
  }

  // ---------------------------------------------------------------------------
  // TWEEN SHORTHAND METHODS
  // ---------------------------------------------------------------------------
  // These create tweens directly on this._tl at the computed position,
  // using GSAP's native timeline methods (tl.to, tl.from, tl.fromTo).
  //
  // IMPORTANT: We do NOT use standalone gsap.to() / gsap.from() here.
  // Standalone tweens start playing immediately on their own internal timeline
  // the moment they are created. By the time they get inserted into this._tl
  // they are already running or in a conflicting state, which produces
  // instant/abrupt animation instead of the expected sequenced result.
  //
  // Using this._tl.to() / this._tl.from() etc. ensures GSAP creates the tween
  // as a child of this._tl from the start, with correct timing context.
  //
  // The computed position from this.add() is passed as the timeline position
  // parameter so the tween lands at exactly the right time.
  // ---------------------------------------------------------------------------

  /**
   * .set(el, vars) — Instantly set properties (duration 0) at the computed position
   */
  set(el, vars) {
    const position = this._computePosition(0);
    this._tl.set(el, vars, position);
    this._recordChild(position, 0);
    return this;
  }

  /**
   * .to(el, duration, vars) — Animate from current values TO vars
   */
  to(el, duration, vars) {
    const position = this._computePosition(duration);
    this._tl.to(el, { duration, ...vars }, position);
    this._recordChild(position, duration);
    return this;
  }

  /**
   * .from(el, duration, vars) — Animate FROM vars to current values
   */
  from(el, duration, vars) {
    const position = this._computePosition(duration);
    this._tl.from(el, { duration, ...vars }, position);
    this._recordChild(position, duration);
    return this;
  }

  /**
   * .fromTo(el, duration, fromVars, toVars) — Animate FROM explicit start TO explicit end
   */
  fromTo(el, duration, fromVars, toVars) {
    const position = this._computePosition(duration);
    this._tl.fromTo(el, fromVars, { duration, ...toVars }, position);
    this._recordChild(position, duration);
    return this;
  }

  /**
   * .staggerTo(els, duration, vars, stagger) — Stagger .to() across an array of elements
   * Uses a sub-timeline so the stagger group is treated as a single unit by add()
   */
  staggerTo(els, duration, vars, stagger) {
    const subTl = gsap.timeline();
    subTl.to(els, { duration, stagger, ...vars });
    return this.add(subTl);
  }

  /**
   * .staggerFrom(els, duration, vars, stagger) — Stagger .from() across an array of elements
   */
  staggerFrom(els, duration, vars, stagger) {
    const subTl = gsap.timeline();
    subTl.from(els, { duration, stagger, ...vars });
    return this.add(subTl);
  }

  /**
   * .staggerFromTo(els, duration, fromVars, toVars, stagger)
   */
  staggerFromTo(els, duration, fromVars, toVars, stagger) {
    const subTl = gsap.timeline();
    subTl.fromTo(els, fromVars, { duration, stagger, ...toVars });
    return this.add(subTl);
  }

  // ---------------------------------------------------------------------------
  // POSITIONING MODE METHODS
  // ---------------------------------------------------------------------------

  /**
   * .lock(mode, offset) — Set mode and offset, and HOLD them across multiple adds
   * Use when you want the same positioning to apply to several consecutive tweens.
   * @param {string} mode   — "offset" | "chain" | "end" | "absolute"
   * @param {number} offset — seconds
   */
  lock(mode, offset) {
    this.mode        = mode;
    this.addPosition = offset || 0;
    this.locked      = true;
    return this;
  }

  /**
   * .offset(n) — Next tween starts n seconds after the last tween's START
   * This is the default mode. Resets after each add (unless locked).
   */
  offset(n) {
    this.mode        = "offset";
    this.addPosition = n || 0;
    this.locked      = false;
    return this;
  }

  /**
   * .chain(n) — Next tween starts n seconds after the last tween ENDS
   * Use this to sequence animations one after another.
   */
  chain(n) {
    this.mode        = "chain";
    this.addPosition = n || 0;
    this.locked      = false;
    return this;
  }

  /**
   * .end(n) — Next tween starts n seconds after the entire timeline ENDS
   * Useful for appending something after everything else finishes.
   */
  end(n) {
    this.mode        = "end";
    this.addPosition = n || 0;
    this.locked      = false;
    return this;
  }

  /**
   * .absolute(n) — Place next tween at an exact second from timeline start
   * Ignores all other tweens' positions entirely.
   */
  absolute(n) {
    this.mode        = "absolute";
    this.addPosition = n || 0;
    this.locked      = false;
    return this;
  }

  // ---------------------------------------------------------------------------
  // PLAYBACK CONTROL METHODS
  // ---------------------------------------------------------------------------

  /**
   * .loop(count, label) — Repeat the timeline count times, seeking back to label
   * Inserts a callback at the current timeline position that re-seeks and replays.
   * @param {number} count — how many times to loop
   * @param {string} label — timeline label to seek back to (defaults to "loop")
   */
  loop(count, label) {
    let loopCount = 0;
    const self    = this;
    return this.add(
      gsap.delayedCall(0, function() {
        if (loopCount++ < count) self._tl.seek(label || "loop");
      })
    );
  }

  /**
   * .start(childTimeline) — Play a child builderTimeLine from within this timeline
   * Inserts a callback that calls .play() on the provided timeline.
   * @param {builderTimeLine} childTimeline
   */
  start(childTimeline) {
    return this.add(
      gsap.delayedCall(0, () => childTimeline.play())
    );
  }

  /**
   * .stagger(tweens, offset) — Add an array of tweens with a stagger offset between them
   * @param {Tween[]} tweens — array of GSAP tween objects
   * @param {number}  offset — seconds between each tween's start
   */
  stagger(tweens, offset) {
    // In GSAP 3, tl.add() only accepts (child, position).
    // The "normal" align parameter was GSAP 2 syntax and is not valid here.
    // Stagger offset is applied by iterating and spacing each tween manually.
    const tl = gsap.timeline();
    tweens.forEach((tween, i) => {
      tl.add(tween, i * offset);
    });
    return this.add(tl);
  }

} // end builderTimeLine
