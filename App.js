import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/HomeScreen/Home';
import History from './src/screens/HomeScreen/History';
import DriverHistory from './src/screens/HomeScreen/DriverHistory';
import Search from './src/screens/SearchScreen/Search';
import DestinationSearch from './src/screens/SearchScreen/DestinationSearch';
import RideSearch from './src/screens/FindRideScreen/RideSearch';
import SignUp from './src/screens/AuthScreen/SignUp';
import DriverSignUp from './src/screens/AuthScreen/DriverSignUp';
import Login from './src/screens/AuthScreen/Login';
import DriverHome from './src/screens/HomeScreen/DriverHome';
import RideRequest from './src/components/RideFind/RideRequest';
import Payment from './src/components/RideFind/Payment';
import RideDetails from './src/components/RideFind/RideDetails';
import FeedBack from './src/components/RideFind/FeedBack';

const Stack = createStackNavigator();




export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="DriverSignUp" component={DriverSignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="DriverHome" component={DriverHome} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
          <Stack.Screen name="DriverHistory" component={DriverHistory} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="DestinationSearch" component={DestinationSearch} options={{ headerShown: false }} />
          <Stack.Screen name="RideSearch" component={RideSearch} options={{ headerShown: false }} />
          <Stack.Screen name="RideRequest" component={RideRequest} options={{ headerShown: false }} />
          <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
          <Stack.Screen name="RideDetails" component={RideDetails} options={{ headerShown: false }} />
          <Stack.Screen name="FeedBack" component={FeedBack} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
