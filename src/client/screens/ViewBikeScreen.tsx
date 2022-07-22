import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import BikeSummary from '../components/BikeSummary';
import styles from '../styles/StyleSheet';
import CurrentLocation from '../components/CurrentLocation';
import { getAllBikes } from '../../../firebase/bikes';

import { getDatabase, ref, child, get } from 'firebase/database';

// https://firebase.google.com/docs/database/web/read-and-write#read_data_once

const ViewBikeScreen: React.FC = () => {
  const [bikes, setBikes] = useState([{}]);

  useEffect(() => {
    // call api when firebase is working again :(
    setBikes('');
    getAllBikes();
  }, []);

  return (
    <View style={styles.buttonContainer}>
      <CurrentLocation />
      <Text
        style={{
          fontSize: 20
        }}
      >
        Nearby Bikes:
        {/* {bikes.map(() => {
          <BikeSummary name="TODO" />;
        })} */}
      </Text>
    </View>
  );
};

export default ViewBikeScreen;
