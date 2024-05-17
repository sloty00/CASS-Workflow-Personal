// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// Initialize Firebase Authentication and get a reference to the service
export { auth };