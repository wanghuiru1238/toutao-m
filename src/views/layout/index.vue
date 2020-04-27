<template>
  <el-container class="layout-container">
    <!-- 侧边导航栏 -->
    <el-aside class="aside" width="auto">
      <!-- 侧边导航路由渲染出口 -->
      <app-aside :is-collapse="isCollapse" class="aside-menu"></app-aside>
    </el-aside>
    <el-container>
       <!-- 顶部导航栏 -->
      <el-header class="header">
        <!-- 顶部导航-左侧-网站名称 -->
        <div>
          <i
          @click="isCollapse=!isCollapse"
          :class="{
            'el-icon-s-fold':isCollapse,
            'el-icon-s-unfold':!isCollapse
            }"></i>
          <span>江苏传智播客科技教育有限公司</span>
        </div>
        <!-- 顶部导航-右侧-用户信息 -->
        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="">
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right">
            </i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">
               <i class="el-icon-s-tools"></i>
               个人设置</el-dropdown-item>
            <el-dropdown-item
            command="b"
            @click.native="loginout">
              <i class="el-icon-unlock"></i>
              退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
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
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user: {}, // 当前用户登录信息
      isCollapse: true // 侧边栏展示状态
    }
  },
  computed: {},
  watch: {},
  // 初始化时请求加载
  created () {
    // 组件初始化 请求获取用户资料
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        // console.log(res)
        this.user = res.data.data
      })
    },
    loginout () {
      this.$confirm('请确认是否退出', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        // 点击退出清除登录信息token
        window.localStorage.removeItem('token')
        // 跳转到登录页面
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>
<style scoped lang="less">
.aside {
  background-color: #002033;
  .aside-menu {
    height: 100%;
  }
}
.header {
  border-bottom: 1px solid #cccccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// .main {
//   background-color: #bbb;
// }
.layout-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}
.avatar-wrap {
  display: flex;
  align-items: center;
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
