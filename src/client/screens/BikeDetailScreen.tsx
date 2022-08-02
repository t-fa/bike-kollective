import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image, FlatList } from 'react-native';
import { BikeDetailScreenProps, Issue } from '../types/types';
import { getBikeImageUrl } from '../firebase/storage';
import styles from '../styles/StyleSheet';

const BikeDetailScreen: React.FC<BikeDetailScreenProps> = ({
  /*navigation,*/ route
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const bike = route.params.bike;
  const reviews = route.params.review;
  const [rating, setRating] = useState<number>(0);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const getUrl = async () => {
      setImageUrl(await getBikeImageUrl(bike.photo));
    };

    // Calculates ratng and adds items to issues list
    const calculateRating = () => {
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
            user: review.reviewer + '_' + index.toString(),
            comments: review.comments,
            bikeId: review.id + '_' + index.toString(),
            issueId: review.reviewId
          });
        }
      );
      setRating(Number((totalRating / reviews.length).toFixed(1)));
      setIssues(issuesList);
    };

    getUrl();
    calculateRating();
  }, []);

  // TODO: add back button, or some other way to leave

  return (
    <View style={styles.container}>
      <Text>Model: {bike.model}</Text>
      <Text>Current Location: {bike.currentLocation}</Text>
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
      <Button
        title="Check out"
        /*onPress={() => checkoutBike(bikeId)}*/
      ></Button>
      <Text>Bike out of date? Update</Text>
    </View>
  );
};

export default BikeDetailScreen;
