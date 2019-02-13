import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDwgqkGFiR_C7XZKPPH-uLWTSNfby1ypX0",
    authDomain: "slate-sp2.firebaseapp.com",
    databaseURL: "https://slate-sp2.firebaseio.com",
    projectId: "slate-sp2",
    storageBucket: "slate-sp2.appspot.com",
    messagingSenderId: "161480593949"
  };

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;