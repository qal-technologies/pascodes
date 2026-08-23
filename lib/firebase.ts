import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlJtVWcEZZP3VtGss57lVilh9ohDZZ3Gc",
  authDomain: "pascodes-web.firebaseapp.com",
  projectId: "pascodes-web",
  storageBucket: "pascodes-web.firebasestorage.app",
  messagingSenderId: "5630854707",
  appId: "1:5630854707:web:45a848df90e88e94634546",
  measurementId: "G-7HLWTH0S59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);