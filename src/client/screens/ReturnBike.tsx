import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { ReturnBikeScreenProps, User } from '../types/types';
import { getUserFromFirestore } from '../firebase/firestore';
import { ourAuth } from '../../server';

function NoBikeCheckedOut() {
  return <Text>No Bikes to Return</Text>;
}

// Things do
const ReturnBikeScreen: React.FC<ReturnBikeScreenProps> = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    // Get user
    const currentUser = async () => {
      setUser(await getUserFromFirestore(ourAuth.auth.currentUser?.uid));
    };

    currentUser();
  }, []);

  console.log(user);
  if (user?.currentBike == '') {
    return (
      <View>
        <NoBikeCheckedOut></NoBikeCheckedOut>
      </View>
    );
  } else {
    return (
      <Button
        title="Return Bike"
        onPress={() => console.log(user?.currentBike)}
      ></Button>
    );
  }
};

export default ReturnBikeScreen;
