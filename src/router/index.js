import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'

Vue.use(VueRouter)

const routes = [
  // 登录路由
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 首页路由
  {
    path: '/',
    name: 'home',
    component: Home
  }
]
const router = new VueRouter({
  routes
})

export default router
