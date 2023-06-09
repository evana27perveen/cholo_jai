import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  middleContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  rightContainer:{
    width: 100,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  image: {
    height: 70,
    width: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  time: {
    color: '#5d5d5d'
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

const UberTypesRow = ({ type }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={type.imagePath} />
      <View style={styles.middleContainer}>
        <Text style={styles.title}>
          {type.type} {'  '}
          <Ionicons name={'person'} size={16}/>
        </Text>
        <Text style={styles.time}>
          8:03PM drop off
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Ionicons name={'pricetag'} size={18} color={'#42d742'} />
        <Text style={styles.price}> ৳{type.price}</Text>
      </View>
    </View>
  );
}

UberTypesRow.propTypes = {
  type: PropTypes.shape({
    imagePath: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default UberTypesRow;
