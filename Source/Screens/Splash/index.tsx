import {
  View,
  useWindowDimensions,
  PermissionsAndroid,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { Icon } from "../../Components";
import { colors } from "../../Utils";
import { StackActions, useNavigation } from "@react-navigation/native";

const Index = () => {
  const width = useWindowDimensions().width;

  const navigation = useNavigation();

  const checkPermsision = async () => {
    const isGranted = await PermissionsAndroid.check(
      "android.permission.ACCESS_FINE_LOCATION"
    );
    if (isGranted) {
      navigation.dispatch(StackActions.replace("Home"));
      return;
    }
    navigation.dispatch(StackActions.replace("Permissions"));
  };

  //animation functions
  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 20,
        velocity: 30,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => checkPermsision());
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
      }}
    >
      <Animated.View
        style={{
          opacity,
          transform: [{ scale }],
        }}
      >
        <Icon
          type="MaterialCommunityIcons"
          name="google-maps"
          size={width * 0.45}
          color={colors.primary}
        />
      </Animated.View>
    </View>
  );
};

export default Index;
