<template>
  <el-container class="layout-container">
    <!-- 侧边导航栏 -->
    <el-aside width="200px" class="aside">
      <app-aside />
    </el-aside>
    <el-container>
       <!-- 顶部导航栏 -->
      <el-header class="header">Header</el-header>
      <!-- 内容部分 -->
      <el-main class="main">
        <!-- 子路由渲染出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style scoped lang="less">
.aside {
  background-color: #002033;
}
.header {
  background-color: #ccc;
}
.main {
  background-color: #bbb;
}
.layout-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}
</style>
