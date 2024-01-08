import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { zhCn } from 'element-plus/es/locales.mjs'
import 'virtual:svg-icons-register'
const app = createApp(App)
app.use(ElementPlus,{locale:zhCn})
console.log(import.meta.env)

app.mount('#app')
