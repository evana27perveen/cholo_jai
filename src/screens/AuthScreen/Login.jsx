import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCookies } from 'react-cookie';

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


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useCookies(['myToken'])
    const [group, setGroup] = useCookies(['myGroup'])
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

        fetch('http://127.0.0.1:8000/auth/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'email': email,
              'password': password,
            })
          })
          .then(response => response.json())
          .then(response => {
            Swal.fire(
              'Great',
              response['success'],
              'success'
            );
            setToken('myToken', response['token']['access']);
            setGroup('myGroup', response['group']);
            navigation.navigate('Home');
          })
          .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
        <Image source={require('../../../assets/images/SUlogo.png')}
        style={{ width: 400, height: 200, resizeMode: 'contain' }}/>
      <Text style={styles.title}>Login</Text>
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
</View>
<Button
title="Login"
onPress={handleSignUp}
disabled={!email || !password}
style={styles.button}
accessibilityLabel="Sign up button"
>
<Text style={styles.buttonText}>Sign Up</Text>
</Button>
</View>
);
};

export default Login;
