import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WaiverScreen from '../screens/WaiverScreen';
import HomeScreen from '../screens/HomeScreen';
import AddBikeScreen from '../screens/addBike';
import ViewBikeScreen from '../screens/ViewBikeScreen';
import ReviewBikeScreen from '../screens/ReviewBike';
import BikeDetailScreen from '../screens/BikeDetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from './AuthContext';
import { Screens } from '../types/types';

const AuthStack = createNativeStackNavigator();

export const AuthScreens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={Screens.LoginScreen}
        component={LoginScreen}
        options={{ title: 'The Bike Kollective' }}
      />
      <AuthStack.Screen
        name={Screens.RegisterScreen}
        component={RegisterScreen}
        options={{ title: 'Register' }}
      />
      <AuthStack.Screen
        name={Screens.WaiverScreen}
        component={WaiverScreen}
        options={{ title: 'Sign Accident Waiver' }}
      />
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();

export const MainScreens = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={Screens.HomeScreen}
        component={HomeScreen}
        options={{ title: 'The Bike Kollective' }}
      />
      <MainStack.Screen
        name={Screens.AddBikeScreen}
        component={AddBikeScreen}
        options={{ title: 'Add Bike To System' }}
      />
      <MainStack.Screen
        name={Screens.ViewBikeScreen}
        component={ViewBikeScreen}
        options={{ title: 'View Nearby Bikes' }}
      />
      <MainStack.Screen
        name={Screens.ReviewBikeScreen}
        component={ReviewBikeScreen}
        options={{ title: 'Review a bike' }}
      />

      <MainStack.Screen
        name={Screens.BikeDetailScreen}
        component={BikeDetailScreen}
        options={{ title: 'Bike Details' }}
      />
    </MainStack.Navigator>
  );
};

export const Router = () => {
  const { isSignedIn } = useAuth();

  return (
    <NavigationContainer>
      {/* Once user signs in (or is already signed in),
          then navigate to Main part of app */}
      {isSignedIn ? <MainScreens /> : <AuthScreens />}
    </NavigationContainer>
  );
};
