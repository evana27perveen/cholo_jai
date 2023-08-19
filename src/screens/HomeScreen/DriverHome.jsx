import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import CurrentLocation from '../../components/HomeMap/CurrentLocation';
import DriverNavBar from '../../components/DriverNavBar';
import LogOut from './DriverLogOut';
import Requests from './Requests';



const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    
  },
  mapContainer: {
    height: '54%',
  },
  content: {
    height: '30%'
  },
});

function DriverHome() {
  
  const [activeButton, setActiveButton] = useState('home');
  
  
  const handleHomePress = () => {
        setActiveButton('home');
      };



  return (
    <>
      <View style={styles.container}>

      <View style = {styles.mapContainer}>
      <CurrentLocation/>
      </View>
      <View style = {styles.content}>
      <Requests />
      </View>
      <LogOut/>
      </View>
      <DriverNavBar onHomePress={handleHomePress} activeButton={activeButton} />
    </>
  )
}

export default DriverHome

