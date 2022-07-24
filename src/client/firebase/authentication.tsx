import { ourAuth } from '../../../server';
import { Navigation, Screens } from '../types/types';
import { createDocumentFromAuthenticatedUser } from './firestore';
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
    //navigation.navigate(Screens.HomeScreen);
  } else {
    navigation.navigate(Screens.RegisterScreen);
  }
};

/**
 * If on LoginScreen and already logged in, navigate to HomeScreen
 * */
export function authStateChanged(navigation: Navigation) {
  ourAuth.auth.onAuthStateChanged(async (user) => {
    if (user) {
      navigation.navigate(Screens.HomeScreen);
    }
  });
}

/**
 * If on LoginScreen and already logged in, navigate to HomeScreen
 * */
export function authStateChanged2(
  setIsSignedIn: Dispatch<SetStateAction<boolean>>
) {
  ourAuth.auth.onAuthStateChanged(async (user) => {
    if (user) {
      setIsSignedIn(true);
    }
  });
}

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
      //navigation.navigate(Screens.HomeScreen);
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
      //navigation.navigate(Screens.HomeScreen);
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
      if (userDetails?.isNewUser) {
        navigation.navigate(Screens.WaiverScreen);
      } else {
        //navigation.navigate(Screens.HomeScreen);
        setIsSignedIn(true);
      }
    }

    /* This method would redirect to a new screen for the Google Sign In
     *  and return, which would make more sense in mobile.
     *  However, getting the redirect result doesn't work. */
    /*
    console.log("Before signInWithRedirect");
    await ourAuth.signInWithRedirect(ourAuth.auth, ourAuth.provider);
    console.log("After signInWithRedirect");

    const result = await ourAuth.getRedirectResult(ourAuth.auth);
    console.log("After getRedirectResult", result);

    if (result) {
      const userDetails = ourAuth.getAdditionalUserInfo(result);
      if (userDetails?.isNewUser) {
        navigation.navigate(Screens.WaiverScreen);
      } else {
        navigation.navigate(Screens.HomeScreen);
      }
    }
    */
  } catch (error) {
    alert(error.code);
  }
};

/**
 * Return true if the user is currently signed in, false if not
 * */
export const isUserSignedIn = (): boolean => ourAuth.auth.currentUser != null;

/**
 * Sign out an authenticated user
 * */
export const userSignOut = async (): Promise<void> => {
  try {
    await ourAuth.signOut(ourAuth.auth);
    alert('Successfully signed out');
  } catch (error) {
    alert(error.code);
  }
};
