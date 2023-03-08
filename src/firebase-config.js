// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyCU9BT4wiSU5R6MZo4zb-C366HcHGABiAI",
        authDomain: "dev-project-1bd2e.firebaseapp.com",
        databaseURL: "https://dev-project-1bd2e-default-rtdb.firebaseio.com",
        projectId: "dev-project-1bd2e",
        storageBucket: "dev-project-1bd2e.appspot.com",
        messagingSenderId: "291303310128",
        appId: "1:291303310128:web:815b3adeb714d75c093ef5",
        measurementId: "G-3N7VVDMFT3"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = getStorage(firebaseApp);

export {db, auth, storage, firebaseApp};

