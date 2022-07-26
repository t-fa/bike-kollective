import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { Bike, HomeScreenProps, Screens } from '../types/types';
import styles from '../styles/StyleSheet';
import { getBikeFromFirestore } from '../firebase/firestore';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // TODO: attach this function to every bike in list?
  const goToBikeDetailScreen = (bike: Bike) => {
    navigation.navigate(Screens.BikeDetailScreen, bike);
  };

  const [testBike, setTestBike] = useState<Bike>({
    comments: '',
    currentLocation: undefined,
    photo: '',
    issues: '',
    lockCombination: 0,
    model: '',
    owner: undefined,
    currentlyCheckedOut: false,
    rating: 0,
    stolen: false
  });

  useEffect(() => {
    const getAndSetBike = async () => {
      setTestBike(await getBikeFromFirestore('4eXBUNqHKVUdSzFbziUW'));
    };
    getAndSetBike();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Remove later */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => goToBikeDetailScreen(testBike)}
        >
          <Text style={styles.buttonOutlineText}>
            Test: Go to details screen using a bike document
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
