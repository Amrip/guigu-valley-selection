// 路由守卫
import setting from "@/setting";
import nprogress from 'nprogress'
import router from ".";
import 'nprogress/nprogress.css'
import useUserStore from "@/store/modules/user";
import pinia from "@/store";
let userStore = useUserStore(pinia)

router.beforeEach(async (to:any,from:any,next:any)=>{
    nprogress.start()
    const token = userStore.token
    const username = userStore.username
    // 路由鉴权
    if(token){
        if(to.path=="/login"){
            next("/home")
        }else{
            if(username){
                next()
            }else{
                // 如果没有用户信息，这里就进行获取
                try{
                    // 获取用户信息
                    await userStore.userInfo()
                    next()
                }catch(error){
                    // token过期
                    await userStore.userLogout()
                    next({path:'/login',query:{redirect:to.path}})
                }
            }
        }
    }else{
        if(to.path=='/login'){
            next()
        }else{
            next({path:'/login',query:{redirect:to.path}})
        }
    }
})

router.afterEach((to:any,from:any,next:any)=>{
    nprogress.done()
    document.title = `${setting.title}-${to.meta.title}`
})