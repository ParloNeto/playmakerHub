import { Statistics } from "./statistics";

export interface Player {
  firstName: string;
  lastName: string;
  nationality: string;
  position: string;
  kitNumber: number;
  joined: number;
  urlImagePlayer: string;
  getStatisticsBySeasons: Statistics
}
