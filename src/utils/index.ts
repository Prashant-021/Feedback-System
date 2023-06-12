import { type Id, toast } from 'react-toastify'

export const getDate = (dateTime: Date): string => {
    return `${dateTime.getDate()}-${
        dateTime.getMonth() + 1
    }-${dateTime.getFullYear()}`
}

export const successNotify = (message: string): Id =>
    toast.success(message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    })
