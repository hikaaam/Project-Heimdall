import maps from "./Maps";

//reducers
export const rootReducer = { maps };

//reducers interfaces
import { IMaps } from "./Maps/Interfaces";

export interface IRootState {
  maps: IMaps;
}
