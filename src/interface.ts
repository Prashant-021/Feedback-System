export interface IUser {
    profilepicture: string | ArrayBuffer | null
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface currentUser {
    Email: string
    password: string
}

export interface RootState {
    user: {
        userList: IUser[]
        currentUser: currentUser
    }
    category: {
        category: ICategory[]
    }
    form: {
        form: IFormTemplate[]
    }
}

export interface ComponentData {
    id: number
    contentValue: IQuestion
}

export interface Ioption {
    id: string
    optionValue: string
}
export interface IQuestion {
    questionTitle: string
    type: string
    options?: Ioption[]
}
export interface IFormTemplate {
    id: string
    title: string
    description: string
    categoryName: string
    questions: IQuestion[]
}

export interface ICategory {
    title: string
    description: string
    createdDate: string
}
