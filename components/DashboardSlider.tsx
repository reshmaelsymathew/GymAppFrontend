import { View, Text } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { SLIDER_IMAGES } from "@/constants/code";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function DashboardSlider() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Carousel
        loop={true}
        autoplay={false}
        data={["", ""]}
        renderItem={ItemCard}
      />
    </View>
  );
}

const ItemCard = () => {
  return <Text>slide</Text>;
};
