import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { IconProps } from "react-native-vector-icons/Icon";

interface I_Icons extends IconProps {
  type:
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "MaterialIcons"
    | "FontAwesome"
    | "FontAwesome5"
    | "Entypo"
    | "Feather"
    | "AntDesign"
    | "EvilIcons";
}

const Icons = (props: I_Icons) => {
  const { type } = props;
  const RenderIcons = () => {
    switch (type) {
      case "Ionicons":
        return <Ionicons {...props} />;
      case "MaterialCommunityIcons":
        return <MaterialCommunityIcons {...props} />;
      case "MaterialIcons":
        return <MaterialIcons {...props} />;
      case "FontAwesome":
        return <FontAwesome {...props} />;
      case "FontAwesome5":
        return <FontAwesome5 {...props} />;
      case "Entypo":
        return <Entypo {...props} />;
      case "Feather":
        return <Feather {...props} />;
      case "AntDesign":
        return <AntDesign {...props} />;
      case "EvilIcons":
        return <EvilIcons {...props} />;
      default:
        return <Ionicons {...props} />;
    }
  };

  return <RenderIcons />;
};

export default Icons;
