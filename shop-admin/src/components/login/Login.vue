<template>
  <div class="login">
    <el-row type="flex"
            justify="center"
            align="middle"
            class="login-row">
      <el-col :xs="24"
              :sm="12"
              :md="10"
              :lg="8"
              :xl="6"
              class="login-col">
        <el-form :model="loginForm"
                 label-position="top"
                 :rules="rules"
                 ref="loginForm"
                 label-width="100px"
                 class="demo-loginForm">
          <el-form-item label="用户名"
                        prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('loginForm')">登录</el-button>
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
          { min: 3, max: 12, message: '用户名长度为3-12个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度为6-12个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm (formName) {
      try {
        await this.$refs[formName].validate()
        const res = await this.$http.post('/login', this.loginForm)
        if (res.data.meta.status === 200) {
          const token = res.data.data.token
          localStorage.setItem('token', token)
          this.$router.push('/home')
        } else {
          const msg = res.data.meta.msg
          this.$message({
            message: msg,
            type: 'error',
            duration: 1000
          })
        }
      } catch (e) { }
      // console.log(this.$refs[formName])
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.login {
  height: 100%;
  background-color: #2d434c;
}
.login-row {
  height: 100%;
}
.login-col {
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 10px;
}
</style>
