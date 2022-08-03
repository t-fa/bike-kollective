import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BikeType, Location } from '../components/types';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  WaiverScreen: undefined;
  HomeScreen: undefined;
  AddBikeScreen: undefined;
  BikeDetailScreen: {
    model: string;
    photo: string;
    comments: string;
    issues: string;
    location: Location;
    id: string;
    bike: BikeType;
  };
  ViewBikeScreen: undefined;
  ReviewBikeScreen: Review;
};

export enum Screens {
  LoginScreen = 'LoginScreen',
  RegisterScreen = 'RegisterScreen',
  WaiverScreen = 'WaiverScreen',
  ViewBikeScreen = 'ViewBikeScreen',
  BikeDetailScreen = 'BikeDetailScreen',
  AddBikeScreen = 'AddBikeScreen',
  ReviewBikeScreen = 'ReviewBikeScreen',
  ProfileScreen = 'ProfileScreen'
}

export enum Tabs {
  HomeTab = 'ViewBikesTab',
  AddBikeTab = 'AddBikeTab',
  ReviewBikeTab = 'ReviewBikeTab',
  ProfileTab = 'ProfileTab'
}

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

export type DetailNavigation = {
  navigate: (screen: string, bike: BikeType) => void;
};

export type User = {
  name: string;
  email: string;
  id: string;
  signedWaiver: boolean;
  bikesOwned: Bike[];
  checkedOutBikeId: string;
  banned: boolean;
};

export type Bike = {
  id: string;
  owner: User | undefined;
  model: string;
  rating: number;
  comments: string;
  issues: string;
  photo: string;
  currentLocation: undefined;
  currentlyCheckedOut: boolean;
  lockCombination: number;
  stolen: boolean;
};

export type Review = {
  comments: string;
  rating: string;
  reviewer: string;
  id: string;
  reviewId: string;
};

export type Issue = {
  user: string;
  comments: string;
  bikeId: string;
  issueId: string;
};
