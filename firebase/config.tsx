// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDRvToZeMmzwEj_6_ugenBxPvgtjVUZGVs",
    authDomain: "the-bike-kollective-a8f89.firebaseapp.com",
    projectId: "the-bike-kollective-a8f89",
    storageBucket: "the-bike-kollective-a8f89.appspot.com",
    messagingSenderId: "225142820895",
    appId: "1:225142820895:web:9232a05b139d743c1b852a",
    measurementId: "G-TCPV9WSHNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { app, auth, createUserWithEmailAndPassword };