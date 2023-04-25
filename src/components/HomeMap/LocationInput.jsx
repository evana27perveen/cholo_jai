import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useState } from 'react';


const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: '100%',
   width: '100%',
   borderTopWidth: 3, 
   borderColor: '#a3c3f5', 
   borderRadius: 10,
   overflow: 'hidden',
   
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});



function LocationInput() {


    const [location, setLocation] = useState(null);

  const handleMapPress = event => {
    console.log('handleMapPress called');
    const { coordinate } = event.nativeEvent;
    setLocation(coordinate);
    console.warn(coordinate)
  }
  return (

    <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE}
       style={styles.map}
       region={{
         latitude: 23.746466,
         longitude: 90.376015,
         latitudeDelta: 0.015,
         longitudeDelta: 0.015,
       }}
       onPress={handleMapPress}
     >
     {location && (
          <Marker
            coordinate={location}
            title="Selected Location"
            description="This is the location that you selected"
            pinColor="blue"
          />
        )}
     </MapView>
   </View>

  )
}

export default LocationInput