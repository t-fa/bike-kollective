import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
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
  const [rating, setRating] = useState<number>(0);
  const [issues, setIssues] = useState<Issue[]>([]);

  const navigation = useNavigation();
  const bike = route.params;

  useEffect(() => {
    const getUrl = async () => {
      setImageUrl(await getBikeImageUrl(bike.photo));
    };

    // Gets all reviews for bike. Returns a list of bikes
    const getReviews = async () => {
      const r = await getReviewsFromFirestore(bike.id);
      const reviewsList: Review[] = [];
      await r.forEach((doc) => {
        const currentReview = doc.data();
        currentReview['reviewId'] = doc.id;
        reviewsList.push(currentReview as Review);
      });
      return reviewsList;
    };

    // Calculates rating and sets list of issues to disaplay
    const calculateRatingandSetIssues = (reviews: Review[]) => {
      let totalRating = 0;
      const issuesList: Issue[] = [];
      reviews.map(
        (
          review: {
            rating: string;
            reviewer: string;
            comments: string;
            id: string;
            reviewId: string;
          },
          index: { toString: () => string }
        ) => {
          totalRating += parseFloat(review.rating);
          issuesList.push({
            user: review.reviewer + '.' + index.toString(),
            comments: review.comments,
            bikeId: review.id + '.' + index.toString(),
            issueId: review.reviewId
          });
        }
      );
      setRating(Number((totalRating / reviews.length).toFixed(1)));
      setIssues(issuesList);
    };

    // Gets list of Reviews and updates data for ui
    const setReviewsList = async () => {
      const listOfReviews = await getReviews();
      calculateRatingandSetIssues(listOfReviews);
    };
    getUrl();

    setReviewsList();
    // calculateRating();
  }, []);

  const reportAsStolen = async (bikeId: string) => {
    await setStolenStatus(bikeId, true);
    alert('Sorry about that! Please choose another');
    navigation.goBack();
  };

  const onCheckOutClick = async (bikeId: string, dateAndTime: string) => {
    if (await userHasABikeCheckedOut()) {
      alert('You already have a bike checked out.');
      return;
    }

    const lockCombo = await checkOutBike(bikeId, dateAndTime);
    alert(`Bike checked out! Lock combination: ${lockCombo}. 
    The combination is also in the Profile section.`);
    navigation.goBack();
  };

  return (
    <FlatList
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
      }}
      ListHeaderComponent={
        <>
          <View style={styles.smallEmptySpace} />
          <Text>Model: {bike.model}</Text>
          <Text>Longitude: {bike.location.coords.longitude}</Text>
          <Text>Latitude: {bike.location.coords.latitude}</Text>
          <Text>Average Rating: {rating} star(s)</Text>
          <Text>Comments: {bike.comments}</Text>
          <Text>Reviews And Issues Reported By Other Riders:</Text>
        </>
      }
      data={issues}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 5 }}>
          <>
            <Text style={styles.flatListItem}> * Reviewer: {item.user}</Text>
            <Text style={{ paddingLeft: 35 }}>
              Comments/Issues: {item.comments}
            </Text>
          </>
        </View>
      )}
      ListFooterComponent={
        <>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: imageUrl }}
          ></Image>
          <View style={styles.smallEmptySpace} />
          <TouchableOpacity
            style={[styles.bikeDetailButtonOutlined]}
            onPress={() => {
              const Datetime = new Date().toLocaleString();
              onCheckOutClick(bike.id, Datetime);
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
        </>
      }
    ></FlatList>
  );
};

export default BikeDetailScreen;
