export type BikeType = {
  comments: string;
  issues: string;
  location: Location;
  lockCombination: string;
  model: string;
  photo: string;
  user: string;
};

export type Location = {
  latitude: number;
  longitude: number;
};
