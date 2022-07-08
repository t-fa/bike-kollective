import React from 'react';
import { Text, View, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

// can't have unused parameter. Add "props" later
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>The home screen</Text>
      <Button
        title="Added Bike"
        onPress={() => navigation.navigate('AddBikeScreen')}
      ></Button>
    </View>
  );
};

export default HomeScreen;
