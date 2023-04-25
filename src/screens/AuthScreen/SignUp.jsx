import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const group = 'CUSTOMER'

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

    formData.append("email", email)
    formData.append("password", password)
    formData.append("group", group)

    let requestOption = {
      method: "POST",
      body: formData,
      redirect: "follow"
    }
  
    fetch('http://192.168.153.251:8000/auth/register/', requestOption)
    .then(response => response.json())
    .then(response => {
           console.log('success', response);
      navigation.navigate('Login');
    })
    .catch(error => console.log('Error:', error));
  };
  

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/SUlogo.png')}
        style={{ width: 400, height: 200, resizeMode: 'contain' }}/>
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
    disabled={!email || !password || !confirmPassword}
    accessibilityLabel="Sign up button"
  >
    <Text style={styles.buttonText}>Sign Up</Text>
  </Button>
</View>

</View>
);
};

export default SignUp;
