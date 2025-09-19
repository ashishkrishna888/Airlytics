import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// You'll need to replace these with your actual Firebase project config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA2R3gkPjqc7hN3i7dYGJKOXdmYM4k7-Lg",
    authDomain: "aura-sense-hq.firebaseapp.com",
    projectId: "aura-sense-hq",
    storageBucket: "aura-sense-hq.firebasestorage.app",
    messagingSenderId: "780309848886",
    appId: "1:780309848886:web:20f8bfc58be3904e3b0997",
    measurementId: "G-WBLMK57BYN"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Test Firebase initialization
console.log('Firebase initialized successfully:', {
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId
});

export default app;
