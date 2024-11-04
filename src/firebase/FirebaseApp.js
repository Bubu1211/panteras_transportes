// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDocs, getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoJUqZWTxazIDMyIrfs_m53Yf6TDGbBcI",
  authDomain: "driversync-panterasgapo.firebaseapp.com",
  projectId: "driversync-panterasgapo",
  storageBucket: "driversync-panterasgapo.firebasestorage.app",
  messagingSenderId: "922385709285",
  appId: "1:922385709285:web:99a4ff153c643d1d0efc0c",
  measurementId: "G-CYDJZ0MJ9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app)
//const analytics = getAnalytics(app);

export const usuario = {
    "id": null,
    "uid":null,
    "correo": null,
    "nombres": null,
    "apellidos" : null
}
