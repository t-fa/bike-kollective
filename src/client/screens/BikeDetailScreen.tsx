import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { BikeDetailScreenProps, Issue, Review } from '../types/types';
import { getBikeImageUrl } from '../firebase/storage';
import styles from '../styles/StyleSheet';
import { useNavigation } from '@react-navigation/native';
import {
  checkOutBike,
  getReviewsFromFirestore,
  setStolenStatus,
  userHasABikeCheckedOut
} from '../firebase/firestore';

const BikeDetailScreen: React.FC<BikeDetailScreenProps> = ({ route }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [issues, setIssues] = useState<Issue[]>([]);

  const navigation = useNavigation();
  const bike = route.params;

  useEffect(() => {
    const getUrl = async () => {
      setImageUrl(await getBikeImageUrl(bike.photo));
    };
    const getReviews = async () => {
      const reviews = await getReviewsFromFirestore('4eXBUNqHKVUdSzFbziUW');
      const reviewsList: Review[] = [];
      await reviews.forEach((doc) => {
        const review = doc.data();
        review['reviewId'] = doc.id;
        reviewsList.push(review as Review);
      });
      setReviews(reviewsList);
    };

    const calculateRating = () => {
      let totalRating = 0;
      const issuesList: Issue[] = [];
      reviews.map((review, index) => {
        totalRating += parseFloat(review.rating);
        issuesList.push({
          user: review.reviewer + '_' + index.toString(),
          comments: review.comments,
          bikeId: review.id + '_' + index.toString(),
          issueId: review.reviewId
        });
      });
      setRating(Number((totalRating / reviews.length).toFixed(1)));
      setIssues(issuesList);
    };

    getUrl();
    getReviews();
    calculateRating();
  }, []);

  const reportAsStolen = async (bikeId: string) => {
    await setStolenStatus(bikeId, true);
    alert('Sorry about that! Please choose another');
    navigation.goBack();
  };

  const onCheckOutClick = async (bikeId: string) => {
    if (await userHasABikeCheckedOut()) {
      alert('You already have a bike checked out.');
      return;
    }

    const lockCombo = await checkOutBike(bikeId);
    alert(`Bike checked out! Lock combination: ${lockCombo}. 
    The combination is also in the Profile section.`);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.smallEmptySpace} />
      <Text>Model: {bike.model}</Text>
      <Text>Longitude: {bike.location.coords.longitude}</Text>
      <Text>Latitude: {bike.location.coords.latitude}</Text>
      <Text>Average Rating: {rating} star(s)</Text>
      <Text>Comments: {bike.comments}</Text>
      <Text>Reviews And Issues Reported By Other Riders:</Text>
      <FlatList
        data={issues}
        renderItem={({ item }) => (
          <View
            style={{ borderWidth: 1, borderColor: 'black', marginBottom: 5 }}
          >
            <>
              <Text style={styles.flatListItem}>Reviewer: {item.user}</Text>
              <Text style={styles.flatListItem}>
                Comments/Issues: {item.comments}
              </Text>
              <Button
                title="Update"
                onPress={() => console.log(item.issueId)}
              ></Button>
            </>
          </View>
        )}
      ></FlatList>
      <Image
        style={{ width: 200, height: 200 }}
        source={{ uri: imageUrl }}
      ></Image>

      <View style={styles.smallEmptySpace} />
      <TouchableOpacity
        style={[styles.bikeDetailButtonOutlined]}
        onPress={() => {
          onCheckOutClick(bike.id);
        }}
      >
        <Text style={styles.buttonOutlineText}>Check out</Text>
      </TouchableOpacity>

      <View style={styles.smallEmptySpace} />

      <View style={styles.row}>
        <Text>{'Bike not there? '}</Text>
        <TouchableOpacity onPress={() => reportAsStolen}>
          <Text style={styles.link}>Report as stolen</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.smallEmptySpace} />
      <TouchableOpacity
        style={styles.bikeDetailButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>
      <View style={styles.smallEmptySpace} />
    </ScrollView>
  );
};

export default BikeDetailScreen;
