import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import BikeSummary from '../components/BikeSummary';
import styles from '../styles/StyleSheet';
import { ourFirestore } from '../../server';
import { BikeType } from '../components/types';

// https://firebase.google.com/docs/database/web/read-and-write#read_data_once

const ViewBikeScreen: React.FC = () => {
  const [bikes, setBikes] = useState<BikeType[]>([]);

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
        <BikeSummary location={bike.location} model={bike.model} />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={{ display: 'flex' }}>
        <Text style={styles.title}>Nearby Bikes:</Text>
      </View>
      {bikeList}
    </View>
  );
};

export default ViewBikeScreen;
