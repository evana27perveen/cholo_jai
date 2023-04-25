import React, { useState, useEffect } from 'react';
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

export default function DestinationMap() {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  const [showButton, setShowButton] = useState(false);
  // const [directions, setDirections] = useState([]);

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
    })();
  }, []);

  const handlePress = async () => {
    let geocode = await Location.geocodeAsync(address);
    setLocation(geocode[0]);
    

    
  };

  const calculateDistance = () => {
    if (userLocation && location) {
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(location.latitude - userLocation.latitude);
      const dLon = deg2rad(location.longitude - userLocation.longitude);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(userLocation.latitude)) *
          Math.cos(deg2rad(location.latitude)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in km
      setDistance(distance);
      console.log('distance:', distance);
      // setShowButton(false);

      // let directions = [
      //   { latitude: userLocation.latitude, longitude: userLocation.longitude },
      //   { latitude: location.latitude, longitude: location.longitude },
      // ];
      // setDirections(directions);
    }
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
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
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Map</Text>
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
            source={require('../../../assets/images/desticon.png')}
            
            style={{ width: 35, height: 33, resizeMode: 'contain' }}
            />
        </Marker>
        {/* {directions.length > 0 && (
            <Polyline
              coordinates={directions}
              strokeColor="#000"
              strokeWidth={2}
            />
          )} */}
        </MapView>
        )}
        {distance && (
        <Text style={styles.distanceText}>
        Distance: {distance.toFixed(2)} km
        </Text>
        )}

    {showButton && (
            <View style={{marginTop: 10}}>
              <Button
                style={{ opacity: 0 }}
                color='#608bad'
                onPress={calculateDistance}
                title='Calculate Distance'
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
backgroundColor: '#2196F3',
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
height: 500,

},
distanceText: {
position: 'absolute',
bottom: 20,
backgroundColor: '#fff',
padding: 10,
borderRadius: 5,
elevation: 5,
alignSelf: 'center',
fontWeight: 'bold',
},
});
