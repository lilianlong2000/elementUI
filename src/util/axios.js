import axios from 'axios'
import qs from 'qs'
import { ElLoading, ElMessage } from 'element-plus'

// const BASEURL = 'http://127.0.0.1:8081'
// axios.defaults.baseURL = BASEURL
const _axios = axios.create({
  baseURL: 'http://127.0.0.1:8081',
})
_axios.defaults.timeout = 50000

let loading = null
_axios.interceptors.request.use(
  function (config) {
    console.log(config)
    if (config.url == '/login' || config.url == '/register') {
      console.log(111)
      loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      setTimeout(() => {
        loading.close()
      }, 500)
      return config
    }
    loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    const token = localStorage.getItem('token')
    if (!token) {
      ElMessage({
        type: 'warning',
        message: '未获取本地token',
        duration: 500,
      })
    }
    setTimeout(() => {
      loading.close()
    }, 500)
    if (config.method === 'post') {
      let data = qs.parse(config.data)
      console.log(config.data)
      config.data = qs.stringify({
        token: token,
        ...data,
      })
    } else if (config.method === 'get') {
      config.params = {
        token: token,
        ...config.params,
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  function (response) {
    loading.close()
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default _axios
