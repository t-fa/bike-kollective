import {
  ourAuth,
  ourFirestore,
  QuerySnapshot,
  User as FirebaseUser
} from '../../server';
import { User } from '../types/types';
import { BikeType } from '../components/types';

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
export const getBikeFromFirestore = async (
  bikeId: string
): Promise<BikeType> => {
  const theBikeDocument = await getDocumentById('bikes', bikeId);
  return theBikeDocument.data() as BikeType;
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

/**
 * Get Review for Bike, given the bikes document's Firestore ID
 */
export const getReviewsFromFirestore = async (
  bikeId: string
): Promise<QuerySnapshot> => {
  const q = ourFirestore.query(
    ourFirestore.collection(ourFirestore.db, 'reviews'),
    ourFirestore.where('id', '==', bikeId)
  );
  return await ourFirestore.getDocs(q);
};

/**
 * Set the bike as checked out in the Bikes collection, and for the current user
 * */
export const checkOutBike = async (bikeId: string): Promise<void> => {
  const bikeDoc = await getDocumentById('bikes', bikeId);
  await ourFirestore.updateDoc(bikeDoc.ref, { checkedOut: true });
  await checkOutBikeToUser(bikeId);
};

/**
 * Save Checked-out bikeId in user's document
 * */
const checkOutBikeToUser = async (bikeId: string): Promise<void> => {
  const currentUser = ourAuth.auth.currentUser;
  if (currentUser) {
    const userDoc = await getDocumentById('users', currentUser.uid);
    await ourFirestore.updateDoc(userDoc.ref, { checkedOutBikeId: bikeId });
  }
};

/**
 * Determine if user has checked out a bike
 * */
export const doesUserHaveABikeCheckedOut = async (): Promise<boolean> => {
  const currentUser = ourAuth.auth.currentUser;
  if (currentUser) {
    const theUserDocument = await getDocumentById('users', currentUser.uid);
    const user = theUserDocument.data() as User;
    return user.checkedOutBikeId.length > 0;
  }
  return false;
};

/**
 * Get the user's checked-out bike ID
 * */
export const getCheckedOutBikeId = async (): Promise<string> => {
  const currentUser = ourAuth.auth.currentUser;
  if (currentUser) {
    const theUserDocument = await getDocumentById('users', currentUser.uid);
    const user = theUserDocument.data() as User;
    return user.checkedOutBikeId;
  }

  throw false;
};

/**
 * Set the bike's stolen status
 * */
export const setStolenStatus = async (
  bikeId: string,
  status: boolean
): Promise<void> => {
  const bikeDoc = await getDocumentById('bikes', bikeId);
  await ourFirestore.updateDoc(bikeDoc.ref, { stolen: status });
};

/**
 * Determine if bike is stolen
 * */
export const isBikeStolen = async (bikeId: string): Promise<boolean> => {
  const bike = await getBikeFromFirestore(bikeId);
  return bike.stolen;
};
