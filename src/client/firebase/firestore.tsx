import {
  ourAuth,
  ourFirestore,
  QuerySnapshot,
  User as FirebaseUser
} from '../../server';
import { User } from '../types/types';
import { ExpoPushToken } from 'expo-notifications';
import { BikeType } from '../components/types';
import { where } from 'firebase/firestore';
import { getBikeImageUrl } from './storage';
import { Dispatch, SetStateAction } from 'react';
import { userSignOut } from './authentication';
import {
  firstBikeReturnReminder,
  lastBikeReturnReminder,
  cancelBikeReturnReminder
} from '../helpers/Notfications';

enum Collections {
  users = 'users',
  bikes = 'bikes',
  reviews = 'reviews'
}

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
    let theName;
    let theEmail;
    if (fromGoogle) {
      theName = user.displayName != null ? user.displayName : user.email;
      theEmail = user.email;
    } else {
      theName = userName;
      theEmail = email;
    }

    await ourFirestore.setDoc(
      ourFirestore.doc(ourFirestore.db, Collections.users, user.uid),
      {
        userId: user.uid,
        name: theName,
        email: theEmail,
        signedWaiver: true,
        bikesOwned: [],
        checkedOutBikeId: '',
        banned: false
      }
    );
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
      Collections.users,
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
  const theBikeDocument = await getDocumentById(Collections.bikes, bikeId);
  return theBikeDocument.data() as BikeType;
};

/**
 * Return a User object, given the user document's Firestore ID
 * */
export const getUserFromFirestore = async (userId: string): Promise<User> => {
  const theUserDocument = await getDocumentById(Collections.users, userId);
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
    ourFirestore.collection(ourFirestore.db, Collections.reviews),
    ourFirestore.where('id', '==', bikeId)
  );
  return await ourFirestore.getDocs(q);
};

/**
 * Adds push notification to user document
 */
export const addPushTokenToUser = async (
  userId: string,
  token: ExpoPushToken
) => {
  const userDoc = ourFirestore.doc(ourFirestore.db, 'users', userId);

  await ourFirestore.setDoc(
    userDoc,
    {
      pushToken: token
    },
    { merge: true }
  );
};

/*const getBikeCollection = async () => {
    return await ourFirestore.getDocs(
        ourFirestore.collection(ourFirestore.db, 'bikes'));
}*/
/*
 * Set the bike as checked out in the Bikes collection, and for the current user
 * */
export const checkOutBike = async (
  bikeId: string,
  time: string
): Promise<string> => {
  const bikeDoc = await getDocumentById(Collections.bikes, bikeId);
  await ourFirestore.updateDoc(bikeDoc.ref, {
    checkedOut: true,
    checkedOutTime: time
  });
  await checkOutBikeToUser(bikeId);
  const theBike = bikeDoc.data() as BikeType;
  return theBike.lockCombination;
};

/**
 * Save Checked-out bikeId in user's document
 * */
const checkOutBikeToUser = async (bikeId: string): Promise<void> => {
  const currentUser = ourAuth.auth.currentUser;
  const pushID8 = await firstBikeReturnReminder();
  const pushID24 = await lastBikeReturnReminder();
  if (currentUser) {
    const userDoc = await getDocumentById(Collections.users, currentUser.uid);
    await ourFirestore.updateDoc(userDoc.ref, {
      checkedOutBikeId: bikeId,
      firstReturnReminderId: pushID8,
      secondReturnReminderId: pushID24
    });
  }
};

/*
 * Set the bike as checked out in the Bikes collection, and for the current user
 * */
export const checkInBike = async (bikeId: string): Promise<void> => {
  const bikeDoc = await getDocumentById('bikes', bikeId);
  const bike = bikeDoc.data();
  const isUserBanned = checkIfOverdue(bike.checkedOutTime);
  await ourFirestore.updateDoc(bikeDoc.ref, {
    checkedOut: false,
    checkedOutTime: ''
  });
  await checkInBikeFromUser(isUserBanned);
};

/**
 * Save Checked-out bikeId in user's document
 * */
const checkInBikeFromUser = async (accountStatus: boolean): Promise<void> => {
  const currentUser = ourAuth.auth.currentUser;
  if (currentUser) {
    const userDoc = await getDocumentById('users', currentUser.uid);
    await ourFirestore.updateDoc(userDoc.ref, {
      checkedOutBikeId: '',
      banned: accountStatus
    });
  }
};

