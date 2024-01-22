// index.ts 管理接口
// 统一管理用户相关的接口
import request from "@/utils/request";
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
  responseData,
} from "./type";
// 统一管理接口
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  LOGOUT_URL = "/admin/acl/index/logout",
  USERINFO_URL = "/admin/acl/index/info",
}
// 登录接口方法
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);
// 获取用户信息接口方法
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL);
// 退出登录接口方法
export const reqLogout = () => request.post<any, responseData>(API.LOGOUT_URL);
