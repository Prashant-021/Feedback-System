import { firestore } from '../FirebaseSetup'
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    getDocs,
    // getDoc,
    where,
    query,
} from 'firebase/firestore'

const formCollectionRef = collection(firestore, 'Form')
class FormService {
    addNewForm = (newform) => {
        return addDoc(formCollectionRef, newform)
    }

    updateForm = async (fieldId, updatedForm) => {
        const formsCollectionRef = collection(firestore, 'Form')
        const queryForm = query(formsCollectionRef, where('id', '==', fieldId))
        return getDocs(queryForm).then((querySnapshot) => {
            const formDoc = querySnapshot.docs[0]
            if (formDoc) {
                const formRef = doc(firestore, 'Form', formDoc.id)
                return updateDoc(formRef, updatedForm)
            }
            throw new Error('Form not found')
        })
    }

    deleteForm = async (fieldId) => {
        const queryForm = query(formCollectionRef, where('id', '==', fieldId))
        return getDocs(queryForm).then((querySnapshot) => {
            const formDoc = querySnapshot.docs[0]
            if (formDoc) {
                const formRef = doc(firestore, 'Form', formDoc.id)
                return deleteDoc(formRef)
            }
            throw new Error('Form not found')
        })
    }

    getAllForms = (categoryType) => {
        if (categoryType && categoryType !== 'All') {
            const categoryQuery = query(
                formCollectionRef,
                where('categoryName', '==', categoryType)
            )
            return getDocs(categoryQuery)
        } else {
            return getDocs(formCollectionRef)
        }
    }

    getForm = async (id) => {
        const queryForm = query(formCollectionRef, where('id', '==', id))
        const querySnapshot = await getDocs(queryForm)

        if (querySnapshot.empty) {
            throw new Error('Form not found')
        }

        const formDoc = querySnapshot.docs[0]
        const formData = formDoc.data()
        return formData
    }
}

export default new FormService()
