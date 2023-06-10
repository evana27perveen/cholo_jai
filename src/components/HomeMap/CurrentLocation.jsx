import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, reverseGeocodeAsync } from 'expo-location';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useCookies } from 'react-cookie';
import { useNavigation } from '@react-navigation/native';



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  addressContainer: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

function CurrentLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [token] = useCookies(['myToken']);
  const [group] = useCookies(['myGroup']);
  const [street, setStreet] = useState(' ');
  const [postalCode, setPostalCode] = useState(' ');
  const [city, setCity] = useState(' ');
  const [region, setRegion] = useState(' ');
  const [country, setCountry] = useState(' ');
  
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await getCurrentPositionAsync({});
      setLocation(location);

      let addressResponse = await reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setAddress(addressResponse[0]);
      console.log(address);
      
        
          setStreet(address.street);
        
        
          setPostalCode(address.postalCode);
        
        
          setCity(address.city);
        
        
          setRegion(address.region);
        
        
          setCountry(address.country);
        
      

      const data = new FormData();
      data.append('loc_cords_lat', JSON.stringify(location.coords.latitude));
      data.append('loc_cords_long', JSON.stringify(location.coords.longitude));
      data.append('loc_street', street);
      data.append('loc_postalCode', postalCode);
      data.append('loc_city', city);
      data.append('loc_region', region);
      data.append('loc_country', country);

      try {
        const response = await fetch('http://192.168.0.106:8000/location/current-location/', {
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
      } catch (error) {
        console.error(error);
      }
    })();
  }, [address]);

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  } else if (!location) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Current Location"
              description="This is your current location"
              pinColor="red"
              icon={<FontAwesome name="user" size={24} color="black" />}
            />
          )}
        </MapView>
        <View style={styles.addressContainer}>
          {address && (
            <>
              <Text style={{ fontWeight: 'bold' }}>Current Location:</Text>
              <Text>{address.street}, {address.postalCode} {address.city}, {address.region}, {address.country}</Text>
            </>
          )}
        </View>
      </View>
    );
  }
}

export default CurrentLocation;
