import axios from 'axios'

// 创建axios实例去发请求,把需要的配置 配置给这个实例来处理
const request = axios.create({
  // 请求的基础路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 请求拦截器 所有请求会经过
request.interceptors.request.use(
  function (config) {
    console.log(config)
    // config是当前请求的相关配置信息  return 前可修改
    const token = JSON.parse(window.localStorage.getItem('token'))
    // 有登录用户信息 统一token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

// 导出请求方法
export default request
