import React from 'react';
import { BikeType, Coords } from './types';
import { Card, Text, Divider } from 'react-native-paper';

type Props = Pick<BikeType, 'model'> &
  Pick<Coords, 'latitude' | 'longitude'> & { photo: string; distance: number };

const BikeSummary: React.FC<Props> = ({
  model,
  distance,
  latitude,
  longitude,
  photo
}) => {
  return distance ? (
    <Card>
      <Card.Cover source={{ uri: photo }} />
      <Card.Title title={model} />
      <Card.Content>
        <Text>Latitude: {latitude}</Text>
        <Text>Longitude: {longitude}</Text>
        <Divider />
        <Text>{parseInt(distance)} miles away</Text>
      </Card.Content>
    </Card>
  ) : (
    <Card>
      <Text>An error with your current location has occurred :(</Text>
    </Card>
  );
};

export default BikeSummary;
