/* eslint-disable @typescript-eslint/explicit-function-return-type */
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

    getAllResponse = async (categoryType) => {
        if (categoryType.length > 0) {
            const categoryQuery = query(
                formCollectionRef,
                where('categoryName', '==', categoryType)
            )
            return await getDocs(categoryQuery)
        } else {
            return await getDocs(formCollectionRef)
        }
    }
}

export default new FormResponseService()
