import { firestore } from '../FirebaseSetup'
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    updateDoc,
    increment,
} from 'firebase/firestore'

const formCollectionRef = collection(firestore, 'FormResponse')
class FormResponseService {
    addResponse = async (newform) => {
        const responseDocRef = await addDoc(formCollectionRef, newform)
        const formQuery = query(
            collection(firestore, 'Form'),
            where('id', '==', newform.id)
        )
        const formSnapshot = await getDocs(formQuery)

        if (!formSnapshot.empty) {
            const formDocRef = formSnapshot.docs[0].ref
            await updateDoc(formDocRef, { responseCount: increment(1) })
        }

        return responseDocRef
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
