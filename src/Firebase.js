import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAR0VPcX6971XxrvEq1RM1CC4bQBbhdS-U",
    authDomain: "retro-tx3.firebaseapp.com",
    databaseURL: "https://retro-tx3.firebaseio.com",
    projectId: "retro-tx3",
    storageBucket: "retro-tx3.appspot.com",
    messagingSenderId: "965895599352"
  };
export default firebase.initializeApp(config);