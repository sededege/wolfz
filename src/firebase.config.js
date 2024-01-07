import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAiD7okVxGHrQ9dMLCWNftJSk51ON6hK-U",
  authDomain: "bookingapp-cb68d.firebaseapp.com",
  databaseURL: "https://bookingapp-cb68d-default-rtdb.firebaseio.com",
  projectId: "bookingapp-cb68d",
  storageBucket: "bookingapp-cb68d.appspot.com",
  messagingSenderId: "781865375376",
  appId: "1:781865375376:web:9a69ff6a0a9e71e4abea15",
  measurementId: "G-P8HNJTC70Z"
}


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const firestore = getFirestore(app)

const auth = getAuth(app)

const storage = getStorage(app)
const database = getDatabase(app);


export { app, firestore, storage, auth,database }




