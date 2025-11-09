import { CareerHistory } from '../../../models/career/career-history';
import { Coach } from '../../../models/career/Coach';
import { NewCareer } from '../../../models/career/new-career';
import { Season } from '../../../models/career/season';
import { FootballLeague } from '../../../models/league/footballLeagues';
import { Player } from '../../../models/player/player';

export const mockSeason: Season = {
  id: '673153326f1c766801b16d12',
  seasonName: 'temporada-23-24',
  games: 26,
  wins: 10,
  draws: 9,
  losses: 7,
  goalsConceded: 33,
  goalsScored: 39,
  players: [
    {
      id: '6731584f42ae2864e855d5e1',
      firstName: 'Javier',
      lastName: 'Puado',
      kitNumber: 7,
      nationality: 'Spain',
      position: 'MD',
      joined: 2017,
      urlImagePlayer: 'https://cdn.sofifa.net/players/244/622/24_120.png',
      statisticsBySeasons: [],
      statisticsHistory: {
        matches: 0,
        goals: 0,
        assists: 0,
        yellowCards: 0,
        redCards: 0,
      },
      idCareer: '673153326f1c766801b16d13',
    },
    {
      id: '6731592e42ae2864e855d5e2',
      firstName: 'Fernando',
      lastName: 'Pacheco',
      kitNumber: 13,
      nationality: 'Spain',
      position: 'GOL',
      joined: 2017,
      urlImagePlayer: 'https://cdn.sofifa.net/players/209/960/24_120.png',
      statisticsBySeasons: [],
      statisticsHistory: {
        matches: 0,
        goals: 0,
        assists: 0,
        yellowCards: 0,
        redCards: 0,
      },
      idCareer: '673153326f1c766801b16d13',
    },
    {
      id: '673159c642ae2864e855d5e3',
      firstName: 'Pere',
      lastName: 'Milla',
      kitNumber: 11,
      nationality: 'Spain',
      position: 'ATA',
      joined: 2023,
      urlImagePlayer: 'https://cdn.sofifa.net/players/225/926/24_120.png',
      statisticsBySeasons: [
        {
          season: 'temporada-23-24',
          matches: 42,
          goals: 22,
          assists: 8,
          yellowCards: 1,
          redCards: 0,
        },
      ],
      statisticsHistory: {
        matches: 42,
        goals: 22,
        assists: 8,
        yellowCards: 1,
        redCards: 0,
      },
      idCareer: '673153326f1c766801b16d13',
    },
  ],
};

export const mockListSeason: Season[] = [mockSeason];

export const mockCareer: NewCareer = {
  id: '673153326f1c766801b16d13',
  coach: {
    id: '673153326f1c766801b16d11',
    coachesName: 'Santi Cazorla',
    nationality: 'Spain',
    urlImageCoach: 'https://cdn.futwiz.com/assets/img/fc25/faces/146562.png?25',
  },
  fifaCareer: 'EA FC 24',
  leagueCareer: 'La Liga',
  teamCareer: 'Espanyol',
  seasons: [
    mockSeason,
    { id: '6734ad4f4da1c43f44e746dd' } as Season,
    { id: '6741145abecf2c7905740ae6' } as Season,
  ],
  players: [
    {
      id: '6731584f42ae2864e855d5e1',
      firstName: 'Javier',
      lastName: 'Puado',
      kitNumber: 7,
      nationality: 'Spain',
      position: 'MD',
      joined: 2017,
      urlImagePlayer: 'https://cdn.sofifa.net/players/244/622/24_120.png',
      statisticsBySeasons: [],
      statisticsHistory: {
        matches: 0,
        goals: 0,
        assists: 0,
        yellowCards: 0,
        redCards: 0,
      },
      idCareer: '673153326f1c766801b16d13',
    },
    {
      id: '6731592e42ae2864e855d5e2',
      firstName: 'Fernando',
      lastName: 'Pacheco',
      kitNumber: 13,
      nationality: 'Spain',
      position: 'GOL',
      joined: 2017,
      urlImagePlayer: 'https://cdn.sofifa.net/players/209/960/24_120.png',
      statisticsBySeasons: [],
      statisticsHistory: {
        matches: 0,
        goals: 0,
        assists: 0,
        yellowCards: 0,
        redCards: 0,
      },
      idCareer: '673153326f1c766801b16d13',
    },
    {
      id: '673159c642ae2864e855d5e3',
      firstName: 'Pere',
      lastName: 'Milla',
      kitNumber: 11,
      nationality: 'Spain',
      position: 'ATA',
      joined: 2023,
      urlImagePlayer: 'https://cdn.sofifa.net/players/225/926/24_120.png',
      statisticsBySeasons: [
        {
          season: 'temporada-23-24',
          matches: 42,
          goals: 22,
          assists: 8,
          yellowCards: 1,
          redCards: 0,
        },
      ],
      statisticsHistory: {
        matches: 42,
        goals: 22,
        assists: 8,
        yellowCards: 1,
        redCards: 0,
      },
      idCareer: '673153326f1c766801b16d13',
    },
  ],
  careerHistory: {
    games: 69,
    wins: 34,
    draws: 17,
    losses: 18,
    goalsConceded: 101,
    goalsScored: 137,
  } as CareerHistory,
};

export const mockListCareer: NewCareer[] = [mockCareer];

export const mockLeague: FootballLeague = {
  name: 'Premier League',
  teams: [
    {
      name: 'Arsenal',
    },
    {
      name: 'Aston Villa',
    },
    {
      name: 'Chelsea',
    },
    {
      name: 'Liverpool',
    },
    {
      name: 'Manchester City',
    },
    {
      name: 'Manchester United',
    },
    {
      name: 'Tottenham Hotspur',
    },
  ],
};

export const mockPlayer: Player = {
  id: '6731584f42ae2864e855d5e1',
  firstName: 'Javier',
  lastName: 'Puado',
  kitNumber: 7,
  nationality: 'Spain',
  position: 'MD',
  joined: 2017,
  urlImagePlayer: 'https://cdn.sofifa.net/players/244/622/24_120.png',
  statisticsBySeasons: [
    {
      season: 'temporada-23-24',
      matches: 44,
      goals: 10,
      assists: 4,
      yellowCards: 6,
      redCards: 0,
      contractedAtualSeason: false,
    },
    {
      season: 'temporada-23-24',
      matches: 44,
      goals: 10,
      assists: 4,
      yellowCards: 6,
      redCards: 0,
      contractedAtualSeason: false,
    },
    {
      season: 'temporada-24-25',
      matches: 39,
      goals: 19,
      assists: 18,
      yellowCards: 3,
      redCards: 1,
      contractedAtualSeason: false,
    },
  ],
  statisticsHistory: {
    matches: 127,
    goals: 39,
    assists: 26,
    yellowCards: 15,
    redCards: 1,
  },
  idCareer: '673153326f1c766801b16d13',
};
