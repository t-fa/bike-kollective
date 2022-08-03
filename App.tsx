import * as React from 'react';
import { AuthProvider } from './src/client/components/AuthContext';
import { Router } from './src/client/components/Navigation';
import { ourFirestore } from './src/server';
import { useEffect } from 'react';
import * as Location from 'expo-location';
import {
  LocationContext,
  LocationErrorContext,
  LocationLoadingContext
} from './src/client/context/Location';

// Want to add a screen? Go to Navigation.tsx and add the Stack.Screen there

export default function App() {
  const [location, setLocation] = React.useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);

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

  // Firebase SDK caches documents locally, which can give false positives
  // when checking for the existence of documents.
  // Might be useful to clear the cache when testing:
  useEffect(() => {
    const clearLocalCache = async () => {
      await ourFirestore.clearIndexedDbPersistence(ourFirestore.db);
    };
    clearLocalCache();
  }, []);

  return (
    <AuthProvider>
      <LocationContext.Provider value={location}>
        <LocationErrorContext.Provider value={errorMsg}>
          <LocationLoadingContext.Provider value={loading}>
            <Router />
          </LocationLoadingContext.Provider>
        </LocationErrorContext.Provider>
      </LocationContext.Provider>
    </AuthProvider>
  );
}
