// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp3uLaLpkGBn5Sll1VoeDBpKf6DpKQEUg",
  authDomain: "aliados2go.firebaseapp.com",
  projectId: "aliados2go",
  storageBucket: "aliados2go.firebasestorage.app",
  messagingSenderId: "394758914023",
  appId: "1:394758914023:web:c91a1760861976cb240742",
  measurementId: "G-W2RV8KMXN7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
