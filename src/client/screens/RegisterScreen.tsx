import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import styles from '../styles/StyleSheet';
import { emailPasswordCreateUser } from '../firebase/authentication';
import { RegisterScreenProps } from '../types/types';
import { useAuth } from '../components/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { setIsSignedIn } = useAuth();

  const registerValidationSchema = Yup.object({
    name: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required')
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        onSubmit={async (values) => {
          await emailPasswordCreateUser(
            setIsSignedIn,
            values.name,
            values.email,
            values.password
          );
        }}
        validationSchema={registerValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          isValid,
          touched,
          values
        }) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                style={styles.input}
              />
              {touched.name && errors.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
              ) : (
                <Text />
              )}
              <TextInput
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.input}
              />
              {touched.email && errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : (
                <Text />
              )}
              <TextInput
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={styles.input}
                secureTextEntry
              />
              {touched.password && errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : (
                <Text />
              )}
              <TextInput
                placeholder="Confirm password"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                style={styles.input}
                secureTextEntry
              />
              {touched.confirmPassword && errors.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : (
                <Text />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={!isValid}
                onPress={() => {
                  isValid
                    ? handleSubmit()
                    : () => {
                        /* do nothing if not valid */
                      };
                }}
                style={
                  isValid && Object.keys(touched).length > 0
                    ? styles.button
                    : styles.disabledButton
                }
              >
                <Text
                  style={
                    isValid && Object.keys(touched).length > 0
                      ? styles.buttonText
                      : styles.disabledButtonText
                  }
                >
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text>{'Already have an account? '}</Text>
              <TouchableOpacity onPress={() => navigation.pop(2)}>
                <Text style={styles.link}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
