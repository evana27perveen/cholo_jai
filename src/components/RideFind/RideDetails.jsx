import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../apiConfig';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavBar from '../../components/NavBar';
import moment from 'moment';

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    marginTop: 40,
    width: '100%',
    height: '25%',
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#84a5da',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#427fe2',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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

  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
  },

  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    textAlign: 'center',
  },
  noticeText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'green',
    textAlign: 'center',
  },
});

function RideDetails({ route }) {
  const { rideID } = route.params;

  const [token] = useCookies(['myToken']);
  const navigation = useNavigation();

  const [rideData, setRideData] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => {
      clearInterval(intervalId); 
      console.log('successfully stopped');
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/location/rides/${rideID}/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        setRideData(jsonResponse);
        setStatus(jsonResponse.status);
        console.log('Ride get successfully');
      } else {
        console.log('Error getting ride:', jsonResponse); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateStatus = async (statusText) => {
    try {
      const response = await fetch(`${API_BASE_URL}/location/rides/${rideID}/`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
        body: JSON.stringify({
            status: statusText,
          }),
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        console.log('successfully updated');
        setStatus(jsonResponse.status);
        navigation.navigate('DriverHome');
      } else {
        console.log('Error :', jsonResponse); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.main}>
      {status === 'Requested' && (
        <Image
          source={require('../../../assets/images/waiting.gif')}
          style={styles.backgroundImage}
        />
      )}
      <View style={styles.container}>
        {rideData && (
          <>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{moment(rideData.date).format('MMMM DD, YYYY - h:mm A')}</Text>
                <Text style={styles.cardText}>From: </Text>
                <Text style={styles.cardTitle}>{rideData.user_location}</Text>
                <Text style={styles.cardText}>To: </Text>
                <Text style={styles.cardTitle}>{rideData.destination_location}</Text>
                <Text style={styles.cardText}>Distance: {rideData.distance} km</Text>
                <Text style={styles.cardTitle}>Cost: {rideData.cost} BDT</Text>
              </View>
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Request Status : {status}</Text>
              </View>
            </View>
            {status === 'Completed' && (
                <>
                    <Text style={styles.noticeText}>Confirm the Payment</Text>
                    <TouchableOpacity style={styles.cardButton} onPress={() => updateStatus('Payment Done')}>
                        <Text style={styles.iconText}>
                        <MaterialIcons name="payment" size={44} color="#fff" />
                        </Text>
                        <Text style={styles.buttonText}>Payment Done</Text>
                    </TouchableOpacity>
                </>
            )}
            
          </>
        )}
      </View>
      <NavBar />
    </View>
  );
}

export default RideDetails;
