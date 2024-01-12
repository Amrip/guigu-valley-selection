import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { zhCn } from 'element-plus/es/locales.mjs'
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
import '@/styles/index.scss'
import pinia from '@/store/index'
// 引入路由
import router from './router'

const app = createApp(App)
// 全局组件
app.use(globalComponent)
// ElementPlus
app.use(ElementPlus,{locale:zhCn})
// 注册模板路由
app.use(router)
// 注册大仓库
app.use(pinia)
app.mount('#app')

