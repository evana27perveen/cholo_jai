import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const NavBar = ({ activeButton }) => {
  const navigation = useNavigation();

  const handlePress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, activeButton === 'home' ? styles.activeButton : null]}
        onPress={() => handlePress('Home')}
      >
        <Text style={styles.iconText}>
          <MaterialCommunityIcons name="home-map-marker" size={24} color="#fff" />
        </Text>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, activeButton === 'history' ? styles.activeButton : null]}
        onPress={() => handlePress('History')}
      >
        <Text style={styles.iconText}>
        <MaterialCommunityIcons name="book-marker-outline" size={24} color="#fff" />
        </Text>
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>

      

      <TouchableOpacity
        style={[styles.button, activeButton === 'destinationSearch' ? styles.activeButton : null]}
        onPress={() => handlePress('DestinationSearch')}
      >
        <Text style={styles.iconText}>
          <Icon name="search" size={24} color="#fff" />
        </Text>
        <Text style={styles.buttonText}>Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#84a5da',
    height: 60,
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
  },
  button: {
    alignItems: 'center',
  },
  iconText: {
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  activeButton: {
    backgroundColor: '#427fe2',
    borderColor: '#96c0c7',
    padding: 5,
    borderRadius: 15,
    borderWidth: 2,
  },
});

export default NavBar;
