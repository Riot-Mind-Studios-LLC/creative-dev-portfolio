// TEAM LIST: the teams shown in the badge grid.
// Each team: id (TheSportsDB idTeam), name (strTeam), badge (strBadge).
// Stored here so the grid needs no API calls; game data still loads live on click.
const NBA_TEAMS = [
  {
    id: "134861",
    name: "Brooklyn Nets",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/hkafe61739948361.png",
  },
  {
    id: "134874",
    name: "Milwaukee Bucks",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/olhug01621594702.png",
  },
  {
    id: "134862",
    name: "New York Knicks",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/4k8obt1778226764.png",
  },
  {
    id: "134876",
    name: "Houston Rockets",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/azoktf1780729261.png",
  },
  {
    id: "134883",
    name: "Orlando Magic",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/j0mpu81778198371.png",
  },
  {
    id: "134863",
    name: "Philadelphia 76ers",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/j6rlbi1778226857.png",
  },
  {
    id: "134880",
    name: "Atlanta Hawks",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/7o1noy1778226315.png",
  },
  {
    id: "134860",
    name: "Boston Celtics",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/4j85bn1667936589.png",
  },
  {
    id: "134881",
    name: "Charlotte Hornets",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/xqtvvp1422380623.png",
  },
  {
    id: "134870",
    name: "Chicago Bulls",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/ehq8l31778197349.png",
  },
  {
    id: "134871",
    name: "Cleveland Cavaliers",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/pch9ct1778195828.png",
  },
  {
    id: "134875",
    name: "Dallas Mavericks",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/s5dx7c1778197536.png",
  },
  {
    id: "134885",
    name: "Denver Nuggets",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/nhwy761573082617.png",
  },
  {
    id: "134872",
    name: "Detroit Pistons",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/lg7qrc1621594751.png",
  },
  {
    id: "134865",
    name: "Golden State Warriors",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/xokycb1778197905.png",
  },
  {
    id: "134873",
    name: "Indiana Pacers",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/y3lutb1778226511.png",
  },
  {
    id: "134866",
    name: "Los Angeles Clippers",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/3gtb8s1719303125.png",
  },
  {
    id: "134867",
    name: "Los Angeles Lakers",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/32pgg81586422595.png",
  },
  {
    id: "134877",
    name: "Memphis Grizzlies",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/v44qp21778197640.png",
  },
  {
    id: "134882",
    name: "Miami Heat",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/b9tye31778226616.png",
  },
  {
    id: "134886",
    name: "Minnesota Timberwolves",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/epenxg1781034811.png",
  },
  {
    id: "134878",
    name: "New Orleans Pelicans",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/xoxjsr1778226698.png",
  },
  {
    id: "134887",
    name: "Oklahoma City Thunder",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/bkhj5p1778199006.png",
  },
  {
    id: "134868",
    name: "Phoenix Suns",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/vrct0x1754387483.png",
  },
  {
    id: "134888",
    name: "Portland Trail Blazers",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/umehtv1778226952.png",
  },
  {
    id: "134869",
    name: "Sacramento Kings",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/k2buwo1778227426.png",
  },
  {
    id: "134879",
    name: "San Antonio Spurs",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/yc5qfx1781459158.png",
  },
  {
    id: "134864",
    name: "Toronto Raptors",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/lct96a1778227205.png",
  },
  {
    id: "134889",
    name: "Utah Jazz",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/trct8w1778198868.png",
  },
  {
    id: "134884",
    name: "Washington Wizards",
    badge:
      "https://r2.thesportsdb.com/images/media/team/badge/dxac7a1778227278.png",
  },
];
