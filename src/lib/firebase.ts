// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import * as dotenv from 'dotenv';
dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log(process.env.NEXT_PUBLIC_API_KEY);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_API_KEYAUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_API_KEYDATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_API_KEYPROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_API_KEYSTORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_API_KEYMESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_API_KEYAPP_ID,
  measurementId: process.env.NEXT_PUBLIC_API_KEYMEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };