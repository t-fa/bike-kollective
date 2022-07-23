import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import BikeSummary from '../components/BikeSummary';
import styles from '../styles/StyleSheet';
import CurrentLocation from '../components/CurrentLocation';
import { ourFirestore } from '../../../server';
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
        bikesArr.push(doc.data() as BikeType);
      });

      setBikes(bikesArr);
    };

    getBikes();
  }, []);

  const bikeList = bikes.map((bike) => {
    return (
      <BikeSummary
        // TODO: need to access unique ID from firestore
        key={bike.lockCombination}
        location={bike.location}
        model={bike.model}
        photo={bike.photo}
      />
    );
  });

  return (
    <View style={styles.buttonContainer}>
      <CurrentLocation />
      <Text
        style={{
          fontSize: 20
        }}
      >
        Nearby Bikes:
        {bikeList}
      </Text>
    </View>
  );
};

export default ViewBikeScreen;
