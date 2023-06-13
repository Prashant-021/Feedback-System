import { configureStore } from '@reduxjs/toolkit'
import { categoryReducer, userReducer } from '../slice/slice'

const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoryReducer,
    },
})

export default store
