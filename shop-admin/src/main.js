// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 请求拦截器
axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token')
  // 所有请求之前都要执行的操作
  return config
})

// 响应拦截器
// axios.interceptors.response.use((response) => {
//   console.log('请求拦截器2')
//   // 所有请求完成后都要执行的操作
//   return response
// }, (error) => {
//   // 错误处理
//   return Promise.reject(error)
// })

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
