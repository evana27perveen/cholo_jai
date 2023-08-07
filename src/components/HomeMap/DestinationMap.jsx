import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import API_BASE_URL from '../../apiConfig';

export default function DestinationMap() {

  const [token] = useCookies(['myToken']);

  const navigation = useNavigation();

  const [address, setAddress] = useState('');
  const [userAddress, setUserAddress] = useState(null);
  const [location, setLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  const [showButton, setShowButton] = useState(false);
  const [cost, setCost] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let geocode = await Location.geocodeAsync(address);
      setLocation(geocode[0]);
    })();
  }, [address]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
      setShowButton(true);
      try {
        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
  
        // Create a formatted address string from the reverse geocode results
        let formattedAddress = '';
        const components = [
          reverseGeocode[0].street,
          reverseGeocode[0].city,
          reverseGeocode[0].region,
          reverseGeocode[0].postalCode,
          reverseGeocode[0].country,
        ];
        const UA = components.filter((component) => component !== null).join(', ');
  
        // Update the user's address state
        setUserAddress(UA);
      } catch (error) {
        console.error('Error fetching user address:', error);
      }
    })();
  }, []);

  const handlePress = async () => {
    let geocode = await Location.geocodeAsync(address);
    setLocation(geocode[0]);
    

    
  };

  const calculateDistance = () => {
    if (userLocation && location) {
      const R = 6371;
      const dLat = deg2rad(location.latitude - userLocation.latitude);
      const dLon = deg2rad(location.longitude - userLocation.longitude);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(userLocation.latitude)) *
          Math.cos(deg2rad(location.latitude)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; 
      const baseFare = 80;
      const additionalFarePerKilometer = 40;
      let fare = baseFare;
          if (distance > 2) {
            const additionalDistance = distance - 2;
            fare = (fare*2) + (additionalDistance * additionalFarePerKilometer);
          }
          else {
            fare = distance * baseFare;
          }
      const price = fare
      setDistance(distance.toFixed(2));
      setCost(price.toFixed(2));
    }
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const handleSubmit = async () => {
    if (distance && cost && location) {
      try {
        const response = await fetch(`${API_BASE_URL}/location/rides/`, {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
          },
          body: JSON.stringify({
            user_cords_lat: userLocation.latitude,
            user_cords_long: userLocation.longitude,
            loc_cords_lat: location.latitude,
            loc_cords_long: location.longitude,
            user_location: userAddress, 
            destination_location: address,
            distance: parseFloat(distance),
            cost: parseFloat(cost),
            status: 'Requested',
          }),
        });

        const jsonResponse = await response.json();
        const data = jsonResponse.data

      if (response.ok) {
          
          console.log('Ride created successfully');
          navigation.navigate('RideRequest', { rideID: data.id });
        } else {
          console.log('Error creating ride');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder='Enter an address'
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={calculateDistance}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        

        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            pinColor='red'
            title='Your location'
          />
        )}
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            pinColor='blue'
            title={address}
          />
        )}
        {userLocation && location && (
          <MapView
            style={styles.map}
            region={{
              latitude: (userLocation.latitude + location.latitude) / 2,
        longitude: (userLocation.longitude + location.longitude) / 2,
        latitudeDelta: Math.abs(userLocation.latitude - location.latitude) * 2,
        longitudeDelta: Math.abs(userLocation.longitude - location.longitude) * 2,
        }}
        >
        <Marker
        coordinate={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        }}
        anchor={{ x: 0.5, y: 1 }}
        ><Image
            source={require('../../../assets/images/user.png')}
            
            style={{ width: 35, height: 33, resizeMode: 'contain' }}
            />
        </Marker>
        <Marker
        coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
        }}
        anchor={{ x: 0.5, y: 1 }}
        ><Image
            source={require('../../../assets/images/desticon.gif')}
            
            style={{ width: 39, height: 35, resizeMode: 'contain' }}
            />
        </Marker>
        
        </MapView>
        )}
        {distance && (
          <View>
          <Text style={styles.distanceText}>
        Distance: {distance} km & Price: {cost}
        </Text>
          <Button
                style={{ opacity: 0 }}
                color='#608bad'
                onPress={handleSubmit}
                title='Request for a ride'
              />
              
          </View>
        )}

    
    </View>
    </SafeAreaView>
    );
    }

const styles = StyleSheet.create({
container: {
flex: 1,
},
searchContainer: {
flexDirection: 'row',
alignItems: 'center',
paddingHorizontal: 10,
paddingVertical: 25,
backgroundColor: '#f2f2f2',
marginTop: 20,
},
input: {
flex: 1,
height: 40,
borderColor: 'gray',
borderWidth: 1,
borderRadius: 5,
paddingHorizontal: 10,
marginRight: 10,
backgroundColor: '#fff',
},
button: {
backgroundColor: '#608bad',
paddingVertical: 10,
paddingHorizontal: 15,
borderRadius: 10,
},
buttonText: {
color: '#fff',
fontSize: 16,
fontWeight: 'bold',
},
mapContainer: {
flex: 1,
padding: 10,
alignItems: 'center',
borderRadius: 15,
},
map: {
width: '100%',
height: 450,

},
distanceText: {
bottom: 20,
backgroundColor: '#fff',
padding: 10,
borderRadius: 5,
elevation: 5,
alignSelf: 'center',
fontWeight: 'bold',
},
});
