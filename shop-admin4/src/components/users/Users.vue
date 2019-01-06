<template>
  <div>
    <el-table
      :data="userList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机"
        width="180">
      </el-table-column>
      <el-table-column label="用户状态" width="250">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="changeUserState(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
        <el-row>
          <el-button type="primary" plain icon="el-icon-edit" ></el-button>
          <el-button type="danger" plain icon="el-icon-delete"></el-button>
          <el-button type="success" plain icon="el-icon-check">分配角色</el-button>
        </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="pagenum"
      :page-size="pagesize"
      :total="total"
      @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  created () {
    this.getUsers()
  },
  data () {
    return {
      userList: [],
      total: 0,
      pagenum: 1,
      pagesize: 3
    }
  },
  methods: {
    async getUsers (pagenum = 1) {
      try {
        const res = await this.axios.get('users', {
          params: {
            query: '',
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
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    },

    changePage (curPage) {
      this.getUsers(curPage)
    },

    async changeUserState (user) {
      try {
        const res = await this.axios.put(`users/${user.id}/state/${user.mg_state}`, null)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg,
            duration: 1000
          })
        }
      } catch (e) {
        console.log(e)
        this.$message({
          type: 'error',
          message: e,
          duration: 1000
        })
      }
    }
  }
}
</script>

<style>

</style>
