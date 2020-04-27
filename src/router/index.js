import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'

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
    // 命名路由layout,有 默认子路由时,此时配置的路由名字没有意义(会有警告)
    // 注意:如果有默认子路由时,就不需要给父路由起名字
    // name: 'layout',
    component: Layout,
    // 子路由(首页中间部分路由)
    children: [
      {
        // 默认子路由只能有一个,其他子路由还要正常写path路径
        path: '', // 子路由的path为空时,会作为 默认子路由渲染(渲染到父路由出口)
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      }
    ]
  }
]
const router = new VueRouter({
  routes
})
// 路由导航守卫(导航拦截器)
router.beforeEach((to, from, next) => {
  const token = JSON.parse(window.localStorage.getItem('token'))
  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    // 如果有token 代表已登录
    if (token) {
      next()
    } else {
      // 没有token 跳转到登录页面
      next('/login')
    }
  } else {
    next()
  }
})

export default router
