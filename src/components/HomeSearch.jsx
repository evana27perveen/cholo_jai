import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';



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
      padding: 20,
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#dbdbdb',
    },

    iconContainer: {
      backgroundColor: '#b3b3b3',
      padding: 10,
      borderRadius: 25,
    },
    destinationText: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: '500',

    },
  });


function HomeSearch() {
  return (
    <View>
        <View style={styles.inputBox}>
          <Text style={styles.inputText}>Where To?</Text>
          <View style={styles.timeContainer}>
            <AntDesign name={"clockcircle"} size={16} color={'#535353'}/>
            <Text>Now</Text>
            <MaterialIcons name={"keyboard-arrow-down"} size={16}/>
          </View>
        </View>


        <View style={styles.row}>
          <View style={styles.iconContainer}>
          <AntDesign name={"clockcircle"} size={20} color={'#ffffff'}/>
          </View>
          <Text style={styles.destinationText}>Spin Nightclub</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.iconContainer, {backgroundColor: '#218cff'}]}>
          <Entypo name={"home"} size={20} color={'#ffffff'}/>
          </View>
          <Text style={styles.destinationText}>Home</Text>
        </View>
    </View>
  )
}

export default HomeSearch