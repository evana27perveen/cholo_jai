import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCookies } from 'react-cookie';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#e7e7e7',
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#434343',
  },
  timeContainer: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  row: {
    backgroundColor: '#84a5da',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 25,
  },
  iconContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
  },
  destinationText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

function HomeSearch() {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const moveAnimation = useRef(new Animated.Value(0)).current;

  const [token, setToken, removeToken] = useCookies(['myToken']);
  const [group, setGroup, removeGroup] = useCookies(['myGroup']);
  const [profile, setProfile, removeProfile] = useCookies(['myProfile']);

  const handleLogoutPress = () => {
    if (animationInProgress) {
      return;
    }

    setExpanded(!expanded);
    setAnimationInProgress(true);
    const toValue = expanded ? 0 : 180;
    Animated.spring(moveAnimation, {
      toValue,
      friction: 8,
      useNativeDriver: false,
    }).start(() => {
      
        logoutNow();
     
      setAnimationInProgress(false);
    });
  };

  const logoutNow = () => {
    removeToken('myToken', { path: '/' });
    removeProfile('myProfile', { path: '/' });
    removeGroup('myGroup', { path: '/' });
    navigation.navigate('Login');
    console.log('Logging out...');
  };

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('DestinationSearch')}>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>Where To?</Text>
          <View style={styles.timeContainer}>
            <AntDesign name={"clockcircle"} size={16} color={'#535353'}/>
            <Text>Now</Text>
            <MaterialIcons name={"keyboard-arrow-down"} size={16}/>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.row} onPress={handleLogoutPress}>
        <Text style={styles.destinationText}>Log Out  :  </Text>
        <Animated.View style={[styles.iconContainer, { marginLeft: moveAnimation }]}>
          <MaterialCommunityIcons name="account-off-outline" size={24} color="#427fe2" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

export default HomeSearch;
