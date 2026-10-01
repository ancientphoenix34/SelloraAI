// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "selloraai-ff0f5.firebaseapp.com",
  projectId: "selloraai-ff0f5",
  storageBucket: "selloraai-ff0f5.firebasestorage.app",
  messagingSenderId: "388305122609",
  appId: "1:388305122609:web:7df6eb2a96eb015aff2c10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export {auth,provider}
