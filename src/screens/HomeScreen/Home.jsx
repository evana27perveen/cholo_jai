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
    height: '50%',
  },
});

function Home(props) {
  return (
    <>
      <View style={styles.container}>

      <View style = {styles.mapContainer}>
      <CurrentLocation/>
      </View>
      <CovidMessage/>
      <HomeSearch />
      </View>
      
    </>
  )
}


export default Home

