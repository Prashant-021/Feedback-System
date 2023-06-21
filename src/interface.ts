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

export interface IFormHeader {
    title: string
    description: string
    categoryName: string
}

export interface ComponentData {
    id: string
    contentValue: IQuestion
}

export interface Ioption {
    id: string
    optionValue: string
}
export interface IQuestion {
    id: string
    questionTitle: string
    type: string
    options: Ioption[]
    required: boolean
    answerValue: string | string[]
}
export interface IFormTemplate {
    id: string
    title: string
    description: string
    categoryName: string
    questions: IQuestion[]
    responseCount: number
}

export interface ICategory {
    id: string
    title: string
    description: string
    createdDate: string
}