/**
 * Determine if user has checked out a bike
 * */
export const userHasABikeCheckedOut = async (): Promise<boolean> => {
  const currentUser = ourAuth.auth.currentUser;
  if (currentUser) {
    const theUserDocument = await getDocumentById(
      Collections.users,
      currentUser.uid
    );
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
    const theUserDocument = await getDocumentById(
      Collections.users,
      currentUser.uid
    );
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
  const bikeDoc = await getDocumentById(Collections.bikes, bikeId);
  await ourFirestore.updateDoc(bikeDoc.ref, { stolen: status });
};

/**
 * Determine if bike is stolen
 * */
export const isBikeStolen = async (bikeId: string): Promise<boolean> => {
  const bike = await getBikeFromFirestore(bikeId);
  return bike.stolen;
};

/**
 * Observe user's document, to see if they check out a bike
 * Used to set state in the Profile screen
 * */
export const observeUserCheckOutBike = async (
  setUser: Dispatch<SetStateAction<User>>,
  setUserHasCheckedOutBike: Dispatch<SetStateAction<boolean>>,
  setCheckedOutBike: Dispatch<SetStateAction<BikeType>>,
  setBikeUri: Dispatch<SetStateAction<string>>
) => {
  // First check if user is signed in (they should be, but this is how Firebase wants  it)
  return ourAuth.auth.onAuthStateChanged(async (authUser) => {
    if (authUser) {
      setUser(await getUserFromFirestore(authUser.uid));

      const userQuery = await getQueryFromUserId(authUser.uid);
      ourFirestore.onSnapShot(userQuery, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          const updatedUser = change.doc.data() as User;
          setUser(updatedUser);

          const hasBike = updatedUser.checkedOutBikeId.length > 0;
          setUserHasCheckedOutBike(hasBike);

          if (hasBike) {
            const theBike = await getBikeFromFirestore(
              updatedUser.checkedOutBikeId
            );
            setCheckedOutBike(theBike);
            setBikeUri(await getBikeImageUrl(theBike.photo));
          }
        });
      });
      return;
    }
  });
};

const getQueryFromUserId = async (userId: string) => {
  const usersCollection = await ourFirestore.collection(
    ourFirestore.db,
    Collections.users
  );
  return ourFirestore.query(usersCollection, where('userId', '==', userId));
};

/**
 * Checks if a user has had a bike out for > 24 hours.
 * @param timeOut Time user checks out bike
 */
function checkIfOverdue(timeOut: string): boolean {
  const timeOutDate = new Date(timeOut);
  const currentDate = new Date();
  const timeDifference = Math.abs(timeOutDate - currentDate);
  const diffDays = timeDifference / (1000 * 60 * 60 * 24);

  if (diffDays > 1) {
    return true;
  } else {
    return false;
  }
}

/**
 * Updates bikes checkouted status and user's current bike. Checks user is banned.
 * @param user
 */
export const parkBikeProcess = async (
  user: User,
  setIsSignedIn: Dispatch<SetStateAction<boolean>>
): Promise<void> => {
  // Return Bike
  const bikeDoc = await getDocumentById(
    Collections.bikes,
    user.checkedOutBikeId
  );
  const isUserBanned = checkIfOverdue(bikeDoc.data().checkedOutTime);
  await ourFirestore.updateDoc(bikeDoc.ref, {
    checkedOut: false,
    checkedOutTime: ''
  });

  // Update user
  const userDoc = await getDocumentById(Collections.users, user.userId);

  // Cancel Reminder
  const reminderOneId = userDoc.data().firstReturnReminderId;
  const reminderTwoId = userDoc.data().secondReturnReminderId;
  if (reminderOneId != '' || reminderTwoId != '') {
    cancelBikeReturnReminder(reminderOneId);
    cancelBikeReturnReminder(reminderTwoId);
  }

  await ourFirestore.updateDoc(userDoc.ref, {
    checkedOutBikeId: '',
    banned: isUserBanned,
    firstReturnReminderId: '',
    secondReturnReminderId: ''
  });
  alert('Bike returned! Thank you');

  // User banned, sign out
  if (isUserBanned) {
    alert(
      "You failed to return this bike within 24 hours.\nYou've been banned from Bike Kollective"
    );
    userSignOut(setIsSignedIn);
  }
};
