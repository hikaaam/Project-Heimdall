import {
  View,
  ActivityIndicator,
  Pressable,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  defaultMapViewProps,
  otherCameraOptions,
  useGeolocation,
} from "../../Helpers";
import { colors } from "../../Utils";
import MapView, { Camera, Marker } from "react-native-maps";
import { HeaderSearch, Icon, SearchBox } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import {
  __FindPLaces,
  __SetFindPlacesInput,
  __SetSelectedPlace,
} from "../../Redux/Reducers/Maps/Actions";
import { IRootState } from "../../Redux/Reducers";

const Index = () => {
  const { geoLocation, fetchGeoLocation } = useGeolocation();
  const { latitude, longitude } = geoLocation.location;

  const dispatch = useDispatch();
  const window = useWindowDimensions();
  const { selectedPlace } = useSelector((state: IRootState) => state.maps);

  const [camera, setCamera] = useState<Camera>({
    ...otherCameraOptions,
    center: {
      latitude,
      longitude,
    },
  });

  useEffect(() => {
    if (!geoLocation.loading) {
      setCamera({
        ...otherCameraOptions,
        center: {
          latitude,
          longitude,
        },
      });
    } else {
      fetchGeoLocation();
      dispatch(__SetSelectedPlace(undefined));
    }
  }, [geoLocation.loading]);

  useEffect(() => {
    if (selectedPlace != undefined) {
      setCamera({
        ...otherCameraOptions,
        center: {
          latitude: selectedPlace?.geometry?.location?.lat ?? latitude,
          longitude: selectedPlace?.geometry?.location?.lng ?? longitude,
        },
      });
    }
  }, [selectedPlace]);

  if (geoLocation.loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={30} color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <HeaderSearch
        title={selectedPlace?.formatted_address ?? "Find Location"}
        isSubmitOnEdit
        onClear={() => dispatch(__SetFindPlacesInput(""))}
        onSubmit={(value) => dispatch(__FindPLaces(value, latitude, longitude))}
      />
      <MapView
        initialCamera={camera}
        camera={camera}
        style={{ flex: 1 }}
        {...defaultMapViewProps}
      >
        <Marker
          coordinate={{
            latitude: camera?.center?.latitude ?? latitude,
            longitude: camera?.center?.longitude ?? longitude,
          }}
          title={"Location"}
        />
      </MapView>
      <SearchBox />
      <View
        style={{
          position: "absolute",
          top: window.height / 6,
          right: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.white,
            elevation: 5,
            padding: 7,
          }}
          onPress={() => {
            setCamera({
              ...otherCameraOptions,
              center: {
                latitude,
                longitude,
              },
            });
            setTimeout(() => {
              setCamera({
                ...otherCameraOptions,
                center: {
                  latitude:
                    (selectedPlace?.geometry?.location?.lat ?? latitude) +
                    0.001,
                  longitude:
                    (selectedPlace?.geometry?.location?.lng ?? longitude) +
                    0.001,
                },
              });
            }, 100);
          }}
        >
          <Icon
            name="map-marker"
            color={colors.primary}
            type="MaterialCommunityIcons"
            size={25}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
