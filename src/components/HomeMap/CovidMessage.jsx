import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#84a5da',
      padding: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
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
        <Text style={styles.text}>Due to the ongoing COVID-19 pandemic, 
        all non-essential travel is strongly discouraged.</Text>
        <Text style={styles.learnmMore}>Learn More </Text>
    </View>
  )
}

export default CovidMessage