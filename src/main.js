import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 加载element组件库
import ElementUI from 'element-ui'

// 加载element组件库样式
import 'element-ui/lib/theme-chalk/index.css'

// 全局样式文件
import './styles/index.less'

// 全局注册element组件库
Vue.use(ElementUI)

Vue.config.productionTip = false

// 创建vue实例
new Vue({
  // router配置到跟市里
  router,
  // 通过render方法吧App根组件渲染到#app入口节点
  render: h => h(App)
}).$mount('#app')
