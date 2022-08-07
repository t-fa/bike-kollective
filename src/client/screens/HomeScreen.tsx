import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import { Bike, HomeScreenProps, Screens, Review } from '../types/types';
import styles from '../styles/StyleSheet';
import NavigateButton from '../components/NavigateButton';
import {
  getBikeFromFirestore,
  getReviwsFromFirestore
} from '../firebase/firestore';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // TODO: attach this function to every bike in list?
  const goToBikeDetailScreen = (bike: Bike, reviews: Review[]) => {
    navigation.navigate(Screens.BikeDetailScreen, {
      bike: bike,
      review: reviews
    });
  };

  const [testBike, setTestBike] = useState<Bike>({
    id: '',
    comments: '',
    currentLocation: undefined,
    photo: '',
    issues: '',
    lockCombination: 0,
    model: '',
    owner: undefined,
    currentlyCheckedOut: false,
    rating: 0,
    stolen: false
  });

  const [bikeReviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const getAndSetBike = async () => {
      setTestBike(await getBikeFromFirestore('4eXBUNqHKVUdSzFbziUW'));
    };
    getAndSetBike();

    const getReviews = async () => {
      const reviews = await getReviwsFromFirestore('4eXBUNqHKVUdSzFbziUW');
      const reviewsList: Review[] = [];
      await reviews.forEach((doc) => {
        const review = doc.data();
        review['reviewId'] = doc.id;
        reviewsList.push(review);
      });
      setReviews(reviewsList);
    };
    getReviews();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <NavigateButton
        navigation={navigation}
        screenName={Screens.ViewBikeScreen}
        buttonText={'View Nearby Bikes'}
      />

      {/* Remove later */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => goToBikeDetailScreen(testBike, bikeReviews)}
        >
          <Text style={styles.buttonOutlineText}>
            Test: Go to details screen using a bike document
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
