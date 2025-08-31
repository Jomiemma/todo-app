// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZd4RxMdNU8R69yr9XHWgBq1Ng2X2gnoI",
  authDomain: "todo-app-e18c1.firebaseapp.com",
  projectId: "todo-app-e18c1",
  storageBucket: "todo-app-e18c1.firebasestorage.app",
  messagingSenderId: "875961136682",
  appId: "1:875961136682:web:0013dcf71a8edf50947553",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
