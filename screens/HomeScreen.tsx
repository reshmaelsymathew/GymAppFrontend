import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardSlider from "../components/DashboardSlider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";

const bodyParts = [
  { name: "Chest", key: "chest" },
  { name: "Back", key: "back" },
  { name: "Legs", key: "legs" },
  { name: "Arms", key: "arms" },
  { name: "Shoulders", key: "shoulders" },
  { name: "Abs", key: "abs" },
];

// Define the props type for navigation
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-6 py-8">
      <DashboardSlider></DashboardSlider>

      <View>
        <Text className="text-2xl font-bold text-center mb-6">
          Choose a Body Part
        </Text>

        <FlatList
          data={bodyParts}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-white rounded-lg p-4 mb-4 shadow"
              onPress={() => router.push(`../Tracker`)}
            >
              <Text className="text-lg font-semibold text-gray-800">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
