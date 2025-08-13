import './assets/base.css'
import './assets/main.css'
import './assets/styles/scrollbar.scss'

import { createApp } from 'vue'
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_VUE_APP_INTERFACE_URL
axios.defaults.withCredentials = true

// axios拦截器定义
// 请求拦截器
axios.interceptors.request.use(config => {
  console.log('请求参数',config)
  // 请求前可以做些事情，例如设置token
  return config
},error => {

  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(response => {
  console.log('响应参数',response)

  let {data} = response

  if(data.code === 401){
    router.push('/login')
  }

  if(data.code !== 200){
    ElMessage.error(data.message || '请求w失败'+data.code)
  }

  return response
},error => {
  ElMessage.error(error.message || '请求失败')
  return Promise.reject(error)
})


// 引入定义的路由
import { router } from './router'


createApp(App).use(router).use(ElementPlus).mount('#app')

console.log('环境',import.meta.env.VITE_NODE_ENV)
console.log('服务端',import.meta.env.VITE_VUE_APP_INTERFACE_URL)
