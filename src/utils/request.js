import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000,
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  }
})

// http请求拦截器
service.interceptors.request.use(config => {
  const { accessToken } = store.getters
  if (accessToken) config.headers['Authorization'] = accessToken
  return config
}, error => {
  return Promise.reject(error)
})

// http响应拦截器
service.interceptors.response.use(response => {
  const res = response.data
  const message = res.message
  if (res.result) {
    return res
  } else {
    // token过期重新登录
    if (message === 'TOKEN_NOT_EMPTY' || message === 'INVALID_TOKEN') {
      store.dispatch('setLoginStatus', 0)
      // 重新登录
      window.location.reload()
    }
    if (!message) return
    Message.error(message)
    return Promise.reject(res)
  }
}, error => {
  const errorString = error.toString()
  if (errorString.includes('timeout')) {
    Message.error('接口请求超时')
  } else if (errorString.includes('Network Error')) {
    Message.error('网络故障，请稍后再试')
  }
  return Promise.reject(error)
})

export default service
