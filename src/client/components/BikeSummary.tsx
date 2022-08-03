import React, { useEffect, useState } from 'react';
import { BikeType, Coords } from './types';
import { Card, Text, Divider } from 'react-native-paper';
import { getBikeImageUrl } from '../firebase/storage';

type Props = Pick<BikeType, 'model'> &
  Pick<Coords, 'latitude' | 'longitude'> & {
    photo: string;
    distance: number;
    loading: boolean;
  };

const BikeSummary: React.FC<Props> = ({
  model,
  distance,
  latitude,
  longitude,
  loading,
  photo
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const getUrl = async () => {
      setImageUrl(await getBikeImageUrl(photo));
    };

    getUrl();
  }, [loading]);

  return distance ? (
    <Card>
      <Card.Cover source={{ uri: imageUrl }} />
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
