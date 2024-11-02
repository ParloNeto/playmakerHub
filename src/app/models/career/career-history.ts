import { Title } from "./title";

export interface CareerHistory {
  games: number;
  wins: number;
  draws: number;
  losses: number;
  goalsConceded: number;
  goalsScored: number;
  titles: Title[];
};
