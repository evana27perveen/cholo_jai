import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCookies } from 'react-cookie';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  
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

function LogOut() {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const moveAnimation = useRef(new Animated.Value(0)).current;

  const [token, setToken, removeToken] = useCookies(['myToken']);
  const [group, setGroup, removeGroup] = useCookies(['myGroup']);

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
    removeGroup('myGroup', { path: '/' });
    navigation.navigate('Login');
    console.log('Logging out...');
  };

  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={handleLogoutPress}>
        <Text style={styles.destinationText}>Log Out  :  </Text>
        <Animated.View style={[styles.iconContainer, { marginLeft: moveAnimation }]}>
          <MaterialCommunityIcons name="account-off-outline" size={24} color="#427fe2" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

export default LogOut;
