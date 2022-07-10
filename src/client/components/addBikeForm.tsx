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
import { auth } from '../../../server';

const AddBikeForm: React.FC = ({ savedPhoto }) => {
  // Validation
  const validate = Yup.object({
    model: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    comments: Yup.string().max(200, 'Must be 200 characters or less'),
    issues: Yup.string().max(200, 'Must be 20 characters or less'),
    location: Yup.string().required('Required'),
    lockCombination: Yup.string().required('Required')
  });

  // Initial value of bike
  const bikeValues = {
    model: '',
    comments: '',
    issues: '',
    location: '',
    lockCombination: '',
    user: auth.currentUser?.email,
    photo: savedPhoto
  };

  return (
    <View style={styles.container}>
      <Formik
        // Set initial values
        initialValues={bikeValues}
        // validation
        validationSchema={validate}
        // On submit, post data to server
        onSubmit={(values) => {
          // Set photo
          values.photo = savedPhoto.uri;
          console.log(values.photo);
          // console.log(values)
          // fetch('http://localhost:8080/addBike', {
          //   method: 'post',
          //   headers: {
          //     'Content-Type': 'application/json'
          //   },
          //   body: JSON.stringify(values)
          // });
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
              onBlur={props.handleBlur('model')}
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
              onBlur={props.handleBlur('comments')}
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
              onBlur={props.handleBlur('issues')}
            ></TextInput>
            <Text style={styles.errors}>
              {props.touched.issues && props.errors.issues}
            </Text>

            {/* Location */}
            <TextInput
              style={styles.input}
              placeholder="Current Location of bike"
              onChangeText={props.handleChange('location')}
              value={props.values.location}
              onBlur={props.handleBlur('location')}
            ></TextInput>
            <Text style={styles.errors}>
              {props.touched.location && props.errors.location}
            </Text>

            {/* Lock Combo */}
            <TextInput
              style={styles.input}
              placeholder="Combination to unlock"
              onChangeText={props.handleChange('lockCombination')}
              value={props.values.lockCombination}
              onBlur={props.handleBlur('lockCombination')}
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
