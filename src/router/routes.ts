// 对外暴露配置路由
export const constantRoutes = [
  // 登录
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"), // 路由懒加载
    name: "login", //命名路由
  },
  // 登录成功后数据展示
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
    name: "layout",
  },
  // 404
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
  },
  // 任意路由：上面都没有匹配上就匹配到这个任意路由（直接重定向到404）
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
  },
];
