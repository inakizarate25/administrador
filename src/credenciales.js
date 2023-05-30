// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxCqBPHb84bJdBnTFzXDE1dw5_YuxQQ6Q",
  authDomain: "crud-d1392.firebaseapp.com",
  projectId: "crud-d1392",
  storageBucket: "crud-d1392.appspot.com",
  messagingSenderId: "520850259541",
  appId: "1:520850259541:web:4d0f6a71fc165051675edc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);