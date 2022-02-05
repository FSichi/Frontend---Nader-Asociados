import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA0j_QSOeAqzgeXqqdSr0I7wB9d1lbDeQE",
  authDomain: "nader---system.firebaseapp.com",
  projectId: "nader---system",
  storageBucket: "nader---system.appspot.com",
  messagingSenderId: "943656183087",
  appId: "1:943656183087:web:dad55792104caad4286dda"
};


firebase.initializeApp(firebaseConfig);

// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  firebase
}