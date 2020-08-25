import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
require('dotenv').config()


var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN ,
    databaseURL:process.env.REACT_APP_DATABASE_URL,
    projectId:process.env.REACT_APP_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_APP_ID ,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };
  // Initialize Firebase



firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth,provider };

