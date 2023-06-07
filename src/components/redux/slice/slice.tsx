import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {
    type IUser,
    type ICategory,
    type IFormTemplate,
} from '../../../interface'

interface UserState {
    userList: IUser[]
}
interface CategoryState {
    category: ICategory[]
}

interface FormState {
    form: IFormTemplate[]
}

const userInitialState: UserState = {
    userList: JSON.parse(localStorage.getItem('userList') ?? '[]'),
}

const categoryInitialState: CategoryState = {
    category: JSON.parse(localStorage.getItem('Category') ?? '[]'),
}

const formInitialState: FormState = {
    form: JSON.parse(localStorage.getItem('Forms') ?? '[]'),
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
            localStorage.setItem('Category', JSON.stringify(state.category))
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            const titleToDelete = action.payload
            const updatedCategory = state.category.filter(
                (category) => category.title !== titleToDelete
            )
            state.category = updatedCategory
            localStorage.setItem('Category', JSON.stringify(state.category))
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

            state.category = updatedCategory
            localStorage.setItem('Category', JSON.stringify(state.category))
        },
    },
})

const formSlice = createSlice({
    name: 'form',
    initialState: formInitialState,
    reducers: {
        addForm: (state, action: PayloadAction<IFormTemplate>) => {
            const formIndex = state.form.findIndex(
                (form) => form.id === action.payload.id
            )
            if (formIndex === -1) {
                const newForm = action.payload
                state.form = [...state.form, newForm]
            } else {
                state.form = state.form.map((form, index) => {
                    if (index === formIndex) {
                        return action.payload
                    }
                    return form
                })
            }
            localStorage.setItem('Forms', JSON.stringify(state.form))
        },
        deleteForm: (state, action: PayloadAction<string>) => {
            const idToDelete = action.payload
            const updatedForm = state.form.filter(
                (form) => form.id !== idToDelete
            )
            state.form = updatedForm
            localStorage.setItem('Forms', JSON.stringify(state.form))
        },
    },
})

export const { addUser } = userSlice.actions
export const { addCategory, deleteCategory, updateCategory } =
    categorySlice.actions
export const { addForm, deleteForm } = formSlice.actions

export const userReducer = userSlice.reducer
export const categoryReducer = categorySlice.reducer
export const formReducer = formSlice.reducer
