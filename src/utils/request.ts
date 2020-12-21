import axios from 'axios'
import { getToken } from '@/utils/auth'
import store from '@/store'
// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:3000/api/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    store.commit('setLoading', true)
    // 设置token
    if (store.getters.token) {
      config.headers.Authorization = 'Basic ' + getToken()
    }
    let url = config.url
    // get参数编码
    if (config.method === 'get' && config.params) {
      url += '?'
      const keys = Object.keys(config.params)
      for (const key of keys) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
      url = url?.substring(0, url.length - 1)
      config.params = {}
    }
    config.url = url
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    store.commit('setLoading', false)
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (response.status >= 400) {
      return Promise.reject(res.msg || 'Error')
    } else {
      return res
    }
  },
  async error => {
    return Promise.reject(error)
  }
)

export default service
