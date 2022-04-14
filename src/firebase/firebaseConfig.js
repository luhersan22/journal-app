

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//Database
// Congiguration
const firebaseConfig = {
    apiKey: "AIzaSyDKehIex2-JoMZKLe1xnKF7O4at3tUe9Zk",
    authDomain: "react-app-cursos-5f13f.firebaseapp.com",
    projectId: "react-app-cursos-5f13f",
    storageBucket: "react-app-cursos-5f13f.appspot.com",
    messagingSenderId: "620577183593",
    appId: "1:620577183593:web:0116c92e914fd59d060ff8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// referencia de database a firestores
const db = firebase.firestore();

// el provider para poder autenticarse con google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}