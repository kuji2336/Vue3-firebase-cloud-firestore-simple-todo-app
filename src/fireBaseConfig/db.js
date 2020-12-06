import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCmU4v4RhDYp_aJQ8VH1tpIbUw4GwxHgrY",
    authDomain: "todo-ab6fb.firebaseapp.com",
    databaseURL: "https://todo-ab6fb.firebaseio.com",
    projectId: "todo-ab6fb",
    storageBucket: "todo-ab6fb.appspot.com",
    messagingSenderId: "906743588551",
    appId: "1:906743588551:web:4ce767c1cde35df4f240e2",
    measurementId: "G-EJM1T8ED4Z"
  };
 
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();
 /* export const dbRefTodos = db.ref('todos') */
