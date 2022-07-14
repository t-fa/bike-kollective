import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

// can't have unused parameter. Add "props" later
const HomeScreen: React.FC<HomeScreenProps> = () => {
  return <View></View>;
};

export default HomeScreen;
