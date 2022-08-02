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
import { ourAuth, ourFirestore, ourStorage } from '../../server';
import * as Location from 'expo-location';

type AddBikeFormProps = {
  data: object;
  capturedImage: string;
};

const AddBikeForm: React.FC<AddBikeFormProps> = ({
  formData,
  updateForm,
  bikePhotoUri
}) => {
  const [location, setLocation] = React.useState<Location.LocationObject>();

  // Validation
  const validate = Yup.object({
    model: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    comments: Yup.string().max(200, 'Must be 200 characters or less'),
    issues: Yup.string().max(200, 'Must be 20 characters or less'),
    // location: Yup.string().required('Required'),
    lockCombination: Yup.string().required('Required')
  });

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Formik
        // Set initial values
        initialValues={formData}
        // validation
        validationSchema={validate}
        // On submit, post data to server
        onSubmit={async (values, { resetForm }) => {
          // Create a reference for phoho
          const pictureLocation = `images/${Math.random().toString(36)}`;

          // Empty photo
          if (bikePhotoUri == null) {
            alert('Please add a photo');
            return;
          }
          // Get image and convert to bytes
          const img = await fetch(bikePhotoUri.uri);
          const bytes = await img.blob();

          values.photo = pictureLocation;
          values.location = location;

          const pictureReference = ourStorage.ref(
            ourStorage.storage,
            pictureLocation
          );

          // Saved Image
          ourStorage.uploadBytes(pictureReference, bytes).then(() => {
            console.log('picture saved');
          });

          // Add bike data to firestore
          await ourFirestore.addDoc(
            ourFirestore.collection(ourFirestore.db, 'bikes'),
            values
          );
          alert('Bike Added');
          // Reset values
          {
            (formData.model = ''),
              (formData.comments = ''),
              (formData.issues = ''),
              // (formData.location = ''),
              (formData.lockCombination = ''),
              (formData.photoLocation = ''),
              formData.photo;
          }
          await updateForm({
            model: '',
            comments: '',
            issues: '',
            // location: '',
            lockCombination: '',
            photoLocation: '',
            user: ourAuth.auth.currentUser?.uid,
            photo: null
          });
          resetForm(); // reset form
        }}
      >
        {/* build form */}
        {(props: FormikProps<FormikValues>) => (
          <View>
            {/* Bike Model */}
            <TextInput
              style={styles.input}
              placeholder="Bike model"
              onChangeText={props.handleChange('model')}
              value={props.values.model}
              onBlur={() => {
                updateForm(props.values);
                props.handleBlur('model');
              }}
            ></TextInput>
            <Text style={styles.errors}>
              {props.touched.model && props.errors.model}
            </Text>

            {/* Stuff to know */}
            <TextInput
              style={styles.input}
              multiline
              placeholder="Stuff riders should know"
              onChangeText={props.handleChange('comments')}
              value={props.values.comments}
              onBlur={() => {
                updateForm(props.values);
                props.handleBlur('comments');
              }}
            ></TextInput>
            <Text style={styles.errors}>
              {props.touched.comments && props.errors.comments}
            </Text>

            {/* Bike Issues */}
            <TextInput
              style={styles.input}
              multiline
              placeholder="Issues with bike"
              onChangeText={props.handleChange('issues')}
              value={props.values.issues}
              onBlur={() => {
                updateForm(props.values);
                props.handleBlur('issues');
              }}
            ></TextInput>
            <Text style={styles.errors}>
              {props.touched.issues && props.errors.issues}
            </Text>

            {/* Location */}
            {/* <TextInput
              style={styles.input}
              placeholder="Current Location of bike"
              onChangeText={props.handleChange('location')}
              value={props.values.location}
              onBlur={() => {
                updateForm(props.values);
                props.handleBlur('location');
              }}
            ></TextInput> */}
            {/* <Text style={styles.errors}>
              {props.touched.location && props.errors.location}
            </Text> */}

            {/* Lock Combo */}
            <TextInput
              style={styles.input}
              placeholder="Combination to unlock"
              onChangeText={props.handleChange('lockCombination')}
              value={props.values.lockCombination}
              onBlur={() => {
                updateForm(props.values);
                props.handleBlur('lockCombination');
              }}
            ></TextInput>
            <Text style={styles.errors}>
              {props.touched.lockCombination && props.errors.lockCombination}
            </Text>

            {/* <CameraButton></CameraButton> */}

            <TouchableOpacity
              style={styles.addBike}
              onPress={() => props.handleSubmit()}
            >
              <Text style={styles.ButtonText}>Add Bike</Text>
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
  addBike: {
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

export default AddBikeForm;
