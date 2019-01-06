export default {
  created () {
    this.getUsersList()
  },

  data () {
    return {
      userList: [],
      total: 0,
      pagenum: 1,
      pagesize: 3,

      searchText: '',

      dialogAddFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },

      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 12,
          message: '用户名长度为3-12个字符',
          trigger: 'blur'
        }
        ],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 12,
          message: '密码长度为6-12个字符',
          trigger: 'blur'
        }
        ],
        email: [{
          pattern: /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
          message: '邮箱格式不正确',
          trigger: 'blur'
        }],
        mobile: [{
          pattern: /^1(3|4|5|7|8)\d{9}$/,
          message: '手机格式不正确',
          trigger: 'blur'
        }]
      },

      dialogEditFormVisible: false,
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      }
    }
  },

  methods: {
    // 获取用户列表
    async getUsersList (pagenum = 1, query = '') {
      try {
        const res = await this.$http.get('http://localhost:8888/api/private/v1/users', {
          params: {
            query,
            pagenum,
            pagesize: 3
          }
        })
        if (res.data.meta.status === 200) {
          this.userList = res.data.data.users
          this.total = res.data.data.total
          this.pagenum = res.data.data.pagenum
        }
      } catch (e) {
        this.$router.push('/login')
        localStorage.removeItem('token')
        // console.log('token失效')
      }
    },

    // 分页切换
    changePage (curPage, query) {
      this.getUsersList(curPage, query)
    },

    // 改变用户状态
    async changeUserState (user) {
      const url = `http://localhost:8888/api/private/v1/users/${user.id}/state/${user.mg_state}`
      try {
        const res = await this.$http.put(url, null)
        if (res.data.meta.status === 200) {
          this.$message({
            message: res.data.meta.msg,
            type: 'success',
            duration: 1000
          })
        }
      } catch (e) {
        this.$message({
          message: e,
          type: 'warning',
          duration: 1000
        })
      }
    },

    // 显示添加模态框
    showAddMask () {
      this.dialogAddFormVisible = true
    },

    // 将数据渲染在模态框中
    async hideAddUser () {
      try {
        await this.$refs.addFormRef.validate()
        this.dialogAddFormVisible = false
        const res = await this.$http.post('/users', this.addForm)
        if (res.data.meta.status === 201) {
          this.getUsersList(1, this.searchText)
          this.$message({
            type: 'success',
            message: res.data.meta.msg,
            duration: 1000
          })
        }
      } catch (e) {
        this.$message({
          type: 'error',
          message: e,
          duration: 1000
        })
      }
    },

    // 隐藏添加模态框
    hideAddMask () {
      this.$refs.addFormRef.resetFields()
    },

    // 显示编辑模态框
    showEditMask (user) {
      this.dialogEditFormVisible = true
      // console.log(user)

      for (var key in this.editForm) {
        this.editForm[key] = user[key]
      }
      // this.editForm.username = user.username
      // this.editForm.email = user.email
      // this.editForm.mobile = user.mobile
      // this.editForm.id = user.id
    },

    // 隐藏编辑模态框
    async hideEditMask () {
      try {
        const {
          id,
          email,
          mobile
        } = this.editForm
        const res = await this.$http.put(`users/${id}`, {
          email,
          mobile
        })
        if (res.data.meta.status === 200) {
          this.getUsersList(1, this.searchText)
          this.dialogEditFormVisible = false
        }
      } catch (e) {
        this.$message({
          type: 'error',
          message: e,
          duration: 1000
        })
      }
    },

    // 删除用户
    async delUser (user) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        const res = await this.$http.delete(`users/${user.id}`)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }

        this.getUsersList(1, this.searchText)
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    }
  }
}
