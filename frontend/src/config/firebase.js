// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-yoga.firebaseapp.com",
  projectId: "mern-yoga",
  storageBucket: "mern-yoga.appspot.com",
  messagingSenderId: "557009665158",
  appId: "1:557009665158:web:e7e2452d5b72a11e556507"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
