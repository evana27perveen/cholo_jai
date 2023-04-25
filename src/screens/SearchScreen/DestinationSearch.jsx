import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import HomeMap from '../../components/HomeMap/DestinationMap';
import CovidMessage from '../../components/HomeMap/CovidMessage';
import HomeSearch from '../../components/HomeSearch';

import LocationInput from '../../components/HomeMap/LocationInput';
import CurrentLocation from '../../components/HomeMap/CurrentLocation';
import DestinationMap from '../../components/HomeMap/DestinationMap';



const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    
  },
  mapContainer: {
    height: '100%',
  },
});

function DestinationSearch(props) {
  return (
    <>
      <View style={styles.container}>

      <View style = {styles.mapContainer}>
      <DestinationMap/>
      </View>
      </View>
      
    </>
  )
}


export default DestinationSearch

