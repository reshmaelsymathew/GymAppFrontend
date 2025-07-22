import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define the props type for navigation
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const WorkoutTracker: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-6 py-8">
      <Text className="text-2xl font-bold text-center mb-6">
        Welcome Back, Wilson 💪
      </Text>

      {/* Workout Summary */}
      <View className="bg-white rounded-xl p-4 mb-4 shadow">
        <Text className="text-lg font-semibold mb-2">Today's Workout</Text>
        <Text className="text-gray-600">Chest & Triceps</Text>
        <Text className="text-gray-600">Duration: 45 mins</Text>
        <Text className="text-gray-600">Calories Burned: 320 kcal</Text>
      </View>

      {/* Quick Actions */}
      <View className="flex-row justify-between mb-6">
        <TouchableOpacity
          className="bg-blue-600 px-4 py-3 rounded-lg flex-1 mr-2"
          onPress={() => navigation.navigate("Tracker")}
        >
          <Text className="text-white text-center font-semibold">
            Start Workout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-600 px-4 py-3 rounded-lg flex-1 ml-2"
          onPress={() => navigation.navigate("Tracker")}
        >
          <Text className="text-white text-center font-semibold">
            View Progress
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats Grid */}
      <View className="grid grid-cols-2 gap-4">
        <StatBox icon="walking" label="Steps" value="8,420" />
        <StatBox icon="fire" label="Calories" value="1,250 kcal" />
        <StatBox icon="dumbbell" label="Workouts" value="5 this week" />
        <StatBox icon="clock" label="Time" value="3h 20m" />
      </View>
    </SafeAreaView>
  );
};

const StatBox = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: any;
  value: any;
}) => (
  <View className="bg-white rounded-lg p-4 items-center shadow">
    <FontAwesome5 name={icon} size={24} color="#4B5563" />
    <Text className="mt-2 text-sm text-gray-500">{label}</Text>
    <Text className="text-lg font-bold">{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, color: "gray", marginTop: 10 },
});

export default WorkoutTracker;
