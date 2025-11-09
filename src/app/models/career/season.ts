import { Player } from "../player/player";
import { BaseStats } from "./base-stats";
import { Title } from "./title";

export interface Season extends BaseStats {
  id?: string;
  seasonName?: string;
  titles?: Title[];
  players?: Player[];
  careerId?: string;
}
