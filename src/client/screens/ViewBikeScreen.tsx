import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import BikeSummary from '../components/BikeSummary';
import styles from '../styles/StyleSheet';
import { ourFirestore } from '../../server';
import { BikeType } from '../components/types';
import { LocationContext } from '../context/Location';
import { haversineDistance } from '../helpers/haversine';
import { ViewBikeScreenProps } from '../types/types';
import { Card } from 'react-native-paper';

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

const ViewBikeScreen: React.FC<ViewBikeScreenProps> = ({ navigation }) => {
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
        bike.distance = haversineDistance(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [location?.coords.latitude, location?.coords.longitude],
          [bike.location.coords.latitude, bike.location.coords.longitude],
          true
        );
        bikesArr.push(bike as BikeType);
      });

      bikesArr.sort(compare);

      setBikes(bikesArr);
    };

    getBikes();
  }, []);

  return loading ? (
    <View style={styles.container}>
      <Text>Bike data loading...</Text>
      <ActivityIndicator />
    </View>
  ) : (
    <View style={styles.bikeListContainer}>
      <FlatList
        data={bikes}
        renderItem={({ item }) => (
          <Card key={item.id}>
            <Card.Content>
              <BikeSummary
                distance={item.distance}
                loading={loading}
                bike={item}
                navigation={navigation}
              />
            </Card.Content>
          </Card>
        )}
      ></FlatList>
    </View>
  );
};

export default ViewBikeScreen;
