import firebase from 'firebase/app'
import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyB9GIl-Ly1ydCOP73R0_lf66KBG3vL4THo",
    authDomain: "vets-135da.firebaseapp.com",
    projectId: "vets-135da",
    storageBucket: "vets-135da.appspot.com",
    messagingSenderId: "369745506058",
    appId: "1:369745506058:web:9b958c77984b97c0c154f3"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)