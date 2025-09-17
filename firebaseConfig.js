// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYWetpl0hmeoiihYcp75drgmBXNLRcvh4",
  authDomain: "mobile-app-g---tracker.firebaseapp.com",
  projectId: "mobile-app-g---tracker",
  storageBucket: "mobile-app-g---tracker.appspot.com",
  messagingSenderId: "74055334087",
  appId: "1:74055334087:web:667642adfff368c4d2a6e2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
