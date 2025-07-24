import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  SafeAreaView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SLIDER_IMAGES } from "@/constants/code";
import "../global.css";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// Define the props type for navigation
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.header}>
        <Text
          style={{ fontSize: hp(3.5) }}
          className=" text-red px-16 py-2 font-bold tracking-wide "
        >
          Your Personal {"            "}
          <Text className=" w-full text-rose-500 font-bold px-8 py-4">
            Fitness Center
          </Text>
        </Text>
        <TouchableOpacity onPress={() => console.log("Profile tapped")}>
          <Image
            source={require("../assets/images/avatarM.png")}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Main image tapped")}>
          <ImageBackground
            source={require("../assets/images/avatarF.png")}
            style={styles.mainImage}
            imageStyle={{
              borderRadius: 16,
              flex: 1,
              justifyContent: "flex-end",
            }} // optional styling for the image itself
          >
            <Text style={styles.overlayText}>Today's Workout</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      {/* Scrollable Tiles */}
      <Text style={styles.sectionTitle}>Explore Workouts</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollColumn}
        contentContainerStyle={styles.gridContainer}
      >
        {SLIDER_IMAGES.map((img, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => console.log("Tapped tile", index, img.name)}
            style={styles.tileWrapper}
          >
            <ImageBackground
              source={img.uri}
              style={styles.tile}
              imageStyle={{
                borderRadius: 16,
                flex: 1,
                justifyContent: "flex-end",
              }} // optional styling for the image itself
            >
              <Text style={styles.tileText}>{img.name}</Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollColumn: {
    flex: 1,
    paddingVertical: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tileWrapper: {
    width: "45%", // two columns with spacing
    margin: 8,
    alignItems: "center",
  },
  tile: {
    width: wp(40),
    height: hp(15),
    borderRadius: 12,
  },

  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  mainImage: {
    width: width - 30,
    height: 160,
    borderRadius: 16,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginLeft: 16,
  },
  scrollRow: {
    marginTop: 12,
    paddingLeft: 16,
  },
  overlayText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",

    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 120,
  },
  tileText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 8,
  },
});

export default HomeScreen;
