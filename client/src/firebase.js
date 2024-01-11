// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-29e9f.firebaseapp.com",
  projectId: "mern-blog-29e9f",
  storageBucket: "mern-blog-29e9f.appspot.com",
  messagingSenderId: "368602260233",
  appId: "1:368602260233:web:488a96a8c914e937b5e9d8",
  measurementId: "G-TXW4C6JLPE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);