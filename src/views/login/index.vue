<template>
  <div class="login-container">
    <div class="login-heard"></div>
    <!--el-form表单组件里 每个表单项必须使用 el-form-item组件包裹 -->
    <!-- 配置form表单验证:
    1.el-form组件动态绑定model为表单数据对象
    2.给表单项绑定prop属性   prop属性值指定表单对象中的数据名称
    3.给el-form组件 设置rules属性配置验证规则
    手动触发表单验证:
    1.给el-form组件设置 ref属性 属性值可随意起名字(不重复即可)
    2.通过ref获取el-form组件,调用组件validate方法进行验证-->
    <el-form
      ref="login-form"
      :model="user"
      class="login-form"
      :rules="formRules">
      <el-form-item
        prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item
      prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
         <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loginLoading" class="login-btn" type="primary" @click="onlogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false// 是否同意协议
      },
      // checked: false, // 是否同意协议选中状态
      loginLoading: false, // 登录的loading状态
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'change' },
          { pattern: /^1[3|5|8|7|9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'change' }
        ],
        // 自定义效验规则
        // validator对应的值是个函数有三个参数 (rule,value,callback) => {}
        // 参数rule代表的是验证字段 agree的验证规则(一般用不到)
        // 参数value代表是否选中的状态 返回布尔值
        // 判断value的状态
        // 验证通过:callback()
        // 验证失败: callback里new一个错误对象 callback(new Error('错误信息'))
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意协议'))
              }
            },
            message: '请同意协议',
            trigger: blur
          }
        ]
      }
    }
  },
  methods: {
    onlogin () {
      // 获取表单数据
      // const user = this.user
      // 表单验证
      // validate方法是异步的
      this.$refs['login-form'].validate(vali => {
        // vali得到的是布尔值

        // 如果表单验证失败,停止请求提交
        if (!vali) {
          return
        }
        // 验证通过,提交登录请求
        this.loginIn()
      })
    },
    loginIn () {
      // 请求封装成函数 放到专门模块
      // 后期好管理维护,重复使用度高
      login(this.user).then(res => {
        // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 登录成功 关闭loading
        this.loginLoading = false
        // 跳转到首页
        this.$router.push({
          name: 'home'
        })
        // 本地存储token
        window.localStorage.setItem('token', JSON.stringify(res.data.data.token))
        // console.log(res)
      }).catch(err => {
        // 登录失败
        console.log('登录失败', err)
        this.$message.error('登录失败,手机号或验证码错误')
        // // 登录失败 关闭loading
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
