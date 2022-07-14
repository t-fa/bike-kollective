import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from '../styles/StyleSheet';
import {
  createUserDocument,
  emailPasswordSignIn,
  googleSignIn,
  userSignOut
} from '../../../firebase/authentication';
import { auth } from '../../../server';
import { RootStackParamList } from '../../../App';
// import {getRedirectResult} from "firebase/auth";

type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginScreen'
>;

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // TODO: should be somewhere else?
  // if user is already logged in, go to HomeScreen
  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        alert('After auth state changed');
        await createUserDocument(user?.email);
        //props.navigation.navigate('HomeScreen');
        //alert("After clicking sign in");
      }
    });
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
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
            props.navigation.replace('WaiverScreen');
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
            onPress={() => props.navigation.replace('WaiverScreen')}
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
