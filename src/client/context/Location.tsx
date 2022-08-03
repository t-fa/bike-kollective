import * as React from 'react';
import * as Location from 'expo-location';

export const LocationContext =
  React.createContext<Location.LocationObject | null>(null);
export const LocationErrorContext = React.createContext<string | null>(null);
export const LocationLoadingContext = React.createContext<boolean | null>(null);
