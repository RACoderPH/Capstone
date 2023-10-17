import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAq0K6iEaBF12bimpDA_bWedzRa-f-qhSU",
    authDomain: "mindmatters-f0c04.firebaseapp.com",
    projectId: "mindmatters-f0c04",
    storageBucket: "mindmatters-f0c04.appspot.com",
    messagingSenderId: "90697707288",
    appId: "1:90697707288:web:03376d4c874c9ef11bf86d",
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  export default storage;