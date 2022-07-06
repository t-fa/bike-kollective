import * as React from 'react';
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from "./src/client/screens/LoginScreen";
import RegisterScreen from "./src/client/screens/RegisterScreen";
import WaiverScreen from "./src/client/screens/WaiverScreen";
import HomeScreen from "./src/client/screens/HomeScreen";

export type RootStackParamList = {
    LoginScreen: undefined;
    RegisterScreen: undefined;
    WaiverScreen: undefined;
    HomeScreen: undefined;
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'The Bike Kollective' }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Register' }}  />
        <Stack.Screen name="WaiverScreen" component={WaiverScreen} options={{ title: 'Sign Accident Waiver' }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'The Bike Kollective' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

