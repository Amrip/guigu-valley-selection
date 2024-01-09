// 引用项目中的全部全局组件
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
// 全局对象
const allGlobalComponent = {SvgIcon,Pagination};

// 暴露
export default{
    // 一定要叫做install方法
    install(app){
        Object.keys(allGlobalComponent).forEach(key=>(
            app.component(key,allGlobalComponent[key])
        ))
    }
}