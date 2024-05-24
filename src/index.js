import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyARwIIxDFyN_Qx2JHLdLJjVWhSnn-U-sWA",
  authDomain: "arduino-ti5.firebaseapp.com",
  databaseURL: "https://arduino-ti5-default-rtdb.firebaseio.com",
  projectId: "arduino-ti5",
  storageBucket: "arduino-ti5.appspot.com",
  messagingSenderId: "1026824030016",
  appId: "1:1026824030016:web:c368404d5d43c0fd1e9ca5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

ReactDOM.render(<App />, document.getElementById('root'));
