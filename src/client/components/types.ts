export type BikeType = {
  distance?: number;
  id?: string;
  comments: string;
  issues: string;
  location: Location;
  lockCombination: string;
  model: string;
  photo: string;
  user: string;
  checkedOut: boolean;
  stolen: boolean;
};

export type Location = {
  coords: Coords;
  timestamp: number;
};

export type Coords = {
  accuracy: number;
  altitude: null;
  altitudeAccuracy: null;
  heading: null;
  latitude: number;
  longitude: number;
  speed: null;
};
