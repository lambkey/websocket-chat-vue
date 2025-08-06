import ChatPage from '@/pages/ChatPage.vue'
import Login from '../pages/Login.vue'

// 通过npm i vue-router，引入路由相关函数
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import { AxiosError } from 'axios'
import { ElMessage } from 'element-plus'

// 创建路由实例
const router = createRouter({
    history: createWebHistory(), // 路由的工作模式
    routes: [
        {
            path: '/',
            redirect: '/login'
        }
        ,
        {
            path: '/login',
            component: Login
        },
        {
            path: '/chat',
            component: ChatPage,
            meta:{requiresAuth: true} // 需要登录才能访问
        }
    ]
})

// 添加路由拦截器
// 1. vue2版本的一般用next()来放行或拦截,只需要在beforeEach中调用next()即可，router.beforeEach(async (to, from,next) => {})
// 2. vue3版本的路由拦截器需要返回一个布尔值或一个路由对象
router.beforeEach(async (to, from) => {
    // 有两种情况:
   // 1. 如果后台用的是session来管理登录状态，则需要请求后台去检查登录状态
   // 2. 如果用的是token来管理登录状态，则需要检查本地是否有token

   // 当前项目是用session去管理登录状态的，所以需要请求后台去检查登录状态
  if (to.meta.requiresAuth) {
    try {
      const response = await axios.get("/auth/checkLoginStatus", { withCredentials: true });
      if (response.data.code === 200) {
        return true; // 放行
      } else {
        return { path: "/login" }; // 跳转登录
      }
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      ElMessage.error(axiosError.response?.data?.message || '登录状态检查失败');

      return { path: "/login" };
    }
  } else {
    return true; // 放行
  }
});

export{
    router
}