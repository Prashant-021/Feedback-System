import { type Id, toast } from 'react-toastify'

export const getDate = (dateTime: Date): string => {
    return `${dateTime.getDate()}/${
        dateTime.getMonth() + 1
    }/${dateTime.getFullYear()}`
}

export const successNotify = (message: string): Id =>
    toast.success(message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
    })

export const errorNotify = (message: string): Id =>
    toast.error(message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
    })

export const truncate = (str: string, len: number): string => {
    if (str.length > len) {
        if (len <= 3) {
            return str.slice(0, len - 3) + '...'
        } else {
            return str.slice(0, len) + '...'
        }
    } else {
        return str
    }
}
