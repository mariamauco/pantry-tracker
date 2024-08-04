// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore';// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANJnSa9_wW-ubOC2A8-4eFX-Gftm6VR7g",
  authDomain: "pantry-tracker-ed5df.firebaseapp.com",
  projectId: "pantry-tracker-ed5df",
  storageBucket: "pantry-tracker-ed5df.appspot.com",
  messagingSenderId: "883120607090",
  appId: "1:883120607090:web:74f5a60c858ceb771d57eb",
  measurementId: "G-S3RFRPT6NT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export { firestore };