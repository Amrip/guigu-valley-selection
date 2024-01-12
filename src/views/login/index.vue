<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input :prefix-icon="Lock" type="password" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login-btn" type="primary" size="default" :loading="loading" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import {User,Lock} from '@element-plus/icons-vue' // element图标
import {ElNotification} from 'element-plus' // element提示
import {reactive,ref} from 'vue' // vue3
import {useRouter,useRoute} from 'vue-router' // 路由
import useUserStore from '@/store/modules/user' // user pinia
import {getTime} from '@/utils/time' // 时间判断
let useStore = useUserStore();
// 路由
let $router = useRouter();
let $route = useRoute();
// 创建代理对象，收集账号与密码数据（响应式）
let loginForm = reactive({username:'',password:''})
// 加载动画执行与否
let loading = ref(false);
// 获取el-form组件
let loginForms = ref();
// 登录按钮回调
const login = async()=>{
    /*
    点击登录按钮以后干什么?
    通知仓库发登录请求
    请求成功->首页展示数据的地方
    请求失败->弹出登录失败信息
    */
    // 0.保证全部表单相校验通过再发请求(返回了一个Promise对象)
    await loginForms.value.validate();
    // 1.执行按钮加载动画
    loading.value = true;
    // 2.通知仓库发登录请求,判断请求成功与否
    try{
        // 通知仓库发送请求
        await useStore.userLogin(loginForm)
        // 编程式导航跳转到展示数据首页
        let redirect:any = $route.query.redirect
        $router.push({path:redirect||'/'})
        // 登录成功提示信息
        ElNotification({
            type:'success',
            message:'欢迎回来',
            title: `Hi,${getTime()}好`
        })
        loading.value = false
    } catch(error){
        // 登录失败
        loading.value=false
        // 登录失败提示信息
        ElNotification({
            type:'error',
            message:(error as Error).message
        })
    }
}

// 自定义校验规则
// rule:即为校验规则对象
// value:即为表单元素文本内容
// 函数:如果符合条件callBack放行通过即为
// 如果不符合条件callBack方法,注入错误提示信息
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error('账号长度至少五位'));
  }
}

const validatorPassWord = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error('密码长度至少六位'));
  }
}
// 定义表单校验规则
// 规则对象属性:
// required,代表这个字段务必要校验的
// min:文本长度至少多少位
// max:文本长度最多多少位
// message:错误的提示信息
// trigger:触发校验表单的时机 change:文本发生变化触发校验,blur:失去焦点的时候触发校验规则
const rules = {
    username:[
        // 纸老虎，请求还是可以发出去。需要使用自定义校验规则
        // {required:true,min:6,max:10,message:'账号长度至少6位',trigger:'change'}
        {trigger:'change',validator:validatorUserName}
    ],
    password:[
        // 纸老虎，请求还是可以发出去。需要使用自定义校验规则
        // {required:true,min:6,max:15,message:'密码长度至少6位',trigger:'change'}
        {trigger:'change',validator:validatorPassWord}
    ]
}
</script>

<style scoped lang="scss">
.login_container{
    width:100%;
    height:100vh;
    background:url('@/assets/images/background.jpg') no-repeat;
    background-size:cover;
    .login_form{
        position:relative;
        width:80%;
        top:30vh;
        background:url('@/assets/images/login_form.png') no-repeat;
        background-size:cover;
        padding:40px;
        h1{
            color:#fff;
            font-size:40px;
        }
        h2{
            color:#fff;
            font-size:20px;
            margin:20px 0px;
        }
        .login-btn{
            width:100%;
        }
    }
}
</style>