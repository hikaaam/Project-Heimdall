import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "../../Utils";
import Icon from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../Redux/Reducers";
import { IFindPlace } from "../../ApiHandler";
import { Divider } from "react-native-paper";
import { __SetSelectedPlace } from "../../Redux/Reducers/Maps/Actions";

const Index = () => {
  const window = useWindowDimensions();
  const { input, places, loading } = useSelector(
    (state: IRootState) => state.maps
  );

  const dispatch = useDispatch();

  const ListHeaderComponent = () => {
    return (
      <View
        style={{
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            color: colors.primary,
          }}
        >
          Search Result for "{input}"
        </Text>
      </View>
    );
  };

  const ListEmptyComponents = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.textEmpty}>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Icon
          name="sad-outline"
          type="Ionicons"
          size={window.width / 2}
          color={colors.primary}
        />
        <Text style={styles.textEmpty}>No location matched your result.</Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: IFindPlace }) => {
    return (
      <TouchableOpacity
        style={{
          marginTop: 10,
          width: "100%",
        }}
        onPress={() => dispatch(__SetSelectedPlace(item))}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ width: "90%" }}>
            <Text
              style={{
                color: item?.icon_background_color,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {item?.name}
            </Text>
            <Text
              style={{
                marginTop: 5,
              }}
            >
              {item?.formatted_address}
            </Text>
          </View>
          <Image
            source={{ uri: item?.icon }}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </View>

        <Divider
          style={{
            marginTop: 10,
          }}
        />
      </TouchableOpacity>
    );
  };

  if (input.length === 0) return null;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { marginTop: window.height / 12 }]}
    >
      <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={ListEmptyComponents}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height:
      Dimensions.get("window").height - Dimensions.get("window").height / 2,
  },
  textEmpty: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
    paddingHorizontal: 20,
    textAlign: "center",
    marginTop: 20,
  },
});
