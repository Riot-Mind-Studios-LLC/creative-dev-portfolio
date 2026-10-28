# API Basketball Recent Score Puzzle

## Scenario

A client has provided a mockup for an NBA recent game summary page. The mockup includes specific design elements and precise content placement requirements. They may want pages for other NBA teams later, so use a dynamic strategy rather than hard-coded game content.

Using the Philadelphia 76ers team ID that you find in TheSportsDB API, finish this website listing module detailing the latest five completed games the team has played.

## Instructions

1. Create an account and obtain an API key.
   - Visit TheSportsDB website and register for a free account.
   - Access your API key from the account dashboard.

2. Fetch data from the API.
   - Use TheSportsDB documentation to identify the endpoint or endpoints needed to retrieve team details and recent NBA game results.
   - Construct your API URLs using your API key.
   - Display the latest five completed Philadelphia 76ers games available from the API.

3. Populate the page dynamically.
   - Use `src/script.js` to fetch, parse, and render API data.
   - Dynamically generate the game summary markup inside `#nba-last-games`.
   - Include key game details from the client mockup and reference image.
   - Handle failed fetch requests and unexpected API responses.

4. Update the header and page title dynamically.
   - Update the team name and team logo in the header.
   - Update the document title to reflect the selected team's recent game summary.

5. Style the page.
   - Use `src/styles.css`.
   - Match the provided design reference as closely as possible.
   - Make sure the page works on desktop and mobile.

6. Add a page-load animation.
   - The client asked us to be precise with the layout, but also wanted us to suggest a catchy animation that makes the page feel lively.
   - GSAP is already loaded in `index.html` via CDN.
   - Use it, or another approach if you prefer, to animate the five games when they load.
