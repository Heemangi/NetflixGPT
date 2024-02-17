// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtfOIS2Uv_38yIRsQugDiybiB41fu33C4",
  authDomain: "netflixgpt-8367b.firebaseapp.com",
  projectId: "netflixgpt-8367b",
  storageBucket: "netflixgpt-8367b.appspot.com",
  messagingSenderId: "40370454447",
  appId: "1:40370454447:web:65e40723d97e34fc45395a",
  measurementId: "G-JS6YXWNLP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();