import React, {useState, useEffect} from 'react';
import { View, Pressable, Text, TextInput, StyleSheet, SafeAreaView, Button, Alert } from 'react-native';
import UberTypesRow from './UberTypesRow';
import { PointPropType } from 'deprecated-react-native-prop-types';


import typesData from '../../../assets/data/types';


const confirm = () => {
  console.warn('confirm');
};

function SearchRide() {
  return (
    <View>
    {typesData.map((type) => (<UberTypesRow type={type}/>))}
    
    <Pressable style={{
      backgroundColor: 'black',
      padding: 10,
      margin: 10,
      alignItems: 'center',
    }}
    onPress={confirm}>
      <Text 
      style={{
        color: 'white', 
        fontWeight: 'bold'
        }}>
      Confirm Uber</Text>
    </Pressable>
    </View>
  )
}

export default SearchRide