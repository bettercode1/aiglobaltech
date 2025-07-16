import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcwi7yljNWToU41ftFYSQAMdpeU1-lr3k",
  authDomain: "aiglobaltech-54f9b.firebaseapp.com",
  projectId: "aiglobaltech-54f9b",
  storageBucket: "aiglobaltech-54f9b.appspot.com",
  messagingSenderId: "235603460575",
  appId: "1:235603460575:web:b08c1b3237312a6122846a",
  measurementId: "G-FD26RYFJW8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }; 