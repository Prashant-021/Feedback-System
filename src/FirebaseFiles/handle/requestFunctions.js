import { firestore } from '../FirebaseSetup'
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    getDocs,
    getDoc,
} from 'firebase/firestore'

const formCollectionRef = collection(firestore, 'Form')
class FormService {
    addNewForm = (newform) => {
        return addDoc(formCollectionRef, newform)
    }

    updateform = (id, updatedform) => {
        const formDoc = doc(firestore, 'Form', id)
        return updateDoc(formDoc, updatedform)
    }

    deleteform = (id) => {
        const formDoc = doc(firestore, 'Form', id)
        return deleteDoc(formDoc)
    }

    getAllForms = () => {
        return getDocs(formCollectionRef)
    }

    getForm = (id) => {
        const formDoc = doc(firestore, 'Form', id)
        return getDoc(formDoc)
    }
}

export default new FormService()
