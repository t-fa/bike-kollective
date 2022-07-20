import { ourAuth, ourFirestore, User as FirebaseUser } from '../../../server';
import { Navigation, Screens } from '../types/types';

/**
 * Create new account (if using Google Sign In) or go to RegisterScreen.
 * */
export const agreeToWaiver = async (navigation: Navigation) => {
  // If account has been created from Google Sign-in, use
  // default values from their Google account to create a Firestore document.
  const currentUser = ourAuth.auth.currentUser;
  if (currentUser !== null) {
    await createDocumentFromAuthenticatedUser(currentUser, true);
    navigation.navigate(Screens.HomeScreen);
  } else {
    navigation.navigate(Screens.RegisterScreen);
  }
};
/**
 * Handle navigation based on logging in or signing up,
 * whether auth state has changed from Google Sign In or email & password authentication.
 * */
export function authStateChanged(navigation: Navigation) {
  ourAuth.auth.onAuthStateChanged(async (user) => {
    // navigate only when user has been authenticated
    if (user) {
      if (await documentExists(user.uid)) {
        navigation.navigate(Screens.HomeScreen);
      } else {
        navigation.navigate(Screens.WaiverScreen);
      }
    }
  });
}
/**
 * Authenticate new user and create new document using email and password
 * */
export const emailPasswordCreateUser = async (
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
        email,
        password
      );
    }
  } catch (error) {
    alert(error.code);
  }
};

/**
 * Sign in using email and password
 * */
export const emailPasswordSignIn = async (
  email: string,
  password: string
): Promise<void> => {
  // input validation here?

  try {
    await ourAuth.signInWithEmailAndPassword(ourAuth.auth, email, password);
  } catch (error) {
    alert(error.code);
  }
};

/**
 * Google Sign In (works only with Web, no mobile - for now?)
 * Once user is signed in, an observer will notice and a document
 * will be created in Firestore from there.
 * */
export const googleSignIn = async (): Promise<void> => {
  // Start a sign-in process for an unauthenticated user.
  try {
    await ourAuth.signInWithRedirect(ourAuth.auth, ourAuth.provider);
  } catch (error) {
    alert(error.code);
  }
  /* Can't get getRedirectResult to work */
  /*const result = await getRedirectResult(auth);
      if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result?.user;
          await createUserDocument(user?.email);
      }*/
};

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

/**
 * Create Firestore document using information from authenticated user.
 * Document can only be written after a user has been authenticated.
 * */
const createDocumentFromAuthenticatedUser = async (
  user: FirebaseUser,
  fromGoogle: boolean,
  userName?: string,
  email?: string
) => {
  try {
    // TODO: can probably be shortened - only name and email change between this if and else
    if (fromGoogle) {
      await ourFirestore.setDoc(
        ourFirestore.doc(ourFirestore.db, '/users', user.uid),
        {
          userId: user.uid,
          name: user.email,
          email: user.email
        }
      );
    } else {
      await ourFirestore.setDoc(
        ourFirestore.doc(ourFirestore.db, '/users', user.uid),
        {
          userId: user.uid,
          name: userName,
          email: email
        }
      );
    }
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

/**
 * Check Firestore for existence of document, given the userId.
 * */
const documentExists = async (userId: string): Promise<boolean> => {
  const documentReference = ourFirestore.doc(ourFirestore.db, '/users', userId);
  const documentSnapshot = await ourFirestore.getDoc(documentReference);
  return documentSnapshot.exists();
};
