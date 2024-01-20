// 登录接口需要携带的参数ts类型（请求）
export interface loginFormData {
  username: string,
  password: string
}

// 所有接口响应都有的数据类型
export interface responseData{
  code:number,
  message:string,
  ok:boolean
}

// 登录接口返回的数据ts类型（响应）
export interface loginResponseData extends responseData {
  data: string;
}
export interface userInfoResponseData extends responseData {
  data: {
    routes:string[]
    button:string[]
    roles:string[]
    name:string
    avatar:string
  }
}
