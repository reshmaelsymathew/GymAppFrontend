// Import required libraries and modules from React Native and Navigation
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { BASE_URL } from '../constants/api'; // Import base URL from constants

// Define props for navigation
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

// Main component for the Register screen
const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  // Form fields state
  const [username, setUsername] = useState(''); // For mobile number
  const [fullName, setFullName] = useState(''); // For user's full name
  const [password, setPassword] = useState(''); // For password
  const [confirmPassword, setConfirmPassword] = useState(''); // For confirming password

  // Error messages state
  const [usernameError, setUsernameError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [serverError, setServerError] = useState('');

  // Function to check password validity using RegEx
  const isPasswordValid = (pwd: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(pwd);
  };

  // Handles registration logic
  const handleRegister = async () => {
    let isValid = true;

    // Reset all error messages
    setUsernameError('');
    setFullNameError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setServerError('');

    // Validate username (mobile number)
    if (!username) {
      setUsernameError('Mobile number is required');
      isValid = false;
    } else if (!/^\d{10}$/.test(username)) {
      setUsernameError('Mobile number must be exactly 10 digits');
      isValid = false;
    }

    // Validate full name
    if (!fullName) {
      setFullNameError('Full name is required');
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!isPasswordValid(password)) {
      setPasswordError(
        'Min 8 chars, with uppercase, lowercase, number & special char.'
      );
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm your password');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    // If any validation fails, stop the function
    if (!isValid) return;

    // Try making API request to register the user
    try {
      const response = await fetch(`${BASE_URL}/user/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, fullName, password }),
      });

      const data = await response.json();

      // If successful, go to Login screen
      if (response.ok) {
        navigation.navigate('Login');
      } else {
        // If error message comes from server
        setServerError(data.message || 'Something went wrong');
      }
    } catch (error) {
      // If connection to server fails
      setServerError('Server connection failed');
    }
  };

  // Render the UI
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* Mobile Number input */}
      <TextInput
        placeholder="Mobile Number"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        keyboardType="numeric"
        maxLength={10}
      />
      {!!usernameError && <Text style={styles.error}>{usernameError}</Text>}

      {/* Full Name input */}
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      {!!fullNameError && <Text style={styles.error}>{fullNameError}</Text>}

      {/* Password input */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      {!!passwordError && <Text style={styles.error}>{passwordError}</Text>}

      {/* Confirm Password input */}
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />
      {!!confirmPasswordError && (
        <Text style={styles.error}>{confirmPasswordError}</Text>
      )}

      {/* Server error message */}
      {!!serverError && <Text style={styles.error}>{serverError}</Text>}

      {/* Register button */}
      <Button title="Register" onPress={handleRegister} />

      {/* Link to Login screen */}
      <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 5, borderRadius: 5 },
  error: { color: 'red', marginBottom: 10 },
  loginLink: { color: 'blue', marginTop: 10, textAlign: 'center' },
});

// Export the Register screen
export default RegisterScreen;
