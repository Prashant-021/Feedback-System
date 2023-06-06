// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyD-epiU4DAtcE-XvJxDOmVjjJ32V_VAcZE',
    authDomain: 'feedbacksystem-a4aab.firebaseapp.com',
    projectId: 'feedbacksystem-a4aab',
    storageBucket: 'feedbacksystem-a4aab.appspot.com',
    messagingSenderId: '675759489438',
    appId: '1:675759489438:web:f820ae937322de01e4168f',
    measurementId: 'G-LD580G2ZBP',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// eslint-disable-next-line no-unused-vars
export const firestore = getFirestore(app)
