import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import BikeSummary from '../components/BikeSummary';
import styles from '../styles/StyleSheet';
import CurrentLocation from '../components/CurrentLocation';

const ViewBikeScreen: React.FC = () => {
  const [bikes, setBikes] = useState([{}]);

  useEffect(() => {
    // call api when firebase is working again :(
    setBikes('');
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
        {bikes.map(() => {
          <BikeSummary name="TODO" />;
        })}
      </Text>
    </View>
  );
};

export default ViewBikeScreen;
