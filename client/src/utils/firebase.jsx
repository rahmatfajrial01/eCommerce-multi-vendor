// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-1511a.firebaseapp.com",
    projectId: "mern-auth-1511a",
    storageBucket: "mern-auth-1511a.appspot.com",
    messagingSenderId: "840989335867",
    appId: "1:840989335867:web:ca6cbcd24ee65d7fc6971e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);