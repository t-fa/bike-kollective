import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

// can't have unused parameter. Add "props" later
const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <View>
      <Text>The home screen</Text>
    </View>
  );
};

export default HomeScreen;
