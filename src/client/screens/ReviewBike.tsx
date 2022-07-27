import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import ReviewBikeForm from '../components/ReviewBikeForm';
import { Platform } from 'expo-modules-core';

const ReviewBikeScreen: React.FC = () => {
  const [selectedBikeId, setSelectedBikeId] = React.useState('');

  // Sets selected Bike Id
  const updateSelectedBike = (selectedBike) => {
    setSelectedBikeId(selectedBike);
    console.log(selectedBikeId);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (Platform.OS != 'web') {
          Keyboard.dismiss();
        }
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Submit a Review or Issue</Text>
        <ReviewBikeForm selectedBike={updateSelectedBike}></ReviewBikeForm>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: 1,
    // marginBottom: 20,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    color: '#065C00'
  }
});
export default ReviewBikeScreen;
