import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    // Validate first name
    if (!firstName) {
      console.error('First name is required');
      return;
    }

    // Validate last name
    if (!lastName) {
      console.error('Last name is required');
      return;
    }

    // Validate email
    if (!email) {
      console.error('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      console.error('Invalid email');
      return;
    }

    // Validate phone number
    if (!phoneNumber) {
        console.error('Phone number is required');
        return;
      }
      
      if (!/^(\+8801)[3-9]\d{8}$/.test(phoneNumber)) {
        console.error('Invalid phone number');
        return;
      }

    // Validate password
    if (!password) {
      console.error('Password is required');
      return;
    }

    if (password.length < 8) {
      console.error('Password must be at least 8 characters long');
      return;
    }

    // Validate confirm password
    if (confirmPassword !== password) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://your-django-api-url.com/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          phone_number: phoneNumber,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;
        await AsyncStorage.setItem('access_token', accessToken);
        Alert.alert('You have successfully signed up!');
        navigation.navigate('Home');
        // Handle successful sign-up
      } else {
        console.error('Wrong Token');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
<View style={styles.inputContainer}>
<TextInput
       style={styles.input}
       placeholder="First Name"
       onChangeText={setFirstName}
       value={firstName}
     />
<TextInput
       style={styles.input}
       placeholder="Last Name"
       onChangeText={setLastName}
       value={lastName}
     />
<TextInput
       style={styles.input}
       placeholder="Email"
       keyboardType="email-address"
       onChangeText={setEmail}
       value={email}
     />
<TextInput
       style={styles.input}
       placeholder="Phone Number"
       keyboardType="phone-pad"
       onChangeText={setPhoneNumber}
       value={phoneNumber}
     />
<TextInput
       style={styles.input}
       placeholder="Password"
       secureTextEntry
       onChangeText={setPassword}
       value={password}
     />
<TextInput
       style={styles.input}
       placeholder="Confirm Password"
       secureTextEntry
       onChangeText={setConfirmPassword}
       value={confirmPassword}
     />
</View>
<Button
title="Sign Up"
onPress={handleSignUp}
disabled={!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword}
style={styles.button}
accessibilityLabel="Sign up button"
>
<Text style={styles.buttonText}>Sign Up</Text>
</Button>
</View>
);
};

export default Profile;
