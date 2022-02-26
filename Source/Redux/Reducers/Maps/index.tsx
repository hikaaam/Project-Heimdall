import { IMaps } from "./Interfaces";

const initialState: IMaps = {
  places: [],
  input: "",
  loading: false,
};

const Index = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "findPlacesResult":
      return {
        ...state,
        places: action.payload,
      };
    case "findPlacesInput":
      return {
        ...state,
        input: action.payload,
      };
    case "setMaps": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default Index;
