// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyC16mgj1pc0rVGgYTICSIsRg3ZxQRK1o",
  authDomain: "qualified-abode-411319.firebaseapp.com",
  databaseURL: "https://qualified-abode-411319-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qualified-abode-411319",
  storageBucket: "qualified-abode-411319.appspot.com",
  messagingSenderId: "190098194498",
  appId: "1:190098194498:web:238f19d91cd22535a12ddb",
  measurementId: "G-TDJHGGZ5M1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };