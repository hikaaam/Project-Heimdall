import { IFindPlace } from "../../../../ApiHandler";

export interface IMaps {
  places: IFindPlace[];
  input: string;
  loading: boolean;
  selectedPlace?: IFindPlace;
}
