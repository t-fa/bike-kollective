import * as React from 'react';
import {AuthProvider} from "./src/client/components/AuthContext";
import {Router} from "./src/client/components/Navigation";


// Want to add a screen? Go to Navigation.tsx and add the Stack.Screen there

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
