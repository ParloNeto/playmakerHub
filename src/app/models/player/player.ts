import { Statistics } from "./statistics";
import { StatisticsHistory } from "./statistics-history";

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
  position: string;
  kitNumber: number;
  joined: number;
  urlImagePlayer: string;
  statisticsBySeasons: Statistics[];
  statisticsHistory: StatisticsHistory;
  idCareer: string;
}
