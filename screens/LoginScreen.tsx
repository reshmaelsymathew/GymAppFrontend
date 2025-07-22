// screens/LoginScreen.tsx

// Import necessary modules from React and React Native
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { BASE_URL } from "../constants/api"; // Constant for backend base URL
import { ORG_NAME_FIRST, ORG_NAME_SECOND } from "../constants/code"; // Constant for App names
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import "../global.css";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";

// Define the props type for navigation
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

// Define and export the LoginScreen component
const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // States to hold the input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // States for inline error messages
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  //for development purpose only.
  navigation.navigate("Home", { username });

  // Function to handle login form submission
  const handleLogin = async () => {
    let isValid = true;

    // Reset previous error messages
    setUsernameError("");
    setPasswordError("");
    setServerError("");

    // Validate username (mobile number)
    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    // If input validation fails, stop execution
    if (!isValid) return;

    try {
      // Send POST request to Django login endpoint
      const response = await fetch(`${BASE_URL}/user/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Parse the response data
      const data = await response.json();

      if (response.ok) {
        // If login is successful, navigate to Home screen and pass fullName
        navigation.navigate("Home", { username });
      } else {
        // If login fails, show message from backend or default message
        setServerError(data.message || "Invalid credentials");
      }
    } catch (error) {
      // Handle network or server errors
      setServerError("Failed to connect to the server");
    }
  };

  // JSX to render the UI
  return (
    <View className="flex-1 flex justify-center">
      <StatusBar style="light" />

      <Image
        className="h-full w-full absolute"
        source={require("../assets/images/firstPage.png")}
      />

      <View className="flex flex-col gap-4 p-4 justify-center">
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className=" p-4 justify-center flex-row "
        >
          <Text
            style={{ fontSize: hp(5) }}
            className=" text-white px-4 py-2 font-bold tracking-wide "
          >
            {ORG_NAME_FIRST}
            <Text className=" text-rose-500 text-bold px-4 py-2">
              {ORG_NAME_SECOND}
            </Text>
          </Text>
        </Animated.View>
        {/* Username input field */}
        <TextInput
          style={styles.input}
          className="text-white border border-gray-300 py-2"
          placeholderTextColor="#fff"
          placeholder="    Mobile Number"
          value={username}
          onChangeText={setUsername}
        />
        {!!usernameError && <Text style={styles.error}>{usernameError}</Text>}

        {/* Password input field */}
        <TextInput
          style={styles.input}
          className=" text-white border border-gray-300 py-2"
          placeholderTextColor="#fff"
          placeholder="    Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {!!passwordError && <Text style={styles.error}>{passwordError}</Text>}

        {/* Server-side error message */}
        {!!serverError && <Text style={styles.error}>{serverError}</Text>}

        {/* Login button */}
        <TouchableOpacity
          style={styles.input}
          className=" bg-blue-600 py-2 rounded "
          onPress={handleLogin}
        >
          <Text className="text-white text-lg text-center">Login</Text>
        </TouchableOpacity>

        {/* Link to Register screen */}
        <Text
          onPress={() => navigation.navigate("Register")}
          className=" text-white text-center"
        >
          Don’t have an account? Register
        </Text>
      </View>
    </View>
  );
};

// Define styling for components
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderRadius: 8 },
  error: { color: "red", marginBottom: 10 },
  registerLink: { color: "blue", marginTop: 10, textAlign: "center" },
});

// Export the component so it can be used in navigation
export default LoginScreen;
