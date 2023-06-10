import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCookies } from 'react-cookie';

import * as Swal from 'sweetalert2';



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

        let formData = new FormData();

        formData.append("email", email);
        formData.append("password", password);

        let requestOption = {
          method: "POST",
          body: formData,
          redirect: "follow"
        };

        try {
          const response = await fetch(
            'http://192.168.0.106:8000/auth/login/',
            requestOption
          );
          const responseData = await response.text();
          const jsonResponse = JSON.parse(responseData);
    
          console.log('success', jsonResponse);
          setToken("access_token", jsonResponse.accessToken)
          setGroup("group", jsonResponse.group)


          if (jsonResponse.profile === "True"){
            if(jsonResponse.group === 'CUSTOMER') {
              navigation.navigate('Home');
            }
          }
          else {
              navigation.navigate('Profile');
          }
          
        } catch (error) {
          console.log('Error:', error);
          navigation.navigate('Login');

        }
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
<View style={{ width: '80%', borderRadius: 5, }}>
  <Button
    title="Login"
    onPress={handleSignUp}
    disabled={!email || !password}
    color="#FECE00"
    accessibilityLabel="Login button"
  >
    
  </Button>

  <Text style={{ marginTop: 16 }}>Don't have an account? 
  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
    <Text style={{ color: '#d4851d' }}> Signup here</Text>
  </TouchableOpacity>
</Text>
</View>
</View>
);
};

export default Login;
