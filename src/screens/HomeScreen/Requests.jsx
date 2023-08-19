import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import NavBar from '../../components/NavBar';
import API_BASE_URL from '../../apiConfig';
import { useCookies } from 'react-cookie';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 20,
  },
  rideContainer: {
    backgroundColor: '#e7eef8',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#427fe2',
    padding: 12,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
  },
  tocardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    textAlign: 'right',
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: '#333',
    textAlign: 'center',
  },
  rideText: {
    fontSize: 12,
    marginBottom: 5,
    color: 'black',
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    textAlign: 'center',
  },
  statusText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#427fe2',
    textAlign: 'center',
    fontWeight: 'bold',
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

function Requests() {
  const [rideEntries, setRideEntries] = useState([]);

  const [token] = useCookies(['myToken']);
  const navigation = useNavigation();


  useEffect(() => {
    fetchRideData();
    const intervalId = setInterval(fetchRideData, 5000);
    return () => {
      clearInterval(intervalId); 
      console.log('successfully stopped');
    };
  }, []);

  const fetchRideData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/location/requests/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const jsonData = await response.json();
      
      if (response.ok) {
        setRideEntries(jsonData.requests);
      } else {
        console.log('Error fetching ride data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const updateStatus = async (statusText, rideID) => {
    try {
      const response = await fetch(`${API_BASE_URL}/location/accepts/${rideID}/`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      const jsonResponse = await response.text();

      if (response.ok) {
        console.log('successfully updated');
        navigation.navigate('RideDetails', { rideID });
      } else {
        console.log('Error :', jsonResponse); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
      <ScrollView>
        {rideEntries.length === 0 ? (
          <Text style={styles.Title}>Currently no requests</Text>
        ) : (
          rideEntries.map((item) => (
            <View key={item.id} style={styles.rideContainer}>
              <Text style={styles.cardTitle}>From: {item.user_location}</Text>
              <Text style={styles.tocardTitle}>To: {item.destination_location}</Text>
              <Text style={styles.rideText}>{moment(item.date).format('MMMM DD, YYYY - h:mm A')}</Text>
              <TouchableOpacity style={styles.cardButton} onPress={() => updateStatus('Accepted', item.id)}>
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
    </>
  );
}

export default Requests;
