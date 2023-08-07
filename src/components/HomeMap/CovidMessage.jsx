import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#84a5da',
      padding: 10,
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
      borderBottomLeftRadius: 7,
      borderBottomRightRadius: 7,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        color: '#dfe8f7',
        fontSize: 15,
        marginBottom: 8,

    },
    learnmMore: {
        color: '#ffff',
        fontSize: 15,
        fontWeight: 'bold',
    },
  });


function CovidMessage() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Travel only if necessary</Text>
        <Text style={styles.text}>
        All non-essential travel is strongly discouraged. 
        As additional use of petroleum is harmful to our mother nature.</Text>
    </View>
  )
}

export default CovidMessage