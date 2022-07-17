import { Message } from '@/components/message'
import axios, { AxiosError } from 'axios'

// 备用接口地址: http://pcapi-xiaotuxian-front-devtest.itheima.net/
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  // baseURL: 'https://apipc-xiaotuxian-front.itheima.net',
  // baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
  timeout: 50000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么

    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError<{ message: string, code: string }>) {
    // 对响应错误做点什么
    if (error.response) {
      // 如果有返回的错误
      Message.error(error.response.data.message)
    } else {
      Message.error('网络超时,请重试')
    }
    return Promise.reject(error)
  }
)

export default instance