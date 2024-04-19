// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARwIIxDFyN_Qx2JHLdLJjVWhSnn-U-sWA",
  authDomain: "arduino-ti5.firebaseapp.com",
  databaseURL: "https://arduino-ti5-default-rtdb.firebaseio.com",
  projectId: "arduino-ti5",
  storageBucket: "arduino-ti5.appspot.com",
  messagingSenderId: "1026824030016",
  appId: "1:1026824030016:web:c368404d5d43c0fd1e9ca5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app