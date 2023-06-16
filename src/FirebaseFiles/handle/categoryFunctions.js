import { firestore } from '../FirebaseSetup'
import {
    collection,
    addDoc,
    // doc,
    updateDoc,
    deleteDoc,
    getDocs,
    // query,
    // where,
    // getDoc,
    where,
    query,
    // getDoc,
} from 'firebase/firestore'

const categoryCollectionRef = collection(firestore, 'Category')
class CategoryService {
    addCategory(newCategory) {
        return addDoc(categoryCollectionRef, newCategory)
    }

    async updateCategory(categoryId, updatedField) {
        const categoryQuery = query(
            categoryCollectionRef,
            where('id', '==', categoryId)
        )
        return getDocs(categoryQuery)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    updateDoc(doc.ref, updatedField)
                })
            })
            .catch((error) => {
                console.error('Error updating category:', error)
            })
    }

    async deleteCategory(categoryId) {
        const categoryQuery = query(
            categoryCollectionRef,
            where('id', '==', categoryId)
        )
        try {
            const querySnapshot = await getDocs(categoryQuery)
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref)
            })
        } catch (error) {
            console.error('Error Updating category:', error)
        }
    }

    getAllCategory() {
        return getDocs(categoryCollectionRef)
    }
}

export default new CategoryService()
