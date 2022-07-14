// import express, {Request, Response} from "express";
// import bodyParser from "body-parser";

import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from "firebase/storage";


const firebaseConfig = {
  apiKey: 'AIzaSyDRvToZeMmzwEj_6_ugenBxPvgtjVUZGVs',
  authDomain: 'the-bike-kollective-a8f89.firebaseapp.com',
  projectId: 'the-bike-kollective-a8f89',
  storageBucket: 'the-bike-kollective-a8f89.appspot.com',
  messagingSenderId: '225142820895',
  appId: '1:225142820895:web:9232a05b139d743c1b852a',
  measurementId: 'G-TCPV9WSHNH'
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

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// need to export GoogleAuthProvider  to use its static methods,
// since you can't use static methods from an instance of a class, like provider (for some reason)

export {
  firebaseApp,
  auth,
  provider,
  GoogleAuthProvider,
  db,
  storage,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  getRedirectResult,
  getFirestore,
  collection,
  addDoc,
  ref,
  uploadBytes
};
