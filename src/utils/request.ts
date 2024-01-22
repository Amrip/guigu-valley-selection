// 进行axios的二次封装：使用请求与响应拦截器
import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
// 利用axios对象的create方法，去创建axios实例（request == axios 只不过request带了个拦截器）
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径携带/api
  timeout: 5000,
});
// 第二步：request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  let userStore = useUserStore();
  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  return config; // 一定要返回config对象
});
// 第三步：响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log(response);
    // 成功的回调
    // 简化数据
    return response.data;
  },
  (error) => {
    // 失败的回调
    // 存储网络错误信息
    let message = "";
    let status = error.response.status;
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "无权力访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器出错";
        break;
      default:
        message = "网络出错";
        break;
    }
    ElMessage({
      type: "error",
      message,
    });
    return Promise.reject(error);
  },
);

export default request;
