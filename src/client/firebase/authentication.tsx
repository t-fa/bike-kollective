import {
  auth,
  provider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  collection,
  db,
  doc,
  addDoc,
  getDoc
} from '../../../server';
import { User as FirebaseUser } from 'firebase/auth';

/**
 * TODO: Google Sign-in/up
 *       Input validation functions
 * */
export const emailPasswordCreateUser = (
  email: string,
  password: string
): void => {
  // input validation here?

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.email);
    })
    .catch((error) => {
      alert(error.code);
    });
};

export const emailPasswordSignIn = (email: string, password: string): void => {
  // input validation here?

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.email);
    })
    .catch((error) => {
      alert(error.code);
    });
};

export const userSignOut = (): void => {
  signOut(auth)
    .then(() => {
      alert('Signed out');
    })
    .catch((error: Error) => {
      alert(`Error: ${error} Unable to sign out. You're trapped!`);
    });
};

export const googleSignIn = async () => {
  // Start a signin process for an unauthenticated user.
  await signInWithRedirect(auth, provider);

  /* Can't get getRedirectResult to work */

  /*const result = await getRedirectResult(auth);
    if (result) {

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result?.user;
        await createUserDocument(user?.email);
    }*/
};

export function authStateChanged(props: {
  navigation: { navigate: (route: string) => void };
}) {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      /*
      When authState changes, that means a user has logged in.
      So, could create User document at this time.
      */

      // await createUserDocument(user?.email);
      props.navigation.navigate(await createOrLogin(user));
    }
  });
}

const createOrLogin = async (user: FirebaseUser): Promise<string> => {
  const docRef = doc(db, 'users', user.uid);
  const docSnapshot = await getDoc(docRef);

  // user is logging in, so take directly to HomeScreen
  if (docSnapshot.exists()) {
    return 'HomeScreen';
  }

  // otherwise, they're creating an account and need to sign the waiver
  return 'WaiverScreen';
};

export const createUserDocument = async (email: string | null | undefined) => {
  try {
    const coll = collection(db, '/users');
    const docRef = await addDoc(coll, {
      first: email
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
