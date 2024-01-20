import {defineStore} from 'pinia'
import type {loginFormData,responseData,loginResponseData,userInfoResponseData} from "@/api/user/type"
import {reqLogin,reqUserInfo,reqLogout} from "@/api/user"
import type { UserState } from './type'
import { SET_TOKEN,GET_TOKEN,REMOVE_TOKEN } from '@/utils/token'
import { constantRoutes } from '@/router/routes'
let useUserStore = defineStore('User',{
    // 数据
    state:() :UserState=>{
        return{
            token:GET_TOKEN(), // 用户唯一标识
            menuRoutes:constantRoutes, // 存储生成菜单需要的路由(vue-router自动获取)
            username:'',
            avatar:'',
        }
    },
    // 异步/逻辑
    actions:{
        // 1.登录方法：发请求->根据请求成功与否保存token/请求失败
        async userLogin(data:loginFormData){
            let result:loginResponseData = await reqLogin(data);
            console.log(result)
            if(result.code == 200){ // 成功200 -> 持久化存储token
                // 保存TOKEN 本地+pinia
                this.token = (result.data as string) // 进行一个断言，确定为string类型
                SET_TOKEN((result.data as string))
                // 返回普通值，保证resolved状态
                return 'success'
            } else {
                // 返回reject状态
                return Promise.reject(new Error(result.message))
            }
        },
        // 2. 获取用户信息：发请求
        async userInfo(){
            let result:userInfoResponseData = await reqUserInfo();
            if(result.code==200){
                this.username = result.data.name
                this.avatar = result.data.avatar
                return 'success'
            }else{
                return Promise.reject(new Error(result.message))
            }
        },
        async userLogout(){
            let result:responseData = await reqLogout();
            console.log(result)
            if(result.code==200){
                this.token = ''
                this.username = ''
                this.avatar = ''
                REMOVE_TOKEN()
                return 'success'
            }else{
                return Promise.reject(new Error(result.message))
            }

        },
    },
    getters:{

    }

})

export default useUserStore