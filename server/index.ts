//import express, {Request, Response} from "express";
//import bodyParser from "body-parser";
import { getFirestore } from 'firebase/firestore/lite';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apparently it's quite a pain to get the .env working with React Native
  // will look into later, or maybe someone else can?
  // Will use the key for now, since I did that in the first place anyway
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
const db = getFirestore(firebaseApp);

// Initialize Firebase
const auth = getAuth(firebaseApp);
// const analytics = getAnalytics(app);

export {
  firebaseApp,
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
};
