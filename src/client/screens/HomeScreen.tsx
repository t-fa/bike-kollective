import React from 'react';
import { Text, View, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

// can't have unused parameter. Add "props" later
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <>
      <View style={{ padding: '10px' }}>
        <Text>The home screen</Text>
        <Button
          title="Add a Bike"
          onPress={() => navigation.navigate('AddBikeScreen')}
        />
      </View>

      <View style={{ padding: '10px' }}>
        <Button
          title="View Bikes"
          onPress={() => navigation.navigate('ViewBikeScreen')}
        />
      </View>
    </>
  );
};

export default HomeScreen;
