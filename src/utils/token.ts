// 封装一个函数:对本地存储的TOKEN进行操作
export const SET_TOKEN = (token:string) => {
    localStorage.setItem("TOKEN",token)
}

export const GET_TOKEN = () => {
    return localStorage.getItem('TOKEN')
}

export const REMOVE_TOKEN = () => {
    localStorage.removeItem('TOKEN')
}