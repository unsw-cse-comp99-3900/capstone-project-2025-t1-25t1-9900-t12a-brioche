// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDL_1VjRu-A2m7g3vkPbfFPRcaLe-0y22U",
  authDomain: "sdg-frontend-brioche.firebaseapp.com",
  projectId: "sdg-frontend-brioche",
  storageBucket: "sdg-frontend-brioche.appspot.com",
  messagingSenderId: "695246093979",
  appId: "1:695246093979:web:6b2ca7eae162c2d4a2d03e",
  measurementId: "G-6WN2GGKX7R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
