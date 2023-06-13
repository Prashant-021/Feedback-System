import { firestore } from '../FirebaseSetup'
import { collection, addDoc, getDocs } from 'firebase/firestore'

const formCollectionRef = collection(firestore, 'FormResponse')
class FormResponseService {
    addResponse = (newform) => {
        return addDoc(formCollectionRef, newform)
    }

    getAllResponse = () => {
        return getDocs(formCollectionRef)
    }
}

export default new FormResponseService()
