import Login from '../pages/Login.vue'

// 通过npm i vue-router，引入路由相关函数
import { createRouter, createWebHistory } from 'vue-router'

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
        }
    ]
})

export{
    router
}