import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB1JTMOtU6jbU3hrkWLHwj6vQw3k7BX7Dc",
  authDomain: "thesmophoria-8e438.firebaseapp.com",
  databaseURL: 'https://thesmophoria-8e438-default-rtdb.firebaseio.com/',
  projectId: "thesmophoria-8e438",
  storageBucket: "thesmophoria-8e438.appspot.com",
  messagingSenderId: "408759522088",
  appId: "1:408759522088:web:d3da851c962a8fdcd8361d",
  measurementId: "G-SDMXCH1NY1"
}


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const firestore = getFirestore(app)

const auth = getAuth(app)

const storage = getStorage(app)
const database = getDatabase(app);


export { app, firestore, storage, auth,database }




