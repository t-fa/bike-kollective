import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import BikeSummary from '../components/BikeSummary';
import styles from '../styles/StyleSheet';
import { ourFirestore } from '../../server';
import { BikeType } from '../components/types';
import * as Location from 'expo-location';

// https://firebase.google.com/docs/database/web/read-and-write#read_data_once

const ViewBikeScreen: React.FC = () => {
  const [bikes, setBikes] = useState<BikeType[]>([]);
  const [location, setLocation] = useState<Location.LocationObject>();
  const [loading, setLoading] = useState<boolean>(true);

  // get current location
  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      setLoading(false);
    })();
  }, []);

  // get bikes data from google
  useEffect(() => {
    const bikesArr: BikeType[] = [];
    const getBikes = async () => {
      const querySnapshot = await ourFirestore.getDocs(
        ourFirestore.collection(ourFirestore.db, 'bikes')
      );
      querySnapshot.forEach((doc) => {
        const bike = { ...doc.data() };
        bike.id = doc.id;
        bikesArr.push(bike as BikeType);
      });

      setBikes(bikesArr);
    };

    getBikes();
  }, []);

  const bikeList = bikes.map((bike) => {
    return (
      <View key={bike.id} style={styles.emptySpace}>
        <BikeSummary
          currentLat={location?.coords.latitude}
          currentLon={location?.coords.longitude}
          latitude={bike.location.coords.latitude}
          longitude={bike.location.coords.longitude}
          model={bike.model}
        />
      </View>
    );
  });

  return loading ? (
    <View style={styles.container}>
      <Text>Bike data loading...</Text>
      <ActivityIndicator />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={{ display: 'flex' }}>
        <Text style={styles.title}>Nearby Bikes:</Text>
      </View>
      {bikeList}
    </View>
  );
};

export default ViewBikeScreen;
