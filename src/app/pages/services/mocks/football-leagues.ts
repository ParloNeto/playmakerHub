import { FootballLeague } from "../../../models/league/footballLeagues";

export const footballLeagues: FootballLeague[] = [
  {
    name: 'Premier League',
    teams: [
      { name: 'Manchester United' },
      { name: 'Liverpool' },
      { name: 'Manchester City' },
      { name: 'Chelsea' },
      { name: 'Arsenal' },
    ],
  },
  {
    name: 'La Liga',
    teams: [
      { name: 'Real Madrid' },
      { name: 'Barcelona' },
      { name: 'Atletico Madrid' },
      { name: 'Sevilla' },
      { name: 'Valencia' }, // other La Liga teams can be added similarly
    ],
  },
  {
    name: 'Bundesliga',
    teams: [
      { name: 'Bayern Munich' },
      { name: 'Borussia Dortmund' },
      { name: 'RB Leipzig' },
      { name: 'Bayer Leverkusen' },
      { name: 'Schalke 04' }, // other Bundesliga teams can be added similarly
    ],
  },
  {
    name: 'Serie A',
    teams: [
      { name: 'Juventus' },
      { name: 'Inter Milan' },
      { name: 'AC Milan' },
      { name: 'Napoli' },
      { name: 'Roma' }, // other Serie A teams can be added similarly
    ],
  },
  {
    name: 'Ligue 1',
    teams: [
      { name: 'Paris Saint-Germain' },
      { name: 'Olympique de Marseille' },
      { name: 'Lyon' },
      { name: 'Monaco' },
      { name: 'Lille' }, // other Ligue 1 teams can be added similarly
    ],
  },
];
