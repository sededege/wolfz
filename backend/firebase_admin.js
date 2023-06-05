const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getDatabase, Timestamp, FieldValue } = require('firebase-admin/firestore');

var admin = require("firebase-admin");

var serviceAccount = require("./thesmophoria-8e438-firebase-adminsdk-wtm0c-59777742c6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://thesmophoria-8e438-default-rtdb.firebaseio.com"
});

const db = admin.database();

module.exports= db;