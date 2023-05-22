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