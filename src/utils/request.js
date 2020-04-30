import axios from 'axios'
import Jsonbigint from 'json-bigint'

// 创建axios实例去发请求,把需要的配置 配置给这个实例来处理
const request = axios.create({
  // 请求的基础路径
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 后端返回的原始数据(deta)处理
  transformResponse: [function (data) {
    // return data;(data是未经处理的原始数据)
    // 后端返回的可能不是json格式字符串 使用Jsonbigint.pars会报错
    // 因此使用try cath来捕获异常 处理异常发生
    try {
      // 转换成功 返回结果
      return Jsonbigint.parse(data)
    } catch (err) {
      // 转换失败 返回原始的数据
      return data
    }
  }]
})
// 请求拦截器 所有请求会经过
request.interceptors.request.use(
  function (config) {
    // console.log(config)
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
