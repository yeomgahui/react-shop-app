// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1tSYXwnlckvg59JFwFnQ4fRWfW8xyKXE",
  authDomain: "react-shop-app-74302.firebaseapp.com",
  projectId: "react-shop-app-74302",
  storageBucket: "react-shop-app-74302.appspot.com",
  messagingSenderId: "184487913573",
  appId: "1:184487913573:web:b3d6e285264ee8c75f7e8c",
  measurementId: "G-CEF68R607P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
