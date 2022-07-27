import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Formik, FormikProps, FormikValues } from 'formik';
import * as Yup from 'yup';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import { ourAuth, ourFirestore } from '../../../server';

const ReviewBikeForm: React.FC = ({ selectedBike }) => {
  // Picker Data
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [items, setItems] = React.useState([]);
  const numStars = 5;
  const stars = [];

  // Add number of stars
  for (let index = 0; index < numStars; index++) {
    stars.push(
      <FontAwesome
        name="star"
        color="yellow"
        size={32}
        style={{ marginHorizontal: 5 }}
      ></FontAwesome>
    );
  }

  // Validation
  const validate = Yup.object({
    id: Yup.string().required('Required'),
    comments: Yup.string().max(200, 'Must be 500 characters or less'),
    rating: Yup.string()
      .required()
      .test('is-num-1-5', 'Rating must be a number 1 - 5', (val: unknown) => {
        return parseInt(val) < 6 && parseInt(val) > 0;
      })
  });

  // Initial value of bike
  const reviewValues = {
    id: '',
    comments: '',
    rating: '',
    reviewer: ourAuth.auth.currentUser?.uid
  };

  const _getData = async () => {
    interface Bike {
      label: string;
      value: string;
    }
    const bikes: Bike[] = [];
    // const options = []
    // Get document
    const querySnapshot = await ourFirestore.getDocs(
      ourFirestore.collection(ourFirestore.db, 'bikes')
    );

    // Loop through response
    querySnapshot.forEach((doc) => {
      // Add to array
      bikes.push({
        label: doc.data().model,
        value: doc.id
      });
      // options.push(<option value={doc.id} label={doc.data().model}></option>)
    });
    // Set data
    setItems(bikes);
    // setOptions(options);
  };
  React.useEffect(() => {
    _getData();
  }, []);

  return (
    <View style={styles.container}>
      <Formik
        // Set initial values
        initialValues={reviewValues}
        // validation
        validationSchema={validate}
        // On submit, post data to server
        onSubmit={async (values, { resetForm }) => {
          // Adds data to firestore
          await ourFirestore.addDoc(
            ourFirestore.collection(ourFirestore.db, 'reviews'),
            values
          );
          alert('Review Added');

          // Resets form
          setValue('Select a bike...');
          resetForm();
        }}
      >
        {/* build form */}
        {(props: FormikProps<FormikValues>) => (
          <View>
            {/* Bike id */}
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              value={value}
              setValue={setValue}
              onChangeValue={(value) => {
                props.values.id = value;
                selectedBike(props.values.id);
                props.handleChange('id');
              }}
              items={items}
              setItems={setItems}
              onBlur={() => {
                props.handleBlur('id');
              }}
              placeholder={'Select a bike...'}
              containerStyle={{ height: 40 }}
            />
            <Text style={styles.errors}>
              {props.touched.id && props.errors.id}
            </Text>

            {/* Comments */}
            <TextInput
              style={styles.input}
              multiline
              placeholder="Comments/Issues..."
              onChangeText={props.handleChange('comments')}
              value={props.values.comments}
              onBlur={props.handleBlur('comments')}
            ></TextInput>
            <Text style={styles.errors}>
              {props.touched.comments && props.errors.comments}
            </Text>

            {/* Rating */}
            <TextInput
              style={styles.input}
              multiline
              placeholder="Rating (1-5 stars)"
              onChangeText={props.handleChange('rating')}
              value={props.values.rating}
              keyboardType="numeric"
              onBlur={props.handleBlur('rating')}
            ></TextInput>
            <Text style={styles.errors}>
              {props.touched.rating && props.errors.rating}
            </Text>

            <TouchableOpacity
              style={styles.addReview}
              onPress={() => props.handleSubmit()}
            >
              <Text style={styles.ButtonText}>Write Review</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    // flex: 1
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6
  },
  errors: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  addReview: {
    marginTop: 10,
    width: 130,
    borderRadius: 4,
    backgroundColor: '#065C00',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginLeft: 44
  },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default ReviewBikeForm;
