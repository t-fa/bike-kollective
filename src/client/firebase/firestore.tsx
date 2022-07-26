import { ourFirestore, User as FirebaseUser } from '../../server';
import { Bike, User } from '../types/types';

/**
 * Create Firestore document using information from authenticated user.
 * Document can only be written after a user has been authenticated.
 * */
export const createDocumentFromAuthenticatedUser = async (
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
export const documentExists = async (
  userId: string | undefined
): Promise<boolean> => {
  if (userId) {
    const documentReference = ourFirestore.doc(
      ourFirestore.db,
      '/users',
      userId
    );
    const documentSnapshot = await ourFirestore.getDoc(documentReference);
    return documentSnapshot.exists();
  }
  return false;
};

/**
 * Return a Bike object, given the bike document's Firestore ID
 * */
export const getBikeFromFirestore = async (bikeId: string): Promise<Bike> => {
  const theBikeDocument = await getDocumentById('bikes', bikeId);
  return theBikeDocument.data() as Bike;
};

/**
 * Return a User object, given the user document's Firestore ID
 * */
export const getUserFromFirestore = async (userId: string): Promise<User> => {
  const theUserDocument = await getDocumentById('users', userId);
  return theUserDocument.data() as User;
};

const getDocumentById = async (collection: string, documentId: string) => {
  return await ourFirestore.getDoc(
    ourFirestore.doc(ourFirestore.db, collection, documentId)
  );
};

/*const getBikeCollection = async () => {
    return await ourFirestore.getDocs(
        ourFirestore.collection(ourFirestore.db, 'bikes'));
}*/

/**
 * Set the bike as checked out in Firestore, given the bike document's Firestore ID
 * */
/*
export const checkoutBike = async (bikeId: number) => {
    // check out the bike
}*/
