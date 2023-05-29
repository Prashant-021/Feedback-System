export interface User {
    profilepicture: string | ArrayBuffer | null,
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface currentUser {
    Email: string,
    password: string
}

export interface RootState {
    user: {
        userList: User[],
        currentUser: currentUser
    }
}

export interface ComponentData {
    id: number;
    contentValue: IQuestion;
}

export interface option {
    id: number;
    optionValue: string;
}
export interface IQuestion {
    questionTitle: string;
    type: string;
    options?: option[];
}
export interface IFormTemplate {
    title: string;
    description: string;
    questions: IQuestion[]
}