import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD6yaSVvKRSTG9cBMJuVCfljceCC53YW9s",
    authDomain: "itc-project-46faf.firebaseapp.com",
    projectId: "itc-project-46faf",
    storageBucket: "itc-project-46faf.firebasestorage.app",
    messagingSenderId: "99549773232",
    appId: "1:99549773232:web:f45f9c0da6b49b5adbea75",
    measurementId: "G-R23TJGNGF7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;