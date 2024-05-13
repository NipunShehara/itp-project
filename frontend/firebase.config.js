// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsLR9Ex-Lh2SH39R0UTtjJvf7r21Za4Sg",
  authDomain: "fitplex-e9b72.firebaseapp.com",
  projectId: "fitplex-e9b72",
  storageBucket: "fitplex-e9b72.appspot.com",
  messagingSenderId: "709971603322",
  appId: "1:709971603322:web:922d7f235caf7d1c8b30c3",
  measurementId: "G-RGDNSEG7Y5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);