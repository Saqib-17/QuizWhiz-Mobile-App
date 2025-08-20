import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApkOKlnOoMPdIvNep715mVGrkXSW1lnLQ",
  authDomain: "quiz-whiz-mobile.firebaseapp.com",
  projectId: "quiz-whiz-mobile",
  storageBucket: "quiz-whiz-mobile.firebasestorage.app",
  messagingSenderId: "1093621110583",
  appId: "1:1093621110583:ios:2d9ff15e2e9361d689ecb2"
};

const app = initializeApp(firebaseConfig);

// ✅ Auth with persistent storage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
