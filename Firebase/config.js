import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBUPYjkzllyT4cBd6D0z519E1jhULYv7Zo",
  authDomain: "itstechbabua.firebaseapp.com",
  projectId: "itstechbabua",
  storageBucket: "itstechbabua.appspot.com",
  messagingSenderId: "527963271380",
  appId: "1:527963271380:web:acadcc3febb933f362cb41",
  measurementId: "G-Z1RGEM8WRL"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }



