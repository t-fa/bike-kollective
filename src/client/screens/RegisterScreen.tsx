import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { auth } from '../../../server';
import styles from '../styles/StyleSheet';
import Account from '../../../firebase/account';

type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RegisterScreen'
>;

const RegisterScreen: React.FC<RegisterScreenProps> = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // attach listener to navigate when user logs in, for now
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        props.navigation.navigate('HomeScreen');
      }
    });
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            Account.emailPasswordCreateUser(email, password);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text>{'Already have an account? '}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.replace('LoginScreen')}
          >
            <Text style={styles.link}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
