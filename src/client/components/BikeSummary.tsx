import React, { useEffect, useState } from 'react';
import { BikeType } from './types';
import { Card, Text, Divider } from 'react-native-paper';
import { getBikeImageUrl } from '../firebase/storage';
import { DetailNavigation, Screens } from '../types/types';
import { TouchableOpacity } from 'react-native';
import styles from '../styles/StyleSheet';

type Props = {
  bike: BikeType;
  navigation: DetailNavigation;
  distance: number | undefined;
  loading: boolean;
};

const BikeSummary: React.FC<Props> = ({
  distance,
  loading,
  bike,
  navigation
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  const goToBikeDetailScreen = (bike: BikeType) => {
    navigation.navigate(Screens.BikeDetailScreen, bike);
  };

  useEffect(() => {
    const getUrl = async () => {
      setImageUrl(await getBikeImageUrl(bike.photo));
    };

    getUrl();
  }, [loading]);

  return distance ? (
    <Card style={styles.viewBikesCard}>
      <Card.Cover source={{ uri: imageUrl }} />
      <Card.Title title={bike.model} />
      <Card.Content>
        <Text>Latitude: {bike.location.coords.latitude}</Text>
        <Text>Longitude: {bike.location.coords.longitude}</Text>
        <Divider />
        <Text>{distance} miles away</Text>
        <Text style={styles.smallEmptySpace} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            goToBikeDetailScreen(bike);
          }}
        >
          <Text style={styles.buttonText}>Take a closer look</Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  ) : (
    <Card>
      <Text>An error with your current location has occurred :(</Text>
    </Card>
  );
};

export default BikeSummary;
