// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyAq0K6iEaBF12bimpDA_bWedzRa-f-qhSU",
  authDomain: "mindmatters-f0c04.firebaseapp.com",
  projectId: "mindmatters-f0c04",
  storageBucket: "mindmatters-f0c04.appspot.com",
  messagingSenderId: "90697707288",
  appId: "1:90697707288:web:03376d4c874c9ef11bf86d",
  measurementId: "G-WV838VVXXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
const db = getFirestore(app);