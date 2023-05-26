// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYFBvBGuKZa7q0pVohnYptHQ0jpW_ylYw",
  authDomain: "prueba-admin-c25fd.firebaseapp.com",
  projectId: "prueba-admin-c25fd",
  storageBucket: "prueba-admin-c25fd.appspot.com",
  messagingSenderId: "322746053173",
  appId: "1:322746053173:web:8d761030f9c1e1791c777c",
  measurementId: "G-W506LKH9VV"
};


// Initialize Firebase
export const appFirestore = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirestore);