import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { zhCn } from 'element-plus/es/locales.mjs'
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
import '@/styles/index.scss'
import axios from 'axios'
const app = createApp(App)
// 全局组件
app.use(globalComponent)
// ElementPlus
app.use(ElementPlus,{locale:zhCn})
app.mount('#app')

// 测试假接口
axios({
    url:'/api/user/login',
    method:'post',
    data:{
        username:'admin',
        password:'111111'
    }
})
