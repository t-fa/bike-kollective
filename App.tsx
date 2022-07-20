import * as React from 'react';
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from "./src/client/screens/LoginScreen";
import RegisterScreen from "./src/client/screens/RegisterScreen";
import WaiverScreen from "./src/client/screens/WaiverScreen";
import HomeScreen from "./src/client/screens/HomeScreen";
import BikeDetailScreen from "./src/client/screens/BikeDetailScreen";
// import AddBikeScreen from './src/client/screens/addBike';
import {Screens} from "./src/client/types/types";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Screens.LoginScreen} component={LoginScreen} options={{ title: 'The Bike Kollective' }} />
        <Stack.Screen name={Screens.RegisterScreen} component={RegisterScreen} options={{ title: 'Register' }}  />
        <Stack.Screen name={Screens.WaiverScreen} component={WaiverScreen} options={{ title: 'Sign Accident Waiver' }} />
        <Stack.Screen name={Screens.HomeScreen} component={HomeScreen} options={{ title: 'The Bike Kollective' }} />
        {/*<Stack.Screen name="{Screens.AddBikeScreen}" component={AddBikeScreen} options={{ title: 'Add Bike To System' }} />*/}
        <Stack.Screen name={Screens.BikeDetailScreen} component={BikeDetailScreen} options={{ title: 'The Bike Kollective' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

