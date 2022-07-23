import React from 'react';
import { View, Text, Image } from 'react-native';
import { BikeType } from './types';

type Props = Pick<BikeType, 'location' | 'model' | 'photo'>;

const BikeSummary: React.FC<Props> = ({ location, model, photo }) => {
  return (
    <View>
      <Text>{model}</Text>
      <Image source={{ uri: photo }} />
      <Text>Latitude: {location.latitude}</Text>
      <Text>Longitude: {location.longitude}</Text>
    </View>
  );
};

export default BikeSummary;
