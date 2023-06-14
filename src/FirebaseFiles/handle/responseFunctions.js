import { firestore } from '../FirebaseSetup'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'

const formCollectionRef = collection(firestore, 'FormResponse')
class FormResponseService {
    addResponse = (newform) => {
        return addDoc(formCollectionRef, newform)
    }

    getAllResponse = (categoryType) => {
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
}

export default new FormResponseService()
