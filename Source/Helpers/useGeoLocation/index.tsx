import React, { useEffect } from "react";
import * as Location from "expo-location";
import { StackActions, useNavigation } from "@react-navigation/native";

interface IGeolocation {
  loading: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
}

const Index = () => {
  const navigation = useNavigation();
  const [geoLocation, setGeolocation] = React.useState<IGeolocation>({
    loading: true,
    location: {
      latitude: 0,
      longitude: 0,
    },
  });

  const fetchGeoLocation = async () => {
    setGeolocation((prev) => ({ ...prev, loading: true }));
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      navigation.dispatch(StackActions.replace("Permissions"));
      return;
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setGeolocation({
      loading: false,
      location: {
        latitude,
        longitude,
      },
    });
  };

  return { geoLocation, fetchGeoLocation };
};

export default Index;
