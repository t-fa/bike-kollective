import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  WaiverScreen: undefined;
  HomeScreen: undefined;
  AddBikeScreen: undefined;
  BikeDetailScreen: { bike: Bike; review: Review[] };
  ViewBikeScreen: undefined;
  ReviewBikeScreen: Review;
  ReturnBikeScreen: { user: User; bike: Bike };
};

export enum Screens {
  HomeScreen = 'HomeScreen',
  LoginScreen = 'LoginScreen',
  RegisterScreen = 'RegisterScreen',
  WaiverScreen = 'WaiverScreen',
  AddBikeScreen = 'AddBikeScreen',
  BikeDetailScreen = 'BikeDetailScreen',
  ViewBikeScreen = 'ViewBikeScreen',
  ReviewBikeScreen = 'ReviewBikeScreen',
  ReturnBikeScreen = 'ReturnBikeScreen'
}

export enum Tabs {
  HomeTab = 'HomeTab',
  AddBikeTab = 'AddBikeTab',
  ReviewBikeTab = 'ReviewBikeTab',
  ReturnBikeTab = 'ReturnBikeTab',
  ProfileTab = 'ProfileTab'
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

export type ReturnBikeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.ReturnBikeScreen
>;

export type Subscription = {
  remove: () => void;
};

export type Navigation = {
  navigate: (screen: string) => void;
};

export type User = {
  name: string;
  email: string;
  id: string;
  pushToken: string;
  signedWaiver: boolean;
  bikesOwned: Bike[];
  bikeCurrentlyCheckedOut: Bike;
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
