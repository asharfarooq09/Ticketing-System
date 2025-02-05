import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNBLwNCrzHt1ZBB5r6UJWK9W-53dL3HdU",
  authDomain: "ticketing-crm-865bc.firebaseapp.com",
  projectId: "ticketing-crm-865bc",
  storageBucket: "ticketing-crm-865bc.firebasestorage.app",
  messagingSenderId: "668427969506",
  appId: "1:668427969506:web:5c37d0d570209652214fbb",
  measurementId: "G-9JDPYWYN0M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);