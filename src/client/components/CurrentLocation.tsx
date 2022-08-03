import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {
  LocationErrorContext,
  LocationLoadingContext,
  LocationContext
} from '../context/Location';

const CurrentLocation: React.FC = () => {
  const loading = React.useContext(LocationLoadingContext);
  const errorMsg = React.useContext(LocationErrorContext);
  const location = React.useContext(LocationContext);

  return loading ? (
    <>
      <Text>Current location loading...</Text>
      <ActivityIndicator />
    </>
  ) : (
    <View>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        <>
          <Text>Current location: </Text>
          <Text>Latitude: {location?.coords.latitude}</Text>
          <Text>Longitude: {location?.coords.longitude}</Text>
        </>
      )}
    </View>
  );
};

export default CurrentLocation;
