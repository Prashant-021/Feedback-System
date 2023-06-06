import { addDoc, collection } from '@firebase/firestore'
import { firestore } from '../firebase_setup/firebase'
import { type IFormTemplate, type ICategory, type IUser } from '../interface'

const handleSubmit = async (
    Data: IUser | ICategory | IFormTemplate,
    collectionName: string
): Promise<void> => {
    const ref = collection(firestore, `${collectionName}`)

    const data = {
        Data,
    }

    try {
        await addDoc(ref, data)
    } catch (err) {
        console.log(err)
    }
}

export const handleSubmitAction = handleSubmit
