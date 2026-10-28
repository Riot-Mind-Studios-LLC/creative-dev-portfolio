// NBA RECENT GAME: pick a team from the badge grid to load its most recent game.
// DYNAMIC STRATEGY: the team list lives in teams.js; game data loads live from the API on each click.
// FREE API KEY (123): eventslast returns only the most recent HOME game.

const API_KEY = "123"; // free TheSportsDB key
const API_BASE = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`; // the api url and key
const DEFAULT_TEAM_ID = "134880"; // Philadelphia 76ers, shown on first load
const GAMES_TO_SHOW = 1; // free key returns 1 game; raise this with a premium key
const TIMEOUT_MS = 5000; // give up on a request after 5 seconds

let selectedTeamId = ""; // the team currently picked

// grab html elements so you can populate them
const teamGridEl = document.querySelector("#team-grid"); // badge buttons
const teamNameEl = document.querySelector("#team-name"); // team name text
const teamLogoEl = document.querySelector("#logo"); // team badge image
const gamesEl = document.querySelector("#nba-last-games"); // game card area
const oppLogoEl = document.querySelector("#opp-logo"); // opponent badge in the header
const vsEl = document.querySelector(".matchup-vs"); // VS text in the header

// 1. FETCH: get json data from a url, with a time limit
const fetchJson = async (url) => {
  const controller = new AbortController(); // lets us cancel the request
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS); // cancel if too slow
  try {
    const response = await fetch(url, { signal: controller.signal }); // send the request
    if (!response.ok) throw new Error(`HTTP ${response.status}`); // bad status = fail
    return await response.json(); // turn the reply into data
  } finally {
    clearTimeout(timer); // stop the timer either way
  }
};

// 2. CHECK IF A SCORE EXISTS
const hasScore = (score) => {
  if (score === null || score === "") {
    return false; // missing score
  }
  return true; // score is present
};

// 2.1 CHECK IF THE GAME IS FINISHED (both scores in)
const isCompleted = (game) => {
  if (!hasScore(game.intHomeScore) || !hasScore(game.intAwayScore)) {
    return false; // a score is missing, so the game isn't finished
  }
  return true; // both scores are in
};

// 3. GET THE LAST GAMES for the picked team
const getLastGames = async (teamId) => {
  const data = await fetchJson(`${API_BASE}/eventslast.php?id=${teamId}`); // request recent games
  const games = data && Array.isArray(data.results) ? data.results : []; // use the list, or empty if bad data
  return games.filter(isCompleted).slice(0, GAMES_TO_SHOW); // keep finished games only
};

// 4. GAME DATE: API time is UTC; "Z" marks it as UTC
const formatGameDate = (game) => {
  const date = new Date(`${game.strTimestamp}Z`);
  return isNaN(date) ? game.dateEvent : date.toLocaleString("en-US"); // bad time = plain date
};

// 5. BUILD A GAME CARD: the picked team always shows first
const buildGameCard = (game, teamId) => {
  const isHome = game.idHomeTeam === teamId; // were we the home team?
  const teamName = isHome ? game.strHomeTeam : game.strAwayTeam; // our name
  const opponent = isHome ? game.strAwayTeam : game.strHomeTeam; // their name
  const teamScore = Number(isHome ? game.intHomeScore : game.intAwayScore); // our score, text to number
  const oppScore = Number(isHome ? game.intAwayScore : game.intHomeScore); // their score, text to number
  const result = teamScore > oppScore ? "winner" : "loser"; // win = green, loss = red

  return `
    <article class="game-result">
      <p class="card-label">Most recent home game</p>
      <h3>${teamName} vs ${opponent}</h3>
      <p><span class="label">Date:</span> <em>${formatGameDate(game)}</em></p>
      <p><span class="label">Opponent:</span> <span class="game-opp">${opponent}</span></p>
      <p><span class="label">Score:</span> <span class="team-score ${result}">${teamScore}</span> - <span class="opp-score">${oppScore}</span></p>
    </article>`;
};

// 6. HEADER: our badge, hidden team name, and tab title from the team list
const showTeam = (team) => {
  teamNameEl.textContent = team.name; // hidden h1, for screen readers
  teamLogoEl.src = team.badge; // our badge
  teamLogoEl.alt = `${team.name} logo`; // badge description for screen readers
  document.title = `${team.name} Recent Game Summary`; // browser tab title
  hideOpponent(); // clear the last matchup until the new game loads
};

// 6.1 HEADER MATCHUP: hide VS and the opponent badge
const hideOpponent = () => {
  vsEl.hidden = true;
  oppLogoEl.hidden = true;
};

// 6.2 HEADER MATCHUP: show the opponent's badge from the game data
const showOpponent = (game, teamId) => {
  const isHome = game.idHomeTeam === teamId; // were we the home team?
  const opponent = isHome ? game.strAwayTeam : game.strHomeTeam; // their name
  const oppBadge = isHome ? game.strAwayTeamBadge : game.strHomeTeamBadge; // their badge
  if (!oppBadge) return; // no badge from the API: keep our badge alone
  oppLogoEl.src = oppBadge;
  oppLogoEl.alt = `${opponent} logo`;
  vsEl.hidden = false; // show VS
  oppLogoEl.hidden = false; // show their badge
};

// 7. RENDER GAME CARDS, or a message if there are none
const showGames = (games, teamId) => {
  if (games.length === 0) {
    gamesEl.innerHTML = `<p class="message">No recent home game found.</p>`; // no games: show a message
    return;
  }
  gamesEl.innerHTML = games.map((game) => buildGameCard(game, teamId)).join(""); // one card per game
};

// 8. LOADING AND ERROR MESSAGES
const showLoading = () => {
  gamesEl.innerHTML = `<p class="message">Loading...</p>`; // shown while the request runs
};

const showError = () => {
  gamesEl.innerHTML = `<p class="message">Game results are unavailable right now. Please try again later.</p>`;
};

// 9. ANIMATION: opponent slides in, VS pops, card rises, scores count up
const animateGames = () => {
  gsap
    .timeline()
    .from("#opp-logo", { x: 80, opacity: 0, duration: 1, ease: "power3.out" }) // their badge slides in from the right
    .from(".matchup-vs", { scale: 0, duration: 0.4, ease: "back.out(3)" }) // VS pops in
    .from(
      ".game-result",
      {
        y: 40, // start 40px lower
        opacity: 0, // start invisible
        duration: 1.5,
        stagger: 0.15,
        ease: "back.out(1.7)", // slight bounce on landing
      },
      "-=0.1",
    ) // start just before VS finishes
    .from(
      ".team-score, .opp-score",
      {
        textContent: 0, // count up from 0 to the real score
        snap: { textContent: 1 }, // whole numbers only
        duration: 1,
        stagger: 0.05,
        ease: "power1.out",
      },
      "-=0.4", // start 0.4s before the card finishes
    );
};

// 10. TEAM GRID: one badge button per team, sorted A to Z
const buildTeamGrid = () => {
  const teamsByName = [...NBA_TEAMS].sort((a, b) =>
    a.name.localeCompare(b.name),
  ); // copy, then sort by name
  teamGridEl.innerHTML = teamsByName
    .map(
      (team) => `
      <button class="team-btn" type="button" data-id="${team.id}" aria-label="${team.name}" title="${team.name}">
        <img src="${team.badge}" alt="" />
      </button>`,
    )
    .join("");
};

// 11. HIGHLIGHT the picked team's button
const setActiveButton = (teamId) => {
  teamGridEl.querySelectorAll(".team-btn").forEach((button) => {
    const isActive = button.dataset.id === teamId; // is this the picked team?
    button.classList.toggle("is-active", isActive); // add or remove the highlight
    button.setAttribute("aria-pressed", isActive); // tell screen readers which is picked
  });
};

// 12. LOAD A TEAM: update the header, then fetch and show its game
const loadTeam = async (teamId) => {
  const team = NBA_TEAMS.find((item) => item.id === teamId); // look up the team in the list
  if (!team) return; // unknown id: do nothing

  selectedTeamId = teamId; // remember the latest pick
  setActiveButton(teamId);
  showTeam(team);
  showLoading();

  try {
    const games = await getLastGames(teamId);
    if (teamId !== selectedTeamId) return; // a newer click came in; ignore this older result
    showGames(games, teamId);
    if (games.length) {
      showOpponent(games[0], teamId); // fill the header matchup
      animateGames(); // then animate it all
    }
  } catch (error) {
    if (teamId !== selectedTeamId) return; // ignore errors from older clicks
    console.error("Failed to load game data:", error);
    showError();
  }
};

// 13. CLICKS: one listener on the grid handles every badge button
teamGridEl.addEventListener("click", (event) => {
  const button = event.target.closest(".team-btn"); // find the button that was clicked
  if (button) loadTeam(button.dataset.id);
});

// START: draw the grid, then load the default team
const init = () => {
  buildTeamGrid();
  loadTeam(DEFAULT_TEAM_ID);
};

init();
