import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from './AuthContext';
import { Screens, Tabs } from '../types/types';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WaiverScreen from '../screens/WaiverScreen';
import HomeScreen from '../screens/HomeScreen';
import AddBikeScreen from '../screens/addBike';
import ViewBikeScreen from '../screens/ViewBikeScreen';
import ReviewBikeScreen from '../screens/ReviewBike';
import BikeDetailScreen from '../screens/BikeDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CurrentLocation from './CurrentLocation';
import { View } from 'react-native';

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

// TODO: Figure out what exactly should go into each stack and tab here onward

const MainStack = createNativeStackNavigator();
export const MainScreens = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={Screens.HomeScreen}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/*<MainStack.Screen
        name={Screens.AddBikeScreen}
        component={AddBikeScreen}
        options={{ title: 'Add Bike To System' }}
      />*/}
      <MainStack.Screen
        name={Screens.ViewBikeScreen}
        component={ViewBikeScreen}
        options={{ headerShown: false }}
      />
      {/*<MainStack.Screen
        name={Screens.ReviewBikeScreen}
        component={ReviewBikeScreen}
        options={{ title: 'Review a bike' }}
      />*/}
      <MainStack.Screen
        name={Screens.BikeDetailScreen}
        component={BikeDetailScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

const AddBikeStack = createNativeStackNavigator();
export const AddBikeScreenStack = () => {
  return (
    <AddBikeStack.Navigator>
      <AddBikeStack.Screen
        name={Screens.AddBikeScreen}
        component={AddBikeScreen}
        options={{ headerShown: false }}
      />
    </AddBikeStack.Navigator>
  );
};

const ReviewBikeStack = createNativeStackNavigator();
export const ReviewBikeScreenStack = () => {
  return (
    <ReviewBikeStack.Navigator>
      <ReviewBikeStack.Screen
        name={Screens.ReviewBikeScreen}
        component={ReviewBikeScreen}
        options={{ headerShown: false }}
      />
    </ReviewBikeStack.Navigator>
  );
};

const Tab = createMaterialTopTabNavigator();
export const TopTabs = () => {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      screenOptions={() => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { paddingTop: 10 }
      })}
    >
      <Tab.Screen
        name={Tabs.HomeTab}
        component={ViewBikeScreen}
        options={{
          title: 'Bikes Near You',
          tabBarIcon: () => <Ionicons name={'bicycle'} size={30} />
        }}
      />
      <Tab.Screen
        name={Tabs.AddBikeTab}
        component={AddBikeScreenStack}
        options={{
          title: 'Add Bike To System',
          tabBarIcon: () => <Ionicons name={'add-circle'} size={30} />
        }}
      />
      <Tab.Screen
        name={Tabs.ReviewBikeTab}
        component={ReviewBikeScreenStack}
        options={{
          title: 'Review or Report an Issue with a Bike',
          tabBarIcon: () => <Ionicons name={'ios-star-half-sharp'} size={30} />
        }}
      />
      <Tab.Screen
        name={Tabs.ProfileTab}
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: () => <Ionicons name={'md-person-circle'} size={30} />
        }}
      />
    </Tab.Navigator>
  );
};

export const Router = () => {
  const { isSignedIn } = useAuth();

  return (
    <NavigationContainer>
      {/* Once user signs in (or is already signed in),
          then navigate to Main part of app */}
      {/*{isSignedIn ? <MainScreens /> : <AuthScreens />}*/}
      {isSignedIn ? <TopTabs /> : <AuthScreens />}
      <View
        style={{ display: 'flex', alignItems: 'center', paddingBottom: '50px' }}
      >
        <CurrentLocation />
      </View>
    </NavigationContainer>
  );
};
