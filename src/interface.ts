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
}

export interface ComponentData {
    id: number
    contentValue: IQuestion
}

export interface Ioption {
    id: number
    optionValue: string
}
export interface IQuestion {
    questionTitle: string
    type: string
    options?: Ioption[]
}
export interface IFormTemplate {
    title: string
    description: string
    questions: IQuestion[]
}

export interface ICategory {
    title: string
    description: string
    createdDate: string
}
