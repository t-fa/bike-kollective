import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from './AuthContext';
import { Screens, Tabs } from '../types/types';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WaiverScreen from '../screens/WaiverScreen';
import AddBikeScreen from '../screens/addBike';
import ViewBikeScreen from '../screens/ViewBikeScreen';
import ReviewBikeScreen from '../screens/ReviewBike';
import BikeDetailScreen from '../screens/BikeDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CurrentLocation from './CurrentLocation';
import { View } from 'react-native';
import {
  addPushTokenToUser,
  getUserFromFirestore
} from '../firebase/firestore';
import { ourAuth } from '../../server';
import { registerForPushNotificationsAsync } from '../helpers/Notfications';
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

const ViewBikeStack = createNativeStackNavigator();
export const ViewBikeScreens = () => {
  return (
    <ViewBikeStack.Navigator>
      <ViewBikeStack.Screen
        name={Screens.ViewBikeScreen}
        component={ViewBikeScreen}
        options={{ headerShown: false }}
      />
      <ViewBikeStack.Screen
        name={Screens.BikeDetailScreen}
        component={BikeDetailScreen}
        options={{ headerShown: false }}
      />
    </ViewBikeStack.Navigator>
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
  useEffect(() => {
    // Get user
    const checkUser = async () => {
      return await getUserFromFirestore(ourAuth.auth.currentUser?.uid);
    };

    // If user does not have token, request permissionss
    checkUser().then((user) => {
      if (user.pushToken == undefined) {
        registerForPushNotificationsAsync()
          .then((token) =>
            addPushTokenToUser(ourAuth.auth.currentUser?.uid, token)
          )
          .catch((err) => console.error(err));
      } else {
        console.log('User has token');
      }
    });
  }, []);

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
        name={Tabs.ViewBikesTab}
        component={ViewBikeScreens}
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
      {/* <Tab.Screen
        name={Tabs.ReturnBikeTab}
        component={ReturnBikeScreenStack}
        options={{
          title: 'Return Bike',
          tabBarIcon: () => <Ionicons name={'remove-circle'} size={30} />
        }}
      /> */}
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
      {isSignedIn ? <TopTabs /> : <AuthScreens />}
      <View
        style={{ display: 'flex', alignItems: 'center', paddingBottom: '1%' }}
      >
        <CurrentLocation />
      </View>
    </NavigationContainer>
  );
};
