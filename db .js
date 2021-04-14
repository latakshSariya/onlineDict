import * as firebase from 'firebase';
require ('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyCinlcTVxODoMgRkNdenJGQumSq6iQR6C8",
    authDomain: "online-library-ff0e3.firebaseapp.com",
    projectId: "online-library-ff0e3",
    storageBucket: "online-library-ff0e3.appspot.com",
    messagingSenderId: "927011207669",
    appId: "1:927011207669:web:8b39f992456bca6aef08bc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();