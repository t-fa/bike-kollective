import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ReturnBikeScreenProps } from '../types/types';
import { getUserFromFirestore } from '../firebase/firestore';

// Things do
const ReturnBikeScreen: React.FC<ReturnBikeScreenProps> = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    // Get user
    const checkUser = async () => {
      setUser(await getUserFromFirestore(ourAuth.auth.currentUser?.uid));
      console.log(user);
    };

    checkUser();
  }, []);

  return (
    <View>
      <Text> Hello </Text>
    </View>
  );
};

export default ReturnBikeScreen;
