import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, reverseGeocodeAsync } from 'expo-location';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
    })();
  }, []);

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
