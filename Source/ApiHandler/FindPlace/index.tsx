import axios from "axios";
import { BifrostCrystal, _HOST_MapPlaces } from "../../Config";

const Index = async (input: string, latitude: number, longitude: number) => {
  try {
    const res = await axios({
      method: "get",
      url: _HOST_MapPlaces,
      params: {
        inputtype: "textquery",
        key: BifrostCrystal,
        input,
        location: latitude ? `${latitude},${longitude}` : undefined,
      },
      headers: {
        "content-type": "application/json",
      },
    });
    const response: RootObject = res.data;
    return {
      success: true,
      data: response.results,
      msg: "success",
    };
  } catch (error: any) {
    return {
      success: false,
      msg: error.message,
    };
  }
};

export default Index;

interface RootObject {
  html_attributions: any[];
  results: Result[];
  status: string;
}

interface Result {
  formatted_address: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  place_id: string;
  reference: string;
  types: string[];
}

interface Geometry {
  location: Location;
  viewport: Viewport;
}

interface Viewport {
  northeast: Location;
  southwest: Location;
}

interface Location {
  lat: number;
  lng: number;
}

export interface IFindPlace extends Result {}
