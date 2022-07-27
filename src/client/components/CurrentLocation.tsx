import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const CurrentLocation: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied :(');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      setLoading(false);
    })();
  }, []);

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
