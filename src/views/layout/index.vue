<template>
  <div class="layout-container">
      <!-- 顶部导航栏开始 -->
      <div>顶部导航栏</div>
      <!-- 顶部导航栏结束 -->
      <!--子路由(首页)出口 -->
      <router-view></router-view>
      <!-- 侧边导航栏开始 -->
      <div>侧边导航栏</div>
      <!-- 侧边导航栏结束 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
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

<style scoped lang="less"></style>
