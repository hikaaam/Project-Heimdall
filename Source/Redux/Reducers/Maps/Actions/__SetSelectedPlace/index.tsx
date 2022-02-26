import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IFindPlace } from "../../../../../ApiHandler";
import __SetFindPlacesInput from "../__SetFindPlacesInput";

const Index =
  (selectedPlace?: IFindPlace) =>
  async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    dispatch({
      payload: { selectedPlace },
      type: "setMaps",
    });
    dispatch(__SetFindPlacesInput(""));
  };

export default Index;
