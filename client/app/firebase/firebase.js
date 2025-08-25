// app/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC-t-YcECSnKn056uGjo0UTZm_0PUT8Zk4",
  authDomain: "quiz-whiz-mobile.firebaseapp.com",
  projectId: "quiz-whiz-mobile",
  storageBucket: "quiz-whiz-mobile.firebasestorage.app",
  messagingSenderId: "1093621110583",
  appId: "1:1093621110583:android:92e8b27cbcb7717389ecb2"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Auth with persistent storage using AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore instance
export const db = getFirestore(app);

// Storage instance
export const storage = getStorage(app);

export default app;
