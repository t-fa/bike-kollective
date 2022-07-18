import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import styles from '../styles/StyleSheet';
import { agreeToWaiver } from '../firebase/authentication';

type WaiverScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WaiverScreen'
>;

const waiverMessage = `I HEREBY ASSUME ALL OF THE RISKS OF PARTICIPATING IN ANY/ALL ACTIVITIES ASSOCIATED WITH\n "The Bike Kollective,"\n
including by way of example and not limitation, any risks that may arise from negligence or carelessness on the part of the persons or entities being released, from dangerous or defective equipment or property owned, maintained, or controlled by them, or because of their possible liability without fault.\n
I certify that I am physically fit, have sufficiently prepared or trained for participation in this activity, and have not been advised to not participate by a qualified medical professional. I certify that there are no health-related reasons or problems which preclude my participation in this activity.\n
I acknowledge that this Accident Waiver and Release of Liability Form will be used by the event holders, sponsors, and organizers of the activity in which I may participate, and that it will govern my actions and responsibilities at said activity.`;

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const WaiverScreen: React.FC<WaiverScreenProps> = (props) => {
  const [dimensions, setDimensions] = useState({ window, screen });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        // add console log of dimensions to satisfy linter
        console.log(dimensions.toString());
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.scrollViewText}>
        First, please confirm agreement with the statements in this accident
        waiver
      </Text>
      <ScrollView style={styleThisPage.container}>
        <Text style={styles.scrollViewText}>{waiverMessage}</Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            agreeToWaiver(props);
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
      <View style={styles.emptySpace}></View>
    </View>
  );
};

const styleThisPage = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
    marginVertical: height * 0.1,
    marginHorizontal: width * 0.1
  },
  header: {
    fontSize: 16,
    marginVertical: 10
  }
});

export default WaiverScreen;
