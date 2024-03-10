import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdkUykf_qv6Qe2G4JIUu-S6JgWmmzolGI",
  authDomain: "dsahub-8012c.firebaseapp.com",
  projectId: "dsahub-8012c",
  storageBucket: "dsahub-8012c.appspot.com",
  messagingSenderId: "603666521036",
  appId: "1:603666521036:web:cc51ee6e2f2d4923f45b69",
  measurementId: "G-6Z57E8Y8W1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);