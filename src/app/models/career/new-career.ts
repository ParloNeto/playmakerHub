import { Season } from './season';
import { Coach } from "./Coach";
import { Player } from '../player/player';

export interface NewCareer {
  id?: string;
  coach: Coach;
  fifaCareer: string;
  leagueCareer: string;
  teamCareer: string;
  seasons?: Array<Season>;
  players?: Array<Player>;
}
