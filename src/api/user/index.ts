// index.ts 管理接口
// 统一管理用户相关的接口
import request from '@/utils/request'
import type { loginFormData,loginResponseData,userInfoResponseData } from './type';
// 统一管理接口
enum API{
    LOGIN_URL="/user/login",
    USERINFO_URL="/user/info"
}
// 登录接口方法
export const reqLogin = (data:loginFormData)=>request.post<any,loginResponseData>(API.LOGIN_URL,data);
// 获取用户信息接口方法
export const reqUserInfo = () => request.get<any,userInfoResponseData>(API.USERINFO_URL);