import { BaseStats } from "./base-stats";
import { Title } from "./title";

export interface CareerHistory extends BaseStats {

  titles: Title[];
};
