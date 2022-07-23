import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { HomeScreenProps } from '../types/types';
import styles from '../styles/StyleSheet';

// TODO: remove back button from this screen and
//       add a profile button/area where user can:
//          log out and view their bikes (and whatever else)
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddBikeScreen')}
          >
            <Text style={styles.buttonText}>Add A Bike</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ReviewBikeScreen')}
          >
            <Text style={styles.buttonText}>Review A Bike</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ViewBikeScreen')}
          >
            <Text style={styles.buttonText}>View Nearby Bikes</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default HomeScreen;
