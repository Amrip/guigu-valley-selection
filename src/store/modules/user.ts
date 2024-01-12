import {defineStore} from 'pinia'
import type {loginFormData,loginResponseData,userInfoResponseData} from "@/api/user/type"
import {reqLogin,reqUserInfo} from "@/api/user"
import type { UserState } from './type'
import { SET_TOKEN,GET_TOKEN,REMOVE_TOKEN } from '@/utils/token'
let useUserStore = defineStore('User',{
    // 数据
    state:() :UserState=>{
        return{
            token:GET_TOKEN()
        }
    },
    // 异步/逻辑
    actions:{
        // 1.登录方法：发请求->根据请求成功与否保存token/请求失败
        async userLogin(data:loginFormData){
            let result:loginResponseData = await reqLogin(data);
            if(result.code == 200){ // 成功200 -> 持久化存储token
                // 保存TOKEN 本地+pinia
                this.token = (result.data.token as string) // 进行一个断言，确定为string类型
                SET_TOKEN((result.data.token as string))
                // 返回普通值，保证resolved状态
                return 'ok'
            } else {
                // 返回reject状态
                return Promise.reject(new Error(result.data.message))
            }
        }
    },
    getters:{

    }

})

export default useUserStore