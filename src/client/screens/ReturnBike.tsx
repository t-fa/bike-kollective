import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { ReturnBikeScreenProps, User } from '../types/types';
import { getUserFromFirestore, checkInBike } from '../firebase/firestore';
import { ourAuth } from '../../server';

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
  if (user?.checkedOutBikeId == '') {
    return (
      <View>
        <NoBikeCheckedOut></NoBikeCheckedOut>
      </View>
    );
  } else {
    return (
      <Button
        title="Return Bike"
        onPress={() => UpdateBikeAndUser(user)}
      ></Button>
    );
  }
};

/**
//  * Checks if user has had bike for longer than 24 hours
//  */
// function checkIfBanned(){
//   console.log(b)
// }

function NoBikeCheckedOut() {
  return <Text>No Bikes to Return</Text>;
}

async function UpdateBikeAndUser(user: User) {
  await checkInBike(user.checkedOutBikeId);
  alert('Bike Returned');
}
export default ReturnBikeScreen;
