import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "smart-alarm-1d278.firebaseapp.com",
  databaseURL: "https://smart-alarm-1d278-default-rtdb.firebaseio.com",
  projectId: "smart-alarm-1d278",
  storageBucket: "smart-alarm-1d278.appspot.com",
  messagingSenderId: "881904480662",
  appId: "1:881904480662:web:f6708856fa905d506e2db7",
  measurementId: "G-6JE2Y4TSCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };