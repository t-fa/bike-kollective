import React from 'react';
import { View, Text } from 'react-native';
import { BikeType, Coords } from './types';

type Props = Pick<BikeType, 'model'> & Pick<Coords, 'latitude' | 'longitude'>;

const BikeSummary: React.FC<Props> = ({ model, latitude, longitude }) => {
  return (
    <View>
      <Text>{model}</Text>
      <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text>
    </View>
  );
};

export default BikeSummary;
