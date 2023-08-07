import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useCookies } from 'react-cookie';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../apiConfig';

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [token] = useCookies(['myToken']);
  const [group] = useCookies(['myGroup']);
  const navigation = useNavigation();
  console.log(token);


  const handleSubmit = async () => {

    const data = new FormData();
    data.append('full_name', fullName);
    data.append('phone_number', phoneNumber);



    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile-view/`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token.access_token}`,
        },
        body: data,
      });
      const responseData = await response.json();
      console.log(responseData);
      console.log(token.group);

      if (token.group === 'CUSTOMER'){
        navigation.navigate('Home');
      }
    } 
    catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      
      <Button 
      style={{ width: '80%', borderRadius: 5, }}
      title="Submit" 
      disabled={!fullName || !phoneNumber}
      onPress={handleSubmit}
      color="#FECE00" />
    </View>
  );
};

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
  input: {
    borderBottomWidth: 1,
    borderColor: '#030303',
    marginBottom: 16,
    padding: 8,
    fontSize: 16,
    width: '80%',
  },
  uploadContainer: {
    alignItems: 'center',
    margin: 8,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 8,
  },
  
});

export default Profile;
