export default {
  data () {
    return {
      userList: [],
      total: 0,
      pagenum: 1,
      pagesize: 3,

      searchText: '',

      dialogEditFormVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },

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
          message: '用户名长度在3-12个字符',
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
          message: '密码长度在6-12个字符',
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
      }
    }
  },

  created () {
    this.getUsers()
  },

  methods: {
    // 获取用户列表
    async getUsers (pagenum = 1, query = '') {
      try {
        const res = await this.$http.get('/users', {
          params: {
            query,
            pagenum,
            pagesize: 3
          }
        })

        if (res.data.meta.status === 200) {
          this.userList = res.data.data.users
          this.total = res.data.data.total
          // console.log(this.total)
          this.pagenum = res.data.data.pagenum
        }
      } catch (e) {
        this.$routers.push('/login')
        localStorage.removeItem('token')
      }
    },

    // 点击分页
    changePage (curPage) {
      this.getUsers(curPage, this.searchText)
    },

    // 改变用户状态
    async changeUserState (user) {
      try {
        const res = await this.$http.put(`/users/${user.id}/state/${user.mg_state}`, null)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg,
            duration: 1000
          })
        }
      } catch (e) {
        this.$message({
          type: 'warning',
          message: e,
          duration: 1000
        })
      }
    },

    // 显示编辑用户模态框
    showEditUser (user) {
      this.dialogEditFormVisible = true
      for (var key in this.editForm) {
        this.editForm[key] = user[key]
      }
    },

    // 编辑用户
    async editUser () {
      const {
        id,
        email,
        mobile
      } = this.editForm
      try {
        const res = await this.$http.put(`users/${id}`, {
          email,
          mobile
        })
        this.dialogEditFormVisible = false
        if (res.data.meta.status === 200) {
          this.getUsers(1, this.searchText)
          this.$message({
            type: 'success',
            message: res.data.meta.msg,
            duration: 1000
          })
        }
      } catch (error) {
        this.$message({
          type: 'success',
          message: error,
          duration: 1000
        })
      }
    },

    // 显示添加用户模态框
    showAddMask () {
      this.dialogAddFormVisible = true
    },

    // 隐藏添加用户模态框
    async hideAddMask () {
      try {
        await this.$refs.aa.validate()
        const res = await this.$http.post('users', this.addForm)
        if (res.data.meta.status === 201) {
          this.dialogAddFormVisible = false
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
          this.getUsers(1, this.searchText)
        }
      } catch (error) {}
    },

    // 搜索用户
    searchUser () {
      this.getUsers(1, this.searchText)
    },

    // 删除用户
    async deleteUser (user) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await this.$http.delete(`users/${user.id}`)
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.getUsers(1, this.searchText)
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        }
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },

    // 重置表单
    resetForm () {
      this.$refs.aa.resetFields()
    }
  }
}
