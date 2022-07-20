import React from 'react';
import { Text, View, Button } from 'react-native';
import { HomeScreenProps } from '../types/types';

// can't have unused parameter
const HomeScreen: React.FC<HomeScreenProps> = (/*{ navigation }*/) => {
  return (
    <View>
      <Text>The home screen</Text>
      <Button
        title="Add a Bike"
        /*onPress={() => navigation.navigate('AddBikeScreen')}*/
      ></Button>
    </View>
  );
};

export default HomeScreen;
