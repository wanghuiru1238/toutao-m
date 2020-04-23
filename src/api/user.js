// 用户相关请求模块
// 除了登录接口 其他请求接口必须要携带token才能获取数据

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
// 获取用户信息
export const getUserProfile = data => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    // 设置请求头,携带token数据
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTkxMDc3NzEsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.dXP72qoDgtLgc7PaQjWkAlS7Y3xhFrqgV71TWcn8j1E'
    }
  })
}
