<template>
  <div class="login-container">
    <div class="login-heard"></div>
    <el-form ref="form" :model="user" class="login-form">
      <el-form-item >
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
         <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loginLoading" class="login-btn" type="primary" @click="onlogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: ''// 验证码
      },
      checked: false, // 是否同意协议选中状态
      loginLoading: false// 登录的loading状态
    }
  },
  methods: {
    onlogin () {
      // 获取表单数据
      const user = this.user
      // 表单验证
      this.loginLoading = true
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        // 配置post请求体
        data: user
      }).then(res => {
        // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.loginLoading = false
        console.log(res)
      }).catch(err => {
        // 登录失败
        console.log('登录失败', err)
        this.$message.error('登录失败,手机号或验证码错误')
        this.loginLoading = false
      })
    }
  }
}
</script>
<style>
.login-container {
  position:fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size: cover;
}
.login-heard{
    background: url("./logo_index.png") no-repeat;
    width: 400px;
    height: 87px;
    background-position: center center;
    background-color: #fff;
}
.login-form{
  background-color: #fff;
  padding:0 50px 50px 50px;
  min-width: 300px;
  }
.login-btn{
  width: 100%;
}
</style>
