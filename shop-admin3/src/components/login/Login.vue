<template>
  <div class="login">
  <el-row type="flex" justify="center" align="middle" class="login-row">
  <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6" class="login-col">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px"
    class="login-form" label-position="top">
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
import axios from 'axios'
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
          { min: 3, max: 8, message: '用户名长度为 3 到 8 个字节', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '用户名长度为 6 到 12 个字节', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8888/api/private/v1/login', this.loginForm).then((res) => {
            console.log(res)
            if (res.data.meta.status === 200) {
              localStorage.setItem('token', res.data.data.token)
              this.$router.push('/home')
            } else {
              this.$message({
                type: 'error',
                message: res.data.meta.msg
              })
            }
          })
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
  .login{
    background-color: #2D434C;
    height: 100%;
  }
  .login-row{
    height: 100%;
  }
  .login-col{
    padding: 30px 20px;
    border-radius: 10px;
    background-color: #fff;
    min-width: 300px;
  }

</style>
