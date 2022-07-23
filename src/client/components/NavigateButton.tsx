import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/StyleSheet';
import { Navigation } from '../types/types';

interface Props {
  navigation: Navigation;
  screenName: string;
  buttonText: string;
}

const NavigateButton: React.FC<Props> = ({
  navigation,
  screenName,
  buttonText
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(screenName)}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigateButton;
