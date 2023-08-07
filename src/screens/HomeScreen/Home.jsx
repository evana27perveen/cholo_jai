import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CovidMessage from '../../components/HomeMap/CovidMessage';
import HomeSearch from '../../components/HomeSearch';

import CurrentLocation from '../../components/HomeMap/CurrentLocation';
import NavBar from '../../components/NavBar'



const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    
  },
  mapContainer: {
    height: '57%',
  },
});

function Home(props) {
  
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
      <CovidMessage/>
      <HomeSearch />
      </View>
      <NavBar onHomePress={handleHomePress} activeButton={activeButton} />
    </>
  )
}


export default Home

