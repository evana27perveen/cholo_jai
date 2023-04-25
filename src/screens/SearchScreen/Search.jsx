import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Button, Alert } from 'react-native';



const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderStartColor: '#FFFFFF',
      height: '100%',
      marginTop: 50,

    },
    textInput: {
      padding: 5,
      backgroundColor: '#eeeeee',
      marginVertical: 5,
    },
  });


function Search() {

const [fromText, setFromText] = useState(null);
const [toText, setToText] = useState(null);

const handleFromTextChange = (text) => {
    setFromText(text);
  };

  const handleToTextChange = (text) => {
    setToText(text);
  };

  useEffect(() => {
    if(fromText && toText) {
      console.warn('Redirect to result');
    }
  }, [fromText, toText]);


  return (
    <SafeAreaView>
    <View style={styles.container}>
        <TextInput style={styles.textInput} 
        value={fromText}
        onChangeText={handleFromTextChange}
        placeholder="From"/>
        <TextInput style={styles.textInput} 
        value={toText}
        onChangeText={handleToTextChange}
        placeholder="Where To?"/>

        {/* <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
                console.log(data, details);
            }}
            query={{
                key: 'AIzaSyB1koK7KQe0YzwScTNjC7lHRSi7my056bk',
                language: 'en',
            }}
        /> */}

        {/* <Button
        onPress={() => Alert.alert("clicked")}
        title="Request a Ride"
        color="#4a74ac"
        accessibilityLabel="Learn more about this button"
        /> */}
    </View>
    </SafeAreaView>
  )
}

export default Search