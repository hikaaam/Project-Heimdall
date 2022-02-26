import { Alert } from "react-native";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { FindPlace } from "../../../../../ApiHandler";
import __SetFindPlacesInput from "../__SetFindPlacesInput";
import __SetMapsLoading from "../__SetMapsLoading";

const Index = (input: string, latitude: number, longitude: number) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(__SetFindPlacesInput(input));
    dispatch(__SetMapsLoading(true));
    const { msg, success, data } = await FindPlace(
      input,
      latitude,
      longitude
    ).finally(() => {
      dispatch(__SetMapsLoading(false));
    });
    if (success) {
      dispatch({
        payload: data,
        type: "findPlacesResult",
      });
      return;
    }
    Alert.alert("Error Occured", msg);
  };
};

export default Index;
