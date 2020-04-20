import axios from 'axios'

// 创建axios实例去发请求,把需要的配置 配置给这个实例来处理
const request = axios.create({
  // 请求的基础路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 导出请求方法
export default request
