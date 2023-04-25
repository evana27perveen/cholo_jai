import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/HomeScreen/Home';
import Search from './src/screens/SearchScreen/Search';
import DestinationSearch from './src/screens/SearchScreen/DestinationSearch';
import RideSearch from './src/screens/FindRideScreen/RideSearch';
import SignUp from './src/screens/AuthScreen/SignUp';
import Login from './src/screens/AuthScreen/Login';

const Stack = createStackNavigator();




export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="DestinationSearch" component={DestinationSearch} options={{ headerShown: false }} />
          <Stack.Screen name="RideSearch" component={RideSearch} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
