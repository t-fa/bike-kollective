import React from 'react';
import { Text, View, Button } from 'react-native';
import { BikeDetailScreenProps } from '../types/types';

const BikeDetailScreen: React.FC<
  BikeDetailScreenProps
> = (/*{ navigation }*/) => {
  return (
    <View>
      <Text>Model</Text>
      <Text>Address</Text>
      <Text>Rating</Text>
      <Text>Comments</Text>
      <Text>Issues</Text>
      <Text>--Picture of Bike--</Text>
      <Button
        title="Check out"
        /*onPress={() => checkoutBike(bikeId)}*/
      ></Button>
      <Text>Bike out of date? Update</Text>
    </View>
  );
};

export default BikeDetailScreen;
