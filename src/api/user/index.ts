// 统一管理用户相关的接口
import request from '@/utils/request'
import type { loginResponseData,userInfoResponseData } from './type';
enum API{
    LOGIN_URL="/user/login",
    USERINFO_URL="/user/info"
}
// 登录接口方法
export const reqLogin = (data:any)=>request.post<any,loginResponseData>(API.LOGIN_URL,data);
// 后去用户信息接口方法
export const reqUserInfo = () => request.get<any,userInfoResponseData>(API.USERINFO_URL);