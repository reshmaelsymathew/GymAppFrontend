import { Text, View, Image } from "react-native";
import AppNavigator from "@/navigation/AppNavigator";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import "../global.css";

export default function Index() {
  return (
    <View className="flex-1 flex justify-end">
      <AppNavigator></AppNavigator>
    </View>
  );
}
