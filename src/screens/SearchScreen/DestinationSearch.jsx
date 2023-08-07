import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DestinationMap from '../../components/HomeMap/DestinationMap';

import NavBar from '../../components/NavBar';



const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    
  },
  mapContainer: {
    height: '100%',
  },
});

function DestinationSearch(props) {

  const [activeButton, setActiveButton] = useState('destinationSearch');
  
  
  const handleDestinationSearchPress = () => {
        setActiveButton('destinationSearch');
      };
  return (
    <>
      <View style={styles.container}>

      <View style = {styles.mapContainer}>
      <DestinationMap/>
      </View>
      </View>
      <NavBar onDestinationSearchPress={handleDestinationSearchPress} activeButton={activeButton} />
    </>
  )
}


export default DestinationSearch

