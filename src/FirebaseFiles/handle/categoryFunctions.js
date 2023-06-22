import { firestore } from '../FirebaseSetup'
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    where,
    query,
} from 'firebase/firestore'
import { errorNotify } from '../../utils'

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
            .catch(() => {
                errorNotify('Error updating category')
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
            errorNotify('Error Updating category')
        }
    }

    getAllCategory() {
        return getDocs(categoryCollectionRef)
    }
}

export default new CategoryService()
