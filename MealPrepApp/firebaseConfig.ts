// ./MealPrepApp/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // For Realtime Database (optional: for Firestore, use getFirestore)
import { getFirestore } from 'firebase/firestore'; // For Firestore if using that

// Your Firebase configuration details
const firebaseConfig = {
  apiKey: "AIzaSyBd_0J6Q_VhnFjRA0UjLvVTWhyZjr10ZY0",
  authDomain: "mealprepapp-1a0ae.firebaseapp.com",
  databaseURL: "https://mealprepapp-1a0ae-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mealprepapp-1a0ae",
  storageBucket: "mealprepapp-1a0ae.appspot.com",
  messagingSenderId: "429106749576",
  appId: "1:429106749576:web:6a6ba5875ef96d55613f3d",
  measurementId: "G-BZT9HBP2KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database or Firestore based on your choice
export const database = getDatabase(app); // For Realtime Database
export const firestore = getFirestore(app); // For Firestore (if needed)
