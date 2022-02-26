import { StyleSheet, View, StatusBar } from "react-native";
import Navigator from "./Source/Navigator";
import { colors } from "./Source/Utils";
import { Provider } from "react-redux";
import { store } from "./Source/Redux";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={colors.primary}
          translucent={false}
          barStyle="light-content"
        />
        <Navigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
