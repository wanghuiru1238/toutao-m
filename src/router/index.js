import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'

Vue.use(VueRouter)

const routes = [
  // 登录路由
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 页面公共组件路由 Layout
  {
    path: '/',
    name: 'layout',
    component: Layout,
    // 子路由(首页路由)
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      }
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
