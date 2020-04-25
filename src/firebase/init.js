// Your web app's Firebase configuration
import firebase from 'firebase'
import firestore from 'firebase/firestore'
var firebaseConfig = {
    apiKey: "AIzaSyD3ublay8JY2jiFGN4EofZXwAWIEw-lLls",
    authDomain: "udemy-ninja-smoothies-efcee.firebaseapp.com",
    databaseURL: "https://udemy-ninja-smoothies-efcee.firebaseio.com",
    projectId: "udemy-ninja-smoothies-efcee",
    storageBucket: "udemy-ninja-smoothies-efcee.appspot.com",
    messagingSenderId: "1017773356022",
    appId: "1:1017773356022:web:0c8f92b0c8ac874eb68dd7"
  };
  // Initialize Firebase
  const firebaseapp = firebase.initializeApp(firebaseConfig);

  export default firebaseapp.firestore()