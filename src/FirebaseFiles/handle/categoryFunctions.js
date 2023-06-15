import { firestore } from '../FirebaseSetup'
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    getDocs,
    // query,
    // where,
    // getDoc,
    // where,
    // query,
    // getDoc,
} from 'firebase/firestore'

const categoryCollectionRef = collection(firestore, 'Category')
class CategoryService {
    addCategory(newCategory) {
        return addDoc(categoryCollectionRef, newCategory)
    }

    updateCategory(id, updatedCategory) {
        const categoryDoc = doc(firestore, 'Category', id)
        return updateDoc(categoryDoc, updatedCategory)
    }

    deleteCategory(id) {
        // console.log(id)
        // const formDoc = query(
        //     categoryCollectionRef,
        //     where('title', '===', title)
        // )
        const formDoc = doc(firestore, 'Category', id)
        return deleteDoc(formDoc)
        // return deleteDoc(categoryCollectionRef, data)
    }

    getAllCategory() {
        return getDocs(categoryCollectionRef)
    }
}

export default new CategoryService()
