import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Button, Alert } from 'react-native';
import HomeMap from '../../components/HomeMap/DestinationMap';
import SearchRide from '../../components/RideFind/SearchRide';




function RideSearch() {
  return (
    <View>
        <HomeMap />
        <SearchRide />
    </View>
  )
}

export default RideSearch