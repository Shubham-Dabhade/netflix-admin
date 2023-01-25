import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "netflix-79c36.firebaseapp.com",
    projectId: "netflix-79c36",
    storageBucket: "netflix-79c36.appspot.com",
    messagingSenderId: "493744335824",
    appId: "1:493744335824:web:0d6a3046c4be0603c627d5",
    measurementId: "G-BJF7NNL6ZG"
};

//initailizing the application

const storage = getStorage(initializeApp(firebaseConfig));

export default storage;