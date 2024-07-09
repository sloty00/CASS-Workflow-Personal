// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDu-1uddI4jWDCf-NCPbYYd6EK8Ls_aSSs",
  authDomain: "fwcass-9806f.firebaseapp.com",
  projectId: "fwcass-9806f",
  storageBucket: "fwcass-9806f.appspot.com",
  messagingSenderId: "752948780119",
  appId: "1:752948780119:web:01c86775f366b8de7e9712",
  measurementId: "G-DYM7S3043T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };