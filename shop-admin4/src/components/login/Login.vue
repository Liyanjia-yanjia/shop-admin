<template>
  <div class="login">
    <el-row class="login-row" type="flex" justify="center" align="middle">
      <el-col  class="login-col" :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
        <el-form :model="loginForm" :rules="rules" label-position="top"
        ref="loginForm" label-width="100px" class="demo-loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password"></el-input>
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
          { required: true, message: '请输入用户', trigger: 'blur' },
          { min: 3, max: 12, message: '用户长度为3 - 12个字节', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '用户长度为6 - 12个字节', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm (formName) {
      try {
        await this.$refs[formName].validate()
        const res = await this.axios.post('login', this.loginForm)
        if (res.data.meta.status === 200) {
          localStorage.setItem('token', res.data.data.token)
          this.$router.push('/home')
        } else {
          this.$message({
            type: 'error',
            message: res.data.meta.msg
          })
        }
      } catch (e) {
        return false
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.login{
  height: 100%;
  background-color: #2D434C;
}
.login-row{
  height: 100%;
}
.login-col{
  min-width: 350px;
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 10px;
}
</style>
