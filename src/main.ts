import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

// 引入定义的路由
import { router } from './router'


createApp(App).use(router).use(ElementPlus).mount('#app')

console.log('环境',import.meta.env.VITE_NODE_ENV)
console.log('服务端',import.meta.env.VITE_VUE_APP_INTERFACE_URL)
