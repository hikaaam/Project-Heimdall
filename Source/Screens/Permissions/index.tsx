import {
  View,
  Text,
  Button,
  PermissionsAndroid,
  TouchableOpacity,
  useWindowDimensions,
  BackHandler,
  Alert,
} from "react-native";
import React from "react";
import { colors } from "../../Utils";
import { Icon } from "../../Components";
import { StackActions, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const Index = () => {
  const width = useWindowDimensions().width;
  const navigation = useNavigation();

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You need to enable location permission"
        );
        return;
      }
      navigation.dispatch(StackActions.replace("Home"));
    } catch (error: any) {
      Alert.alert("Permission Error", error.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: colors.white,
        paddingHorizontal: 30,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 50,
        }}
      >
        <Icon
          type="MaterialCommunityIcons"
          name="google-maps"
          size={width * 0.45}
          color={colors.primary}
        />
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Location Permission is needed to use this app.
      </Text>
      <View
        style={{
          marginTop: 40,
          width: "100%",
        }}
      >
        <Button
          color={colors.primary}
          title="Grant Permission"
          onPress={requestLocationPermission}
        />
      </View>
      <TouchableOpacity onPress={() => BackHandler.exitApp()}>
        <Text
          style={{
            marginTop: 40,
            fontWeight: "bold",
            color: colors.secondary,
            marginBottom: 100,
          }}
        >
          Maybe, Next Time
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
