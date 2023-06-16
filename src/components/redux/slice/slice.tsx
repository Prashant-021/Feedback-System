import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type IUser, type ICategory } from '../../../interface'
import { errorNotify } from '../../../utils'

interface UserState {
    userList: IUser[]
}
interface CategoryState {
    category: ICategory[]
}

const userInitialState: UserState = {
    userList: JSON.parse(localStorage.getItem('userList') ?? '[]'),
}

const categoryInitialState: CategoryState = {
    category: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        addUser: (state, action: PayloadAction<IUser>): void => {
            const newUser = action.payload
            const updatedUser = [...state.userList, newUser]
            state.userList = updatedUser
            localStorage.setItem('userList', JSON.stringify(state.userList))
        },
    },
})

const categorySlice = createSlice({
    name: 'category',
    initialState: categoryInitialState,
    reducers: {
        addCategory: (state, action: PayloadAction<ICategory>) => {
            const newCategory = action.payload
            const updatedCategory = [...state.category, newCategory]
            state.category = updatedCategory
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload
            state.category = state.category.filter(
                (category) => category.id !== idToDelete
            )
        },
        updateCategory: (state, action: PayloadAction<ICategory>) => {
            const updatedCategory = state.category.map((category) => {
                if (category.id === action.payload.id) {
                    return {
                        ...category,
                        title: action.payload.title,
                        description: action.payload.description,
                    }
                }
                return category
            })

            const categoryExists = state.category.some(
                (category) => category.title === action.payload.title
            )

            if (!categoryExists) {
                state.category = updatedCategory
            } else {
                console.log('error')
                errorNotify('Category already exists')
            }
        },
        setInitialCategory: (state, action: PayloadAction<ICategory[]>) => {
            state.category = action.payload
        },
    },
})

export const { addUser } = userSlice.actions
export const {
    addCategory,
    deleteCategory,
    updateCategory,
    setInitialCategory,
} = categorySlice.actions

export const userReducer = userSlice.reducer
export const categoryReducer = categorySlice.reducer
