import { ourGoogleAuth, ourFirestore } from '../../../server';
import { User as FirebaseUser } from 'firebase/auth';

/**
 * Authenticate new user and create new document using email and password
 * */
export const emailPasswordCreateUser = async (
  email: string,
  password: string
): Promise<void> => {
  // input validation here?

  try {
    await ourGoogleAuth.createUserWithEmailAndPassword(
      ourGoogleAuth.auth,
      email,
      password
    );
    const currentUser = ourGoogleAuth.auth.currentUser;
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
    await ourGoogleAuth.signInWithEmailAndPassword(
      ourGoogleAuth.auth,
      email,
      password
    );
  } catch (error) {
    alert(error.code);
  }
};

export const userSignOut = async (): Promise<void> => {
  try {
    await ourGoogleAuth.signOut(ourGoogleAuth.auth);
    alert('Successfully signed out');
  } catch (error) {
    alert(error.code);
  }
};

/**
 * TODO: Add this back in (only works when using Web - no mobile)
 * */
export const googleSignIn = async (): Promise<void> => {
  // Start a sign-in process for an unauthenticated user.
  // await signInWithRedirect(auth, provider);
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
 * Handle navigation based on logging in or signing up,
 * whether auth state has changed from Google Sign In or email & password authentication.
 * */
export function authStateChanged(props: {
  navigation: { navigate: (route: string) => void };
}) {
  ourGoogleAuth.auth.onAuthStateChanged(async (user) => {
    // navigate only when user has been authenticated
    if (user) {
      if (await documentExists(user.uid)) {
        props.navigation.navigate('HomeScreen');
      } else {
        props.navigation.navigate('WaiverScreen');
      }
    }
  });
}

/**
 * Check Firestore for existence of document, given the userId.
 * */
const documentExists = async (userId: string): Promise<boolean> => {
  const documentReference = ourFirestore.doc(ourFirestore.db, '/users', userId);
  const documentSnapshot = await ourFirestore.getDoc(documentReference);
  return documentSnapshot.exists();
};

/**
 * Create new account (if using Google Sign In) or go to RegisterScreen.
 * */
export const agreeToWaiver = async (props: {
  navigation: { navigate: (route: string) => void };
}) => {
  // If account has been created from Google Sign-in, use
  // default values from their Google account to create a Firestore document.
  const currentUser = ourGoogleAuth.auth.currentUser;
  if (currentUser !== null) {
    await createDocumentFromAuthenticatedUser(currentUser, true);
    props.navigation.navigate('HomeScreen');
  } else {
    props.navigation.navigate('RegisterScreen');
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
