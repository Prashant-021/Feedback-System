import { auth, firestore } from '../FirebaseSetup'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { errorNotify, successNotify } from '../../utils'
import { createUserWithEmailAndPassword } from 'firebase/auth'
const userCollectionRef = collection(firestore, 'User')

class UserService {
    createUser(user) {
        console.log(user)
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((res) => {
                console.log(res.user)
                successNotify('User created successfully')
                return true
                // updateProfile(user, {
                //     displayName: user.name,
                // })
            })
            .catch((err) => {
                errorNotify(err.message)
                return false
            })
    }

    async verifyUser(user) {
        try {
            const querySnapshot = await getDocs(
                query(userCollectionRef, where('Email', '==', user.Email))
            )

            if (querySnapshot.empty) {
                errorNotify('User not found')
                return { isValid: false, data: 'User Not Found' }
            }
            const userData = querySnapshot.docs[0].data()
            if (userData.Password !== user.password) {
                errorNotify('Invalid password')
                return { isValid: false, data: 'Invalid password' }
            }

            return { isValid: true, data: userData }
        } catch (err) {
            errorNotify(err)
        }
    }

    async getUser(userEmail) {
        try {
            const querySnapshot = await getDocs(
                query(userCollectionRef, where('Email', '==', userEmail))
            )
            return querySnapshot.docs[0].data()
        } catch (err) {
            errorNotify(err)
        }
    }
}
export default new UserService()
