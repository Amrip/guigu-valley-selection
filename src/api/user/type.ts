// 登录接口需要携带的参数ts类型
export interface loginFrom {
  username: string;
  password: string;
}

// 登录接口返回的数据ts类型
interface dataType {
  token: string;
}
export interface loginResponseData {
  code: number;
  data: dataType;
}
// 用户信息返回的数据ts类型
interface userInfo{
    userId:number,
    avatar:string,
    username:string,
    password:string,
    desc:string,
    roles:string[],
    buttons:string[],
    routes:string[],
    token:string

}
interface user{
    checkUser:userInfo
}
export interface userInfoResponseData{
    code:number
    data:user
}
