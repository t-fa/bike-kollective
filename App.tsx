import * as React from 'react';
import { AuthProvider } from './src/client/components/AuthContext';
import { Router } from './src/client/components/Navigation';
import { ourFirestore } from './src/server';
import { useEffect } from 'react';

// Want to add a screen? Go to Navigation.tsx and add the Stack.Screen there

export default function App() {
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
      <Router />
    </AuthProvider>
  );
}
