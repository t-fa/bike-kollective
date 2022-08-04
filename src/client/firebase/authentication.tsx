import { ourAuth } from '../../server';
import { Navigation, Screens } from '../types/types';
import {
  createDocumentFromAuthenticatedUser,
  documentExists
} from './firestore';
import { Dispatch, SetStateAction } from 'react';

/**
 * Create new account (if using Google Sign In) or go to RegisterScreen.
 * */
export const agreeToWaiver = async (
  navigation: Navigation,
  setIsSignedIn: Dispatch<SetStateAction<boolean>>
) => {
  // If account has been created from Google Sign-in, use
  // default values from their Google account to create a Firestore document.
  const currentUser = ourAuth.auth.currentUser;
  if (currentUser !== null) {
    await createDocumentFromAuthenticatedUser(currentUser, true);
    alert('Account successfully created!');
    setIsSignedIn(true);
  } else {
    navigation.navigate(Screens.RegisterScreen);
  }
};

/**
 * If on LoginScreen and already logged in, navigate to HomeScreen
 * */
/*export function authStateChanged(navigation: Navigation) {
  ourAuth.auth.onAuthStateChanged(async (user) => {
    if (user) {
      navigation.navigate(Screens.HomeScreen);
    }
  });
}*/

/**
 * Authenticate new user and create new document using email and password
 * */
export const emailPasswordCreateUser = async (
  setIsSignedIn: Dispatch<SetStateAction<boolean>>,
  name: string,
  email: string,
  password: string
): Promise<void> => {
  // input validation here?

  try {
    await ourAuth.createUserWithEmailAndPassword(ourAuth.auth, email, password);
    const currentUser = ourAuth.auth.currentUser;
    if (currentUser !== null) {
      await createDocumentFromAuthenticatedUser(
        currentUser,
        false,
        name,
        email
      );
      alert('Account successfully created!');
      setIsSignedIn(true);
    }
  } catch (error) {
    alert(error.code);
  }
};

/**
 * Sign in using email and password
 * */
export const emailPasswordSignIn = async (
  setIsSignedIn: Dispatch<SetStateAction<boolean>>,
  email: string,
  password: string
): Promise<void> => {
  // input validation here?

  try {
    await ourAuth.signInWithEmailAndPassword(ourAuth.auth, email, password);
    if (ourAuth.auth.currentUser != null) {
      // go to HomeScreen
      setIsSignedIn(true);
    }
  } catch (error) {
    alert(error.code);
  }
};

/**
 * Google Sign In (works only with Web, no mobile - for now?)
 * Determine whether logging in or new account creation is needed
 * */
export const googleSignIn = async (
  navigation: Navigation,
  setIsSignedIn: Dispatch<SetStateAction<boolean>>
): Promise<void> => {
  try {
    // a popup is used to display the Google Sign In
    const result = await ourAuth.signInWithPopup(
      ourAuth.auth,
      ourAuth.provider
    );
    if (result) {
      /* Can get profile picture, among other things, from userDetails */
      const userDetails = ourAuth.getAdditionalUserInfo(result);

      if (
        userDetails?.isNewUser ||
        !(await documentExists(ourAuth.auth.currentUser?.uid))
      ) {
        navigation.navigate(Screens.WaiverScreen);
      } else {
        // go to HomeScreen
        setIsSignedIn(true);
      }
    }
  } catch (error) {
    alert(error.code);
  }
};

/**
 * Return true if the user is currently signed in, false if not (doesn't work well)
 * */
export const isUserSignedIn = (): boolean => ourAuth.auth.currentUser != null;

/**
 * Return logged in user's id
 * */
export const getUserId = (): string => {
  const user = ourAuth.auth.currentUser;
  if (user) {
    return user.uid;
  }
  return '';
};

/**
 * Sign out an authenticated user and return to LoginScreen
 * */
export const userSignOut = async (
  setIsSignedIn: Dispatch<SetStateAction<boolean>>
): Promise<void> => {
  try {
    await ourAuth.signOut(ourAuth.auth);
    alert('Successfully signed out');
    setIsSignedIn(false);
  } catch (error) {
    alert(error.code);
  }
};
