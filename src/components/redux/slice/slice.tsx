import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type IUser, type ICategory } from '../../../interface'

interface UserState {
  userList: IUser[]
}
interface CategoryState {
  category: ICategory[]
}

const userInitialState: UserState = {
  userList: JSON.parse(localStorage.getItem('userList') ?? '[]')
}

const categoryInitialState: CategoryState = {
  category: JSON.parse(localStorage.getItem('Category') ?? '[]')
}

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      const storedUser: IUser[] = JSON.parse(localStorage.getItem('userList') ?? '[]')
      state.userList.push(action.payload)
      const updatedUser = [...storedUser, action.payload]
      localStorage.setItem('userList', JSON.stringify(updatedUser))
      alert(`Welcome ${action.payload.name}`)
    }
  }
})

const storedCategory: ICategory[] = JSON.parse(localStorage.getItem('Category') ?? '[]')
const categorySlice = createSlice({
  name: 'category',
  initialState: categoryInitialState,
  reducers: {
    addCategory: (state, action: PayloadAction<ICategory>) => {
      state.category.push(action.payload)
      const updatedCategory = [...storedCategory, action.payload]
      localStorage.setItem('Category', JSON.stringify(updatedCategory))
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.category = state.category.filter(
        (category) => category.title !== action.payload
      )
      const updatedCategory = [...state.category]
      localStorage.setItem('Category', JSON.stringify(updatedCategory))
    }
  }
})

export const { addUser } = userSlice.actions
export const { addCategory, deleteCategory } = categorySlice.actions
export const userReducer = userSlice.reducer
export const categoryReducer = categorySlice.reducer

// export const getUser = (state: RootState): IUser[] => state.user.userList
// export const getCategory = (state: RootState): ICategory[] => state.category.categoryList
