import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2_DtN9uI9JYju91WUNjCShSqcVlBMxa8",
  authDomain: "expo-60dfb.firebaseapp.com",
  databaseURL: "https://expo-60dfb-default-rtdb.firebaseio.com",
  projectId: "expo-60dfb",
  storageBucket: "expo-60dfb.appspot.com",
  messagingSenderId: "199896276276",
  appId: "1:199896276276:web:77eaf6d0ba45bc3a085961",
  measurementId: "G-V696HBZRL8",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
