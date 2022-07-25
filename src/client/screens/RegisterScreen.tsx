import React, { useState } from 'react';
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

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { setIsSignedIn } = useAuth();

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text: string) => setName(text)}
          style={styles.input}
        />
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
        <TextInput
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={(text: string) => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            emailPasswordCreateUser(setIsSignedIn, name, email, password);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text>{'Already have an account? '}</Text>
          <TouchableOpacity onPress={() => navigation.pop(2)}>
            <Text style={styles.link}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
