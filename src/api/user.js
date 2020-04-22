// 用户相关请求模块

// 用户登录
import request from '@/utils/request'
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // 配置post请求体
    data
  })
}
