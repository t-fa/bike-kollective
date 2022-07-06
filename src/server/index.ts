import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: 'the-bike-kollective-a8f89.firebaseapp.com',
  projectId: 'the-bike-kollective-a8f89',
  storageBucket: 'the-bike-kollective-a8f89.appspot.com',
  messagingSenderId: '225142820895',
  appId: '1:225142820895:web:9232a05b139d743c1b852a',
  measurementId: 'G-TCPV9WSHNH'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);

// basic DB config - feel free to modify
