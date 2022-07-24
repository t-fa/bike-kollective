import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { Bike, HomeScreenProps, Screens } from '../types/types';
import styles from '../styles/StyleSheet';
import NavigateButton from '../components/NavigateButton';
import { getBikeFromFirestore } from '../firebase/firestore';
import { userSignOut } from '../firebase/authentication';
import { useAuth } from '../components/AuthContext';

// TODO: add a profile button/area where user can:
//          log out | view their bikes | (and whatever else)
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const goToBikeDetailScreen = (bike: Bike) => {
    navigation.navigate(Screens.BikeDetailScreen, bike);
  };

  const { setIsSignedIn } = useAuth();
  const onSignOut = async () => {
    setIsSignedIn(false);
    await userSignOut();
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
      <NavigateButton
        navigation={navigation}
        screenName={Screens.AddBikeScreen}
        buttonText={'Add a Bike'}
      />

      <NavigateButton
        navigation={navigation}
        screenName={Screens.ReviewBikeScreen}
        buttonText={'Review a Bike'}
      />

      <NavigateButton
        navigation={navigation}
        screenName={Screens.ViewBikeScreen}
        buttonText={'View Nearby Bikes'}
      />

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

      {/* Remove later */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonOutline}
          /* onPress={() => userSignOut()}*/
          onPress={() => onSignOut()}
        >
          <Text style={styles.buttonOutlineText}>
            Sign out & go to LoginScreen
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
