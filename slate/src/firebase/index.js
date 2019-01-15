import firebase from 'firebase/app';
import 'firebase/storage';
// import 'firebase/database';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDwgqkGFiR_C7XZKPPH-uLWTSNfby1ypX0",
    authDomain: "slate-sp2.firebaseapp.com",
    databaseURL: "https://slate-sp2.firebaseio.com",
    projectId: "slate-sp2",
    storageBucket: "",
    messagingSenderId: "161480593949"
};

firebase.initializeApp(config);

const slateStorage = firebase.storage();
// const slateDatabase = firebase.database();


export {
    slateStorage, firebase as default
}