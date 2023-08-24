import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCookies } from 'react-cookie';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import API_BASE_URL from '../../apiConfig';

const FeedBack = ({ route }) => {
  const navigation = useNavigation();
  const { rideID } = route.params;
  const [token] = useCookies(['myToken']);

  const [rating, setRating] = useState(0); // Initialize rating state to 0
  const [complain, setComplain] = useState('');

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('rating', rating.toString()); // Convert rating to string
    formData.append('complain', complain);
    console.log(formData);

    try {
      const response = await fetch(`${API_BASE_URL}/location/feed-back/${rideID}/`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token.access_token}`,
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Feedback submitted successfully');
        navigation.navigate('Home');
      } else {
        console.log('Error submitting feedback');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Give Feedback</Text>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        selectedStar={(rating) => setRating(rating)}
      />
      <TextInput
        placeholder="FeedBack / Complaints"
        value={complain}
        onChangeText={setComplain}
        style={styles.input}
      />
      
      <TouchableOpacity style={styles.cardButton} onPress={handleSubmit}>
                    <Text style={styles.iconText}>
                    <MaterialCommunityIcons name="email-newsletter" size={44} color="#fff" />
                    </Text>
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  button2: {
    backgroundColor: '#411e69',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderRadius: 5,
    marginTop: 8, // Fixed the typo here
    marginBottom: 8,
    borderTopWidth: 1,
    borderColor: '#fcf6f6',
  },
  cardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    backgroundColor: '#84a5da',
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#427fe2',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconText: {
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 1,
    marginBottom: 2,
    letterSpacing: 1.5,
    fontWeight: 'bold',
  },
});

export default FeedBack;
