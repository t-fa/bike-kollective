import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import styles from '../styles/StyleSheet';
import {
  authStateChanged,
  emailPasswordSignIn,
  googleSignIn,
  userSignOut
} from '../firebase/authentication';
import { LoginScreenProps, Screens } from '../types/types';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // navigate once user logs in (or is already logged in)
  useEffect(() => {
    return authStateChanged(navigation);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            emailPasswordSignIn(email, password);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Screens.WaiverScreen);
          }}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            googleSignIn();
          }}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Google</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text>{"Don't have an account? "}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(Screens.WaiverScreen)}
          >
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text>Sign in using another account? </Text>
          <TouchableOpacity onPress={() => userSignOut()}>
            <Text style={styles.link}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
