import { ourFirestore, User as FirebaseUser } from '../../../server';
// import { Navigation, Screens } from '../types/types';

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
/*const documentExists = async (userId: string): Promise<boolean> => {
  const documentReference = ourFirestore.doc(ourFirestore.db, '/users', userId);
  const documentSnapshot = await ourFirestore.getDoc(documentReference);
  return documentSnapshot.exists();
};*/

/**
 * Return a bike object, given the bike document's Firestore ID
 * */
/*
const getBikeFromFirestore = async (bikeId: number) => {
    // return document
}*/

/**
 * Set the bike as checked out in Firestore, given the bike document's Firestore ID
 * */
/*
export const checkoutBike = async (bikeId: number) => {
    // check out the bike
}*/
