// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIsRnIIrs1w4wMZNllmgTZZT_n6uasSlw",
  authDomain: "formula-one-f9ae6.firebaseapp.com",
  projectId: "formula-one-f9ae6",
  storageBucket: "formula-one-f9ae6.firebasestorage.app",
  messagingSenderId: "878107935535",
  appId: "1:878107935535:web:a74b95858debb3364497da",
  measurementId: "G-X6RQPJ44JE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);