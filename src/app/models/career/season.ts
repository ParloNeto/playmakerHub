import { Player } from "../player/player";
import { Title } from "./title";

export interface Season {
  id?: string;
  games?: number;
  wins?: number;
  draws?: number;
  losses?: number;
  goalsConceded?: number;
  goalsScored?: number;
  titles?: Title[];
  players?: Player[];
}
