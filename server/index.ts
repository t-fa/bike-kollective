// import express, {Request, Response} from "express";
// import bodyParser from "body-parser";

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
  onSnapshot,
  clearIndexedDbPersistence
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

// create object, tired of messing with all these import/exports
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
  onSnapShot: onSnapshot,
  clearIndexedDbPersistence: clearIndexedDbPersistence
};

const ourStorage = {
  storage: storage,
  ref: ref,
  uploadBytes: uploadBytes,
  getDownloadURL: getDownloadURL
};

/*const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.get('/', (req: Request, res: Response) => {
    res.send('hello');
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});*/

export { ourAuth, ourFirestore, ourStorage, User, Unsubscribe };
