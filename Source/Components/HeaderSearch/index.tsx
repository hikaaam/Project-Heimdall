import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../../Utils";
import { TextInput } from "react-native-paper";
import Icon from "../Icons";
import { useSelector } from "react-redux";
import { IRootState } from "../../Redux/Reducers";

interface IHeaderSearch {
  title: string;
  onSubmit: (value: string) => void;
  isSubmitOnEdit?: boolean;
  onClear?: () => void;
}

const Index = ({ title, onSubmit, isSubmitOnEdit, onClear }: IHeaderSearch) => {
  const window = useWindowDimensions();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const { selectedPlace } = useSelector((state: IRootState) => state.maps);

  //animation functions
  const scaleX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleX, {
      toValue: showSearch ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [showSearch]);

  useEffect(() => {
    onClear && onClear();
    setSearch("");
    Animated.timing(scaleX, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200,
    }).start(() => setShowSearch(false));
  }, [selectedPlace]);

  return (
    <View
      style={{
        height: window.height / 12,
        width: window.width,
        backgroundColor: colors.primary,
        justifyContent: "center",
      }}
    >
      <View style={styles.container}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.whiteText}>
          {title}
        </Text>
        <TouchableOpacity onPress={() => setShowSearch(true)}>
          <Icon name="search" color={colors.white} type="Ionicons" size={25} />
        </TouchableOpacity>
      </View>
      {showSearch && (
        <View style={styles.searchContainer}>
          <Animated.View
            style={{
              width: "85%",
              backgroundColor: colors.primary,
              alignItems: "flex-end",
              transform: [{ scaleX }],
            }}
          >
            <TextInput
              placeholder="Search Place"
              autoComplete={false}
              autoFocus
              style={[styles.input, { height: window.height / 20 }]}
              activeUnderlineColor={colors.primary}
              value={search}
              onChangeText={(value) => {
                setSearch(value);
                isSubmitOnEdit && onSubmit(value);
              }}
              keyboardType={isSubmitOnEdit ? "default" : "web-search"}
              onSubmitEditing={(value) => onSubmit(value.nativeEvent.text)}
            />
          </Animated.View>

          <TouchableOpacity
            onPress={() => {
              if (isSubmitOnEdit) {
                onClear && onClear();
              }
              setSearch("");
              Animated.timing(scaleX, {
                toValue: 0,
                useNativeDriver: true,
                duration: 200,
              }).start(() => setShowSearch(false));
            }}
          >
            <Icon
              name={isSubmitOnEdit ? "close" : "search"}
              color={colors.white}
              type="Ionicons"
              size={30}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  whiteText: {
    color: colors.white,
    fontWeight: "bold",
    textTransform: "capitalize",
    width: "75%",
  },
  input: {
    backgroundColor: colors.white,
    fontSize: 12,
    width: "100%",
  },
  searchContainer: {
    backgroundColor: colors.primary,
    width: "100%",
    position: "absolute",
    height: "100%",
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
