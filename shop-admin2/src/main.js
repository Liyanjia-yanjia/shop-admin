import Vue from 'vue'
import App from './App'

import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/css/common.css'

import axios from 'axios'
Vue.prototype.$http = axios

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token')
  // 所有请求之前都要执行的操作
  return config
})

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
