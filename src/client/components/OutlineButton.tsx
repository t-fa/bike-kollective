import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/StyleSheet';

interface Props {
  onPressFunction: () => void;
  buttonText: string;
}

const OutlineButton: React.FC<Props> = ({ onPressFunction, buttonText }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, styles.buttonOutline]}
        onPress={() => onPressFunction()}
      >
        <Text style={styles.buttonOutlineText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OutlineButton;
