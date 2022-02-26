import useGeolocation from "./useGeoLocation";

export { useGeolocation };

export const otherCameraOptions = {
  altitude: 100,
  pitch: 0,
  heading: 0,
  zoom: 18,
};

export const defaultMapViewProps = {
  showsCompass: true,
  showsUserLocation: true,
  showsPointsOfInterest: true,
  showsBuildings: true,
  showsIndoors: true,
};

export const latitudeDelta = 0.0922;
export const longitudeDelta = 0.0421;
