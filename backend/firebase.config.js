import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAWJk4LoUYb2a6s8QfO-X87vEaE-3Nd2cE",
  authDomain: "chat-app-1f283.firebaseapp.com",
  projectId: "chat-app-1f283",
  storageBucket: "chat-app-1f283.appspot.com",
  messagingSenderId: "258246920513",
  appId: "1:258246920513:web:df90d6e0bf7416eb9d79c0",
  measurementId: "G-HXQFFE74EP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);