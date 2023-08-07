import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import NavBar from '../../components/NavBar';
import API_BASE_URL from '../../apiConfig';
import { useCookies } from 'react-cookie';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  rideContainer: {
    backgroundColor: '#e7eef8',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#427fe2',
    padding: 12,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
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
});

function History() {
  const [rideEntries, setRideEntries] = useState([]);
  const [activeButton, setActiveButton] = useState('history');

  const [token] = useCookies(['myToken']);
  const navigation = useNavigation();

  const handleHistoryPress = () => {
    setActiveButton('history');
  };

  useEffect(() => {
    fetchRideData();
  }, []);

  const fetchRideData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/location/rides/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const jsonData = await response.json();
      if (response.ok) {
        setRideEntries(jsonData);
      } else {
        console.log('Error fetching ride data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
      <Text style={styles.Title}>Travel History</Text>
        <ScrollView>
          {rideEntries.map((item) => (
            <View key={item.id} style={styles.rideContainer}>
              <Text style={styles.cardText}>From:</Text>
              <Text style={styles.cardTitle}>{item.user_location}</Text>
              <Text style={styles.cardText}>To:</Text>
              <Text style={styles.cardTitle}>{item.destination_location}</Text>
              <Text style={styles.rideText}>{moment(item.date).format('MMMM DD, YYYY - h:mm A')}</Text>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <NavBar onHistoryPress={handleHistoryPress} activeButton={activeButton} />
    </>
  );
}

export default History;
