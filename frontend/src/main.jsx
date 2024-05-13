import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import firebase from "firebase/compat/app";
import "firebase/storage"; // Import specific Firebase services if you need them

const firebaseConfig = {
  apiKey: "AIzaSyBsLR9Ex-Lh2SH39R0UTtjJvf7r21Za4Sg",
  authDomain: "fitplex-e9b72.firebaseapp.com",
  projectId: "fitplex-e9b72",
  storageBucket: "fitplex-e9b72.appspot.com",
  messagingSenderId: "709971603322",
  appId: "1:709971603322:web:922d7f235caf7d1c8b30c3",
  measurementId: "G-RGDNSEG7Y5"
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
