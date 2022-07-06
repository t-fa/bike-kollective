import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import styles from '../styles/StyleSheet';

type WaiverScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WaiverScreen'
>;

const WaiverScreen: React.FC<WaiverScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>First, please sign a waiver</Text>

      <Text> --- --- --- --- --- --- - - - --- -- --</Text>
      <Text> --- --- --- --- --- --- - - - --- -- --</Text>
      <Text> This is a waiver, or a link to a waiver</Text>
      <Text> --- --- --- --- --- --- - - - --- -- --</Text>
      <Text> --- --- --- --- --- --- - - - --- -- --</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.replace('RegisterScreen');
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Agree</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            alert("You can't use the app unless you agree");
          }}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Quit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WaiverScreen;
