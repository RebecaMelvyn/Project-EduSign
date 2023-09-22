// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDk3kqN8cUV_fwX6RUQ4kyBst1rLcm8D2I",
  authDomain: "edu-sign.firebaseapp.com",
  projectId: "edu-sign",
  storageBucket: "edu-sign.appspot.com",
  messagingSenderId: "35955217607",
  appId: "1:35955217607:web:b42419a0d32ac3ed5a5ae2"
};

const app = initializeApp(firebaseConfig);  // Utilisez initializeApp pour initialiser Firebase

// Utilisez Firebase Firestore comme vous le faites déjà
const db = getFirestore();
const auth = getAuth();  // Assurez-vous d'initialiser auth correctement

// Exportez auth et db si nécessaire
export { auth, db };

export default app;