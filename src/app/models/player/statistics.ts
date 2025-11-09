import { BaseStatsPlayer } from "./base-stats-player";

export interface Statistics extends BaseStatsPlayer {
  season: string;
  contractedAtualSeason?: boolean;
};
