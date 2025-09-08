import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZd4RxMdNU8R69yr9XHWgBq1Ng2X2gnoI",
  authDomain: "todo-app-e18c1.firebaseapp.com",
  projectId: "todo-app-e18c1",
  storageBucket: "todo-app-e18c1.firebasestorage.app",
  messagingSenderId: "875961136682",
  appId: "1:875961136682:web:0013dcf71a8edf50947553",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
