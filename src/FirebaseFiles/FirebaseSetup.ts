import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
import { getAuth } from '@firebase/auth'
const firebaseConfig = {
    apiKey: 'AIzaSyD-epiU4DAtcE-XvJxDOmVjjJ32V_VAcZE',
    authDomain: 'feedbacksystem-a4aab.firebaseapp.com',
    projectId: 'feedbacksystem-a4aab',
    storageBucket: 'feedbacksystem-a4aab.appspot.com',
    messagingSenderId: '675759489438',
    appId: '1:675759489438:web:f820ae937322de01e4168f',
    measurementId: 'G-LD580G2ZBP',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()

export { auth }
export const firestore = getFirestore(app)
