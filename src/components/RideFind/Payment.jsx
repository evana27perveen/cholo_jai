import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity, Text, Image, StyleSheet, View, TextInput, Alert, Animated, Easing  } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useCookies } from 'react-cookie';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../apiConfig';

const Payment = ({ route }) => {
    const { amount, rideID } = route.params;
    const [token] = useCookies(['myToken']);
    const today = new Date();
    const fullDate = today.toISOString().split('T')[0];
    const [pin, setPin] = useState('');
    const [phone, setPhone] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [animationProgress, setAnimationProgress] = useState(new Animated.Value(0));
    const [isBkashCard1Visible, setBkashCard1Visible] = useState(true);
    const [isBkashCard2Visible, setBkashCard2Visible] = useState(false);
    const [isBkashCard3Visible, setBkashCard3Visible] = useState(false);
    const [formData, setFormData] = useState({
      payment_method: 'online payment',
      amount: amount,
      status: true,
  });
    
    const navigation = useNavigation();

    const handleProceed = async () => {
      if (!isChecked) {
        Alert.alert('Alert', 'You need to agree to the Terms and Conditions.');
        return;
      }
      if (!phone) {
        Alert.alert('Phone number is required');
        return;
      }
      if (phone.length !== 11 || !phone.startsWith('01')) {
        Alert.alert('Enter a Valid Phone Number');
        return;
      }
      else{
        setBkashCard1Visible(false);
        setBkashCard2Visible(true);
      }
    }

    const handlePin = () => {
      if (!pin) {
        Alert.alert('PIN is required');
        return;
      }
      if (phone.length < 6) {
        Alert.alert('Enter a Valid Phone Number');
        return;
      }
      else{
        setBkashCard2Visible(false);
        setBkashCard3Visible(true);
        
        // Start the progress animation
        Animated.timing(animationProgress, {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: false,
      }).start(() => {
        handleCreatePayment();
      });
      }
    }

    const handleCreatePayment = async () => {
        
        try {
          const response = await fetch(`${API_BASE_URL}/location/payment/${rideID}/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.access_token}`,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(formData),
        });
          if (response.ok) {
            console.log('Payment Successful !!!');
            navigation.navigate('FeedBack', { rideID: rideID });

          } else {
            console.error('Payment Failed !!');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
    

      


  return (
    <View style={styles.container}>
            <View style={styles.content}>
                {isBkashCard1Visible && (
                    <View style={styles.bkashCard}>
                        
                        <View style={styles.textCard}>
                            <Text style={styles.text}>Merchant: cably.com</Text>
                            <Text style={styles.text}>Date: {fullDate}</Text>
                            <Text style={styles.text}>Amount: {amount}</Text>
                        </View>
                        <View style={styles.textInputCard}>
                            <Text style={styles.text}>Your Wallet Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g 01XXXXXXXXX"
                                placeholderStyle={{ fontSize: 14 }} 
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="numeric"
                            />
                            <View style={styles.checkboxContainer}>
                                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#411e69' : undefined}/>
                                <Text style={styles.termsText}>
                                    I agree to the 
                                    <Text style={styles.termsLink}> terms and conditions</Text>
                                </Text>
                            </View>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.button} onPress={handleProceed}>
                                    <Text style={styles.buttonText}>PROCEED</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Home');}}>
                                    <Text style={styles.buttonText}>CLOSE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                {isBkashCard2Visible && (
                    <View style={styles.bkashCard}>
                        
                        <View style={styles.textInputCard}>
                            <Text style={styles.text}>Enter PIN</Text>
                            <TextInput
                                style={styles.inputPin}
                                placeholder="..."
                                placeholderStyle={{ fontSize: 34 }} 
                                value={pin}
                                onChangeText={setPin}
                                fontSize={30}
                                secureTextEntry
                                keyboardType='numeric'
                            />
                            
                            <View style={styles.buttonsContainer2}>
                                <TouchableOpacity style={styles.button2} onPress={handlePin} >
                                  <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button2} onPress={() => {navigation.navigate('Home');}}>
                                    <Text style={styles.buttonText}>CLOSE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                {isBkashCard3Visible && (
                    <View style={styles.bkashCard}>

                        <View style={styles.textInputCard}>
                            <View style={styles.progressBarContainer}>
                                <Animated.View
                                    style={[styles.progressBar, { transform: [{ scaleX: animationProgress }] }]}
                                />
                            </View>
                            <Text style={styles.successText}>Payment Successful !!!</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666564',
},
content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 60,
    
},
logo: {
    width: '97%', 
    height: 120,
    resizeMode: 'contain',
    backgroundColor: 'white',
    marginBottom: 15,
},
bkashCard: {
    backgroundColor: '#9951ec',
    paddingVertical: 10,
    borderRadius: 3,
    marginVertical: 10,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, 
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 20,
    borderWidth: 1,
},
textCard: {
    backgroundColor: '#9951ec', 
    paddingVertical: 10,
    borderRadius: 3,
    width: '85%',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4, 
    shadowRadius: 6,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
},
textInputCard: {
    backgroundColor: '#9951ec',
    paddingVertical: 10,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
},
text: {
    color: 'white',
    fontSize: 14,
},
input: {
    backgroundColor: 'white',
    color: 'black',
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 8},
    buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
},
inputPin: {
  backgroundColor: 'white',
  color: 'black',
  width: '50%',
  height: '17%',
  paddingLeft: 10,
  paddingRight: 10,
  marginVertical: 8},
  buttonsContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  textAlign: 'center',
  paddingHorizontal: 20,
  marginTop: 10,
},
buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
},
buttonsContainer2: {
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  marginTop: 5,
  marginBottom: 5,
},
button: {
    backgroundColor: '#481a7c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderRadius: 5,
    marginRight: 2,
    marginLeft: 2,
    borderTopWidth: 1,
    borderColor: '#fcf6f6',
},
button2: {
  backgroundColor: '#411e69',
  paddingVertical: 10,
  paddingHorizontal: 20,
  justifyContent: 'space-between',
  borderRadius: 5,
  marginTom: 8,
  marginBottom: 8,
  borderTopWidth: 1,
  borderColor: '#fcf6f6',
},
buttonText: {
    color: '#fcf6f6',
    fontSize: 16,
    textAlign: 'center',
},
termsText: {
  color: 'white',
  fontSize: 14,
  marginTop: 10,
},
termsLink: {
  color: 'white',
  fontSize: 14,
  textDecorationLine: 'underline',
},
checkboxContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 10,
},
checkbox: {
  marginRight: 8,
  marginTop: 10,
  borderWidth: 1,
  borderColor: '#fcf6f6',
},
buttonImage: {
  width: 50, 
  height: 50,
},
progressBarContainer: {
  width: '100%',
  height: 12,
  backgroundColor: '#9951ec',
  borderRadius: 5,
  overflow: 'hidden',
  marginBottom: 15,
  marginTop: 15,
},
progressBar: {
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
},
successText: {
  color: '#fcf6f6',
  fontSize: 20,
  fontWeight: 'bold',
},
});

export default Payment;
