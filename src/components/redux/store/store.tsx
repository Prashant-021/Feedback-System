import { configureStore } from '@reduxjs/toolkit'
import { categoryReducer, formReducer, userReducer } from '../slice/slice'

const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoryReducer,
        form: formReducer,
    },
})

export default store
