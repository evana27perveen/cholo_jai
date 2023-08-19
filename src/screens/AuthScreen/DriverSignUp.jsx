import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import API_BASE_URL from '../../apiConfig';
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
    borderColor: '#030303',
    marginBottom: 16,
    padding: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f0ca78',
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

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const group = 'DRIVER';

  const navigation = useNavigation();


  const handleSignUp = async (e) => {

    e.preventDefault();

    // Validate email
    if (!email) {
      console.error('Email is required');
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      console.error('Invalid email');
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

  let formData = new FormData();

  formData.append("email", email);
  formData.append("password", password);
  formData.append("group", group);
  formData.append("full_name", fullName);
  formData.append("phone_number", number);

  let requestOption = {
    method: "POST",
    body: formData,
    redirect: "follow"
  };

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, requestOption);
    const responseData = await response.text();
    const jsonResponse = JSON.parse(responseData);

    console.log('success', jsonResponse);
    navigation.navigate('Login');
  } catch (error) {
    console.log('Error:', error);
  }
};

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/logoC.png')}
        style={{ width: 320, height: 200, resizeMode: 'contain' }}/>
      <Text style={styles.title}>Sign Up</Text>
<View style={styles.inputContainer}>

<TextInput
       style={styles.input}
       placeholder="Email"
       keyboardType="email-address"
       onChangeText={setEmail}
       value={email}
     />
<TextInput
       style={styles.input}
       placeholder="Full Name"
       onChangeText={setFullName}
       value={fullName}
     />
<TextInput
       style={styles.input}
       placeholder="Phone Number: +880**********"
       onChangeText={setNumber}
       value={number}
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
<View style={{ width: '80%', borderRadius: 5, }}>
  <Button
    title="Sign Up"
    onPress={handleSignUp}
    disabled={!email || !password || !confirmPassword || !fullName || !number}
    color="#FECE00"
    accessibilityLabel="Sign up button"
  >
  </Button>
</View>

<Text style={{ marginTop: 16 }}>Already have an account? 
  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
    <Text style={{ color: '#d4851d' }}> Login here</Text>
  </TouchableOpacity>
</Text>

<Text style={{ marginTop: 16 }}>Wanna Be A Rider ? 
  <TouchableOpacity onPress={() => navigation.navigate('DriverSignUp')}>
    <Text style={{ color: '#d40756', fontWeight: 'bold' }}> SignUp here</Text>
  </TouchableOpacity>
</Text>

</View>
);
};

export default SignUp;