import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  WaiverScreen: undefined;
  HomeScreen: undefined;
  AddBikeScreen: undefined;
  BikeDetailScreen: Bike;
  ViewBikeScreen: undefined;
  ReviewBikeScreen: undefined;
};

export enum Screens {
  HomeScreen = 'HomeScreen',
  LoginScreen = 'LoginScreen',
  RegisterScreen = 'RegisterScreen',
  WaiverScreen = 'WaiverScreen',
  AddBikeScreen = 'AddBikeScreen',
  BikeDetailScreen = 'BikeDetailScreen',
  ViewBikeScreen = 'ViewBikeScreen',
  ReviewBikeScreen = 'ReviewBikeScreen'
}

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.HomeScreen
>;

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.LoginScreen
>;

export type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.RegisterScreen
>;

export type WaiverScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.WaiverScreen
>;

export type AddBikeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.AddBikeScreen
>;

export type BikeDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.BikeDetailScreen
>;

export type ViewBikeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.ViewBikeScreen
>;

export type ReviewBikeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.ReviewBikeScreen
>;

export type Navigation = {
  navigate: (screen: string) => void;
};

export type User = {
  name: string;
  email: string;
  id: string;
  bikesOwned: Bike[];
  bikeCurrentlyCheckedOut: Bike;
  banned: boolean;
};

export type Bike = {
  owner: User | undefined;
  model: string;
  rating: number;
  comments: string;
  issues: string;
  photo: string;
  currentLocation: undefined;
  lockCombination: number;
  stolen: boolean;
};
