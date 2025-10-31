// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDL9pJIy5FeVVOGelQFzYQhckHWYmmEqaU",
    authDomain: "wowai-4469e.firebaseapp.com",
    projectId: "wowai-4469e",
    storageBucket: "wowai-4469e.firebasestorage.app",
    messagingSenderId: "345924456364",
    appId: "1:345924456364:web:086ca01cec2eaa8df0f409",
    measurementId: "G-K2HVETQ0Z4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);