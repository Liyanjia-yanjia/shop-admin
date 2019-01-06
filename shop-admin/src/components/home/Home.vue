<template>
  <el-container class="home">
    <el-header class="home-header">
      <el-row type="flex"
              justify="center"
              align="middle">
        <el-col :span="8">
          <img src="@/assets/imgs/logo.png"
               alt="">
        </el-col>
        <el-col>
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="8">
          <span>欢迎上海前端31期钻石学员
            <a href="javascript:;"
               @click="logout">退出</a>
          </span>
        </el-col>
      </el-row>
    </el-header>
    <el-container>

      <!-- 侧边栏 -->
      <el-aside class="home-aside"
                width="200px">
        <el-menu :router="true"
                 default-active="1"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/users">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>用户列表</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/roles">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>角色列表</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/rights">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>权限列表</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主要内容 -->
      <el-main class="home-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    async logout () {
      try {
        await this.$confirm('您确认退出吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.$router.push('/login')
        localStorage.removeItem('token')
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    }
  }
}
</script>

<style>
.home-header {
  padding-left: 0;
  background-color: #b3c1cd;
}
.home-header img {
  width: 200px;
}
.home-header h1 {
  margin: 0;
  text-align: center;
  color: #fff;
  font-size: 28px;
}
.home-header span {
  display: inline-block;
  min-width: 235px;
  font-weight: bolder;
}
.home-header a {
  color: #daa520;
}
.home-aside {
  background-color: #545c64;
}
.home {
  height: 100%;
  background-color: #eaeef1;
}
</style>
