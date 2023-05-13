import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useCookies } from 'react-cookie';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [token] = useCookies(['myToken']);
  const [group] = useCookies(['myGroup']);
  const navigation = useNavigation();

  const handleProfilePictureUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setProfilePicture(uri);
    }
  };

  const handleSubmit = async () => {

    const data = new FormData();
    data.append('full_name', fullName);
    data.append('phone_number', phoneNumber);
    // if (profilePicture) {
    //   const localUri = await fetch(profilePicture);
    //   const filename = profilePicture.split('/').pop();
    //   const match = /\.(\w+)$/.exec(filename);
    //   const type = match ? `image/${match[1]}` : 'image';
    //   data.append('profile_picture', { uri: localUri, name: filename, type });
    // }



    try {
      const response = await fetch('http://192.168.0.106:8000/auth/profile-view/', {
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



    } catch (error) {
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
      {/* <View style={styles.uploadContainer}>
        {profilePicture && (
          <Image source={{ uri: profilePicture }} style={styles.image} />
        )}
        <Button
          title="Upload Profile Picture"
          onPress={handleProfilePictureUpload}
          color="#6d6b19"
        />
      </View> */}
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
