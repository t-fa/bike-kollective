import React from 'react';
import { View, Text } from 'react-native';
import { BikeType } from './types';

type Props = Pick<BikeType, 'location' | 'model'>;

const BikeSummary: React.FC<Props> = ({ location, model }) => {
  return (
    <View>
      <Text>{model}</Text>
      <Text>Latitude: {location.latitude}</Text>
      <Text>Longitude: {location.longitude}</Text>
    </View>
  );
};

export default BikeSummary;
