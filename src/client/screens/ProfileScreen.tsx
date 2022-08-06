import React, { useEffect, useState } from 'react';
import { ProfileScreenProps, User } from '../types/types';
import styles from '../styles/StyleSheet';
import { Text, TouchableOpacity, View } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { useAuth } from '../components/AuthContext';
import { BikeType } from '../components/types';
import OutlineButton from '../components/OutlineButton';
import { userSignOut } from '../firebase/authentication';
import {
  parkBikeProcess,
  observeUserCheckOutBike
} from '../firebase/firestore';

const ProfileScreen: React.FC<ProfileScreenProps> = (/*{ navigation }*/) => {
  const { setIsSignedIn } = useAuth();
  const [user, setUser] = useState<User>({} as User);
  const [userHasCheckedOutBike, setUserHasCheckedOutBike] =
    useState<boolean>(false);
  const [checkedOutBike, setCheckedOutBike] = useState<BikeType>(
    {} as BikeType
  );
  const [bikeUri, setBikeUri] = useState<string>('');

  // update the UI if the user checks out a bike
  useEffect(() => {
    const getUser = async () => {
      await observeUserCheckOutBike(
        setUser,
        setUserHasCheckedOutBike,
        setCheckedOutBike,
        setBikeUri
      );
    };
    getUser();
  }, []);

  const parkBike = async (user: User) => {
    await parkBikeProcess(user);
    alert('Bike returned! Thank you');
  };

  // if signed in, show profile. User should not be able to be here without being signed in
  return Object.keys(user).length !== 0 ? (
    <Card style={styles.container}>
      <Card.Title title={user.name} />
      <Card.Content>
        <Text>{user.email}</Text>
      </Card.Content>
      <Divider style={{ paddingBottom: 10, backgroundColor: '#fff' }} />

      {/* Display bike here, if it's been checked out */}
      {userHasCheckedOutBike ? (
        <Card>
          <Card.Cover source={{ uri: bikeUri }} />
          <Card.Title
            title={`Currently Checked-out Bike: ${checkedOutBike.model}`}
          />
          <Card.Content>
            <Text>Lock Combination: {checkedOutBike.lockCombination}</Text>
            <Divider style={{ paddingBottom: 10, backgroundColor: '#fff' }} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => parkBike(user)}
            >
              <Text style={styles.buttonText}>Park Bike</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      ) : (
        <View></View>
      )}

      <OutlineButton
        onPressFunction={() => userSignOut(setIsSignedIn)}
        buttonText={'Sign out'}
      />
    </Card>
  ) : (
    <View>
      <Text>No Profile...</Text>
    </View>
  );
};

export default ProfileScreen;
