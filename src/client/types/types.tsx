import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  WaiverScreen: undefined;
  HomeScreen: undefined;
  //AddBikeScreen: undefined;
  BikeDetailScreen: undefined;
};

export enum Screens {
  HomeScreen = 'HomeScreen',
  LoginScreen = 'LoginScreen',
  RegisterScreen = 'RegisterScreen',
  WaiverScreen = 'WaiverScreen',
  AddBikeScreen = 'AddBikeScreen',
  BikeDetailScreen = 'BikeDetailScreen'
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

export type BikeDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.BikeDetailScreen
>;

export type Navigation = {
  navigate: (screen: string) => void;
};
