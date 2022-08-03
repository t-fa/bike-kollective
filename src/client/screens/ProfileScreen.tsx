import React from 'react';
import { ProfileScreenProps } from '../types/types';
import styles from '../styles/StyleSheet';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { useAuth } from '../components/AuthContext';
import { userSignOut } from '../firebase/authentication';

const ProfileScreen: React.FC<ProfileScreenProps> = (/*{ navigation }*/) => {
  const { setIsSignedIn } = useAuth();

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image style={{}} source={{}}></Image>

      <View>
        <Text>Name</Text>
        <Text>Email</Text>
        <Text>Bikes owned: bikeArray | null</Text>
        <Text>Current location: lat & long</Text>
        <Text>Bike checked out: someBike | null</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => userSignOut(setIsSignedIn)}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;
