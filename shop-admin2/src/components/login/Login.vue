<template>
  <div class="login">
  <el-row class="login-form" type="flex" justify="center" align="middle">
    <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
      <el-form :model="loginForm" :rules="rules"
      ref="loginForm" label-width="100px" label-position="top">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '用户名长度在3-12个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度在6-12个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('http://localhost:8888/api/private/v1/login', this.loginForm).then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              localStorage.setItem('token', res.data.data.token)
              this.$router.push('/home')
            } else {
              const msg = res.data.meta.msg
              this.$message({
                showClose: true,
                message: msg,
                type: 'error',
                duration: 1000
              })
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
  .login-form{
    height: 100%;
  }
  .login{
    height: 100%;
    background-color: #2D434C;
  }
  .el-form{
    padding: 30px 20px;
    background-color: #fff;
    border-radius: 10px;
    min-width: 380px;
  }
</style>
