import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  getAuth,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  Unsubscribe
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  setDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  clearIndexedDbPersistence,
  query,
  where,
  QuerySnapshot
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDRvToZeMmzwEj_6_ugenBxPvgtjVUZGVs',
  authDomain: 'the-bike-kollective-a8f89.firebaseapp.com',
  projectId: 'the-bike-kollective-a8f89',
  storageBucket: 'the-bike-kollective-a8f89.appspot.com',
  messagingSenderId: '225142820895',
  appId: '1:225142820895:web:9232a05b139d743c1b852a',
  measurementId: 'G-TCPV9WSHNH'
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const ourAuth = {
  auth: auth,
  provider: provider,
  googleAuthProvider: GoogleAuthProvider, // need this static reference to call some methods
  getAdditionalUserInfo: getAdditionalUserInfo,
  signInWithPopup: signInWithPopup,
  signInWithRedirect: signInWithRedirect,
  getRedirectResult: getRedirectResult,
  getAuth: getAuth,
  fetchSignInMethodsForEmail: fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword: createUserWithEmailAndPassword,
  signInWithEmailAndPassword: signInWithEmailAndPassword,
  signOut: signOut
};

const ourFirestore = {
  db: db,
  collection: collection,
  doc: doc,
  addDoc: addDoc,
  getDoc: getDoc,
  setDoc: setDoc,
  getDocs: getDocs,
  updateDoc: updateDoc,
  onSnapShot: onSnapshot,
  clearIndexedDbPersistence: clearIndexedDbPersistence,
  query: query,
  where: where
};

const ourStorage = {
  storage: storage,
  ref: ref,
  uploadBytes: uploadBytes,
  getDownloadURL: getDownloadURL
};

export { ourAuth, ourFirestore, ourStorage, User, Unsubscribe, QuerySnapshot };
