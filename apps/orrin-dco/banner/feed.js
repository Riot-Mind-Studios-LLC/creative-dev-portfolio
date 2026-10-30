/* =================================================================================
ORRIN STRATA — DCO FEED
====================================================================================
Stand-in for the dynamic content feed (a Google Sheet or dynamic profile in
Campaign Manager 360 / Studio, or a feed in Flashtalking).

One row = one ad. The template in main.js never changes; only this data does.
Ad servers pick the row at serve time from targeting rules (geo, audience,
retargeting segment). Here, the row is picked with a URL parameter: ?id=nyc

Swapping to a live ad server:
  Replace this file with the platform's generated dynamic content code and map
  its fields to the same names below. main.js reads only these field names.

Fields:
  id          — row key, used for reporting and the ?id= parameter
  audience    — targeting rule this row is built for (preview page label only)
  headline    — frame 1 copy, auto-fit to two lines
  offer       — frame 2 headline
  detail      — frame 2 supporting line
  paint_name  — end-frame label
  paint_hex   — body color applied to the car
  cta         — call-to-action button copy
  exit_url    — click destination, tagged per row for reporting
================================================================================= */

const exitBase =
  "https://riot-mind-studios-llc.github.io/creative-dev-portfolio/?utm_source=orrin_dco&utm_content=";

window.ORRIN_FEED = [
  {
    id: "nyc",
    audience: "Geo · New York",
    headline: "New York, meet the quiet commute.",
    offer: "Lease from $599/mo",
    detail: "412 mi range · 18-min fast charge",
    paint_name: "Harbor Blue",
    paint_hex: "#3a6c9a",
    cta: "Reserve yours",
    exit_url: exitBase + "nyc",
  },
  {
    id: "la",
    audience: "Geo · Los Angeles",
    headline: "412 miles of Pacific Coast Highway.",
    offer: "0% APR for 60 months",
    detail: "One charge, LA to San Francisco and back",
    paint_name: "Ember Red",
    paint_hex: "#b23a3a",
    cta: "Build yours",
    exit_url: exitBase + "la",
  },
  {
    id: "chi",
    audience: "Geo · Chicago",
    headline: "Chicago winters, handled.",
    offer: "Dual-motor AWD standard",
    detail: "Heated seats, wheel, and wipers",
    paint_name: "Glacier Silver",
    paint_hex: "#c9ced3",
    cta: "Explore AWD",
    exit_url: exitBase + "chi",
  },
  {
    id: "mia",
    audience: "Geo · Miami",
    headline: "Miami nights, zero emissions.",
    offer: "Lease from $629/mo",
    detail: "Pre-cool the cabin from your phone",
    paint_name: "Chalk White",
    paint_hex: "#f2efe9",
    cta: "Reserve yours",
    exit_url: exitBase + "mia",
  },
  {
    id: "sea",
    audience: "Geo · Seattle",
    headline: "Seattle rain. Silent cabin.",
    offer: "Free home charger install",
    detail: "Plug in overnight, wake up full",
    paint_name: "Forest Slate",
    paint_hex: "#5f7a5b",
    cta: "Book a test drive",
    exit_url: exitBase + "sea",
  },
  {
    id: "aus",
    audience: "Geo · Austin",
    headline: "Austin, your daily drive just got quieter.",
    offer: "$2,000 launch bonus",
    detail: "On reservations through spring",
    paint_name: "Solar Copper",
    paint_hex: "#b8733d",
    cta: "Claim the bonus",
    exit_url: exitBase + "aus",
  },
  {
    id: "rt",
    audience: "Retargeting · Site visitor",
    headline: "Still thinking it over?",
    offer: "Your Strata is waiting.",
    detail: "Fully refundable deposit",
    paint_name: "Glacier Silver",
    paint_hex: "#c9ced3",
    cta: "Finish your build",
    exit_url: exitBase + "rt",
  },
  {
    id: "cq",
    audience: "Conquest · Gas-car owner",
    headline: "Done with gas stations?",
    offer: "$5,000 trade-in bonus",
    detail: "Charge at home for less per mile",
    paint_name: "Ember Red",
    paint_hex: "#b23a3a",
    cta: "Value your trade",
    exit_url: exitBase + "cq",
  },
];
