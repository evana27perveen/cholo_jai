import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Pressable, Text, TextInput, StyleSheet, SafeAreaView, Button, Alert } from 'react-native';
import UberTypesRow from './UberTypesRow';
import typesData from '../../../assets/data/types';

const SearchRide = () => {
  const confirm = () => {
    console.warn('confirm');
  };

  return (
    <View>
      {typesData.map((type) => (
        <UberTypesRow type={type} key={type.id} />
      ))}
      <Pressable
        style={{
          backgroundColor: 'black',
          padding: 10,
          margin: 10,
          alignItems: 'center',
        }}
        onPress={confirm}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirm Uber</Text>
      </Pressable>
    </View>
  );
};

UberTypesRow.propTypes = {
  type: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    multiplier: PropTypes.number.isRequired,
  }).isRequired,
};

export default SearchRide;
