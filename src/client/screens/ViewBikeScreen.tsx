import React, { useEffect, useState, useContext } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import BikeSummary from '../components/BikeSummary';
import styles from '../styles/StyleSheet';
import { ourFirestore } from '../../server';
import { BikeType } from '../components/types';
import { LocationContext } from '../context/Location';
import { haversineDistance } from '../helpers/haversine';

const compare = (a: BikeType, b: BikeType) => {
  const bikeA = a.distance;
  const bikeB = b.distance;

  let comparison = 0;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (bikeA > bikeB) {
    comparison = 1;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  } else if (bikeA < bikeB) {
    comparison = -1;
  }
  return comparison;
};

const ViewBikeScreen: React.FC = () => {
  const [bikes, setBikes] = useState<BikeType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const location = useContext(LocationContext);

  useEffect(() => {
    if (location) {
      setLoading(false);
    }
  }, [location]);

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
        const distance = haversineDistance(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [location?.coords.latitude, location?.coords.longitude],
          [bike.location.coords.latitude, bike.location.coords.longitude],
          true
        );
        bike.distance = distance;
        bikesArr.push(bike as BikeType);
      });

      bikesArr.sort(compare);

      setBikes(bikesArr);
    };

    getBikes();
  }, []);

  const bikeList = bikes.map((bike) => {
    const distance = haversineDistance(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      [location?.coords.latitude, location?.coords.longitude],
      [bike.location.coords.latitude, bike.location.coords.longitude],
      true
    );
    bike.distance = distance;
    return (
      <View key={bike.id} style={styles.emptySpace}>
        <BikeSummary
          distance={distance}
          latitude={bike.location.coords.latitude}
          longitude={bike.location.coords.longitude}
          model={bike.model}
          photo={bike.photo}
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
