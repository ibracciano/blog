// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3j3qYR7p5wzhQlRKkSSLSzSPvl14EDYw",
  authDomain: "myblog-8ce35.firebaseapp.com",
  projectId: "myblog-8ce35",
  storageBucket: "myblog-8ce35.appspot.com",
  messagingSenderId: "550573313893",
  appId: "1:550573313893:web:10c56bc1f0bf596919db8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()