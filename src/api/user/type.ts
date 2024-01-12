// 登录接口需要携带的参数ts类型（请求）
export interface loginFormData {
  username: string,
  password: string
}

// 登录接口返回的数据ts类型（响应）
interface dataType {
  token?: string, // 返回token时，成功
  message?: string // 返回message时，失败
}
export interface loginResponseData {
  code: number;
  data: dataType;
}
// 用户信息返回的数据ts类型（响应）
interface userInfo {
  userId: number,
  avatar: string,
  username: string,
  password: string,
  desc: string,
  roles: string[],
  buttons: string[],
  routes: string[],
  token: string
}
interface user {
  checkUser: userInfo
}
export interface userInfoResponseData {
  code: number,
  data: user
}
