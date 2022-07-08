import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddBikeForm from '../components/addBikeForm';
import { StatusBar } from 'expo-status-bar';

const AddBikeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.tile}>Add a bike to Bike Kollective</Text>
      <AddBikeForm></AddBikeForm>
      <StatusBar style="auto"></StatusBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute'
  },

  tile: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 20,
    color: '#065C00'
  }
});

export default AddBikeScreen;
