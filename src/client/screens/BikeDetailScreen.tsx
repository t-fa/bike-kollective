import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { BikeDetailScreenProps } from '../types/types';
import { getBikeImageUrl } from '../firebase/storage';
import styles from '../styles/StyleSheet';

const BikeDetailScreen: React.FC<BikeDetailScreenProps> = ({
  /*navigation,*/ route
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const bike = route.params;
  console.log(bike);

  useEffect(() => {
    const getUrl = async () => {
      setImageUrl(await getBikeImageUrl(bike.photo));
    };
    getUrl();
  }, []);

  // TODO: add back button, or some other way to leave

  return (
    <View style={styles.container}>
      <Text>Model: {bike.model}</Text>
      <Text>Current Location: {bike.currentLocation}</Text>
      <Text>Rating: {bike.rating} </Text>
      <Text>Comments: {bike.comments}</Text>
      <Text>Issues: {bike.issues}</Text>
      <Image
        style={{ width: 200, height: 200 }}
        source={{ uri: imageUrl }}
      ></Image>
      <Button
        title="Check out"
        /*onPress={() => checkoutBike(bikeId)}*/
      ></Button>
      <Text>Bike out of date? Update</Text>
    </View>
  );
};

export default BikeDetailScreen;
