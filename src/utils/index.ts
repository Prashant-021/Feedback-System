export const getDate = (dateTime: Date): string => {
    return `${dateTime.getDate()}-${
        dateTime.getMonth() + 1
    }-${dateTime.getFullYear()}`
}
