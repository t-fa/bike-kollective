import React from 'react';
import { View, Text } from 'react-native';
import { BikeType, Coords } from './types';
import { haversineDistance } from '../helpers/haversine';

type CurrentLoc = {
  currentLat: number | undefined;
  currentLon: number | undefined;
};

type Props = Pick<BikeType, 'model'> &
  Pick<Coords, 'latitude' | 'longitude'> &
  CurrentLoc;

const BikeSummary: React.FC<Props> = ({
  model,
  currentLat,
  currentLon,
  latitude,
  longitude
}) => {
  const distance = haversineDistance(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [currentLat, currentLon],
    [latitude, longitude],
    true
  );

  return distance ? (
    <View>
      <Text>{model}</Text>
      <Text>Distance: {parseInt(distance)} miles away</Text>
      <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text>
    </View>
  ) : (
    <View>
      <Text>An error with your current location has occurred :(</Text>
    </View>
  );
};

export default BikeSummary;
