import { firestore } from '../FirebaseSetup'
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    getDocs,
    getDoc,
    where,
    query,
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

    getAllForms = (categoryType) => {
        if (categoryType) {
            const categoryQuery = query(
                formCollectionRef,
                where('categoryName', '==', categoryType)
            )
            return getDocs(categoryQuery)
        } else {
            return getDocs(formCollectionRef)
        }
    }

    getForm = (id) => {
        const formDoc = doc(firestore, 'Form', id)
        return getDoc(formDoc)
    }
}

export default new FormService()
