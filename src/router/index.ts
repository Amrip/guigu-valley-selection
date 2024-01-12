import {createRouter,createWebHistory} from 'vue-router'
import {constantRoutes} from './routes'
// 创建路由器
let router = createRouter({
    // 路由模式:hash
    history:createWebHistory(),
    // 路由配置
    routes:constantRoutes,
    // 滚动行为
    scrollBehavior () {
        return {
            left:0,
            top:0
        }
    }
})

export default router