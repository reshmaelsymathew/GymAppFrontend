// screens/LoginScreen.tsx

// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BASE_URL } from '../constants/api'; // Constant for backend base URL

// Define the props type for navigation
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

// Define and export the LoginScreen component
const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // States to hold the input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // States for inline error messages
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');

  // Function to handle login form submission
  const handleLogin = async () => {
    let isValid = true;

    // Reset previous error messages
    setUsernameError('');
    setPasswordError('');
    setServerError('');

    // Validate username (mobile number)
    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    // If input validation fails, stop execution
    if (!isValid) return;

    try {
      // Send POST request to Django login endpoint
      const response = await fetch(`${BASE_URL}/user/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Parse the response data
      const data = await response.json();

      if (response.ok) {
        // If login is successful, navigate to Home screen and pass fullName
        navigation.navigate('Home', { username });
      } else {
        // If login fails, show message from backend or default message
        setServerError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      // Handle network or server errors
      setServerError('Failed to connect to the server');
    }
  };

  // JSX to render the UI
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Username input field */}
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      {!!usernameError && <Text style={styles.error}>{usernameError}</Text>}

      {/* Password input field */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      {!!passwordError && <Text style={styles.error}>{passwordError}</Text>}

      {/* Server-side error message */}
      {!!serverError && <Text style={styles.error}>{serverError}</Text>}

      {/* Login button */}
      <Button title="Login" onPress={handleLogin} />

      {/* Link to Register screen */}
      <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
        Don’t have an account? Register
      </Text>
    </View>
  );
};

// Define styling for components
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 5, borderRadius: 5 },
  error: { color: 'red', marginBottom: 10 },
  registerLink: { color: 'blue', marginTop: 10, textAlign: 'center' },
});

// Export the component so it can be used in navigation
export default LoginScreen;
