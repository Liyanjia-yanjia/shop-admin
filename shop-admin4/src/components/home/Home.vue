<template>
  <el-container class="home">
  <!-- 头部区域 -->
    <el-header class="home-header">
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="8">
          <img src="../../assets/imgs/logo.png">
        </el-col>
        <el-col>
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="8">
          <span>欢迎上海前端31期成员
          <a href="javascript:;" @click="logout">退出</a>
          </span>
        </el-col>
      </el-row>
    </el-header>

    <el-container class="home-container">
    <!-- 侧边栏 -->
      <el-aside width="200px" class="home-aside">
        <el-menu
          :router="true"
          default-active="2"
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
        await this.$confirm('您将会退出，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        localStorage.removeItem('token')
        this.$router.push('/login')
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      }
    }
  }
}
</script>

<style>
  .home{
    height: 100%;
  }
  .home-main{
    height: 100%;
    background: #EAEEF1;
  }
  .home-header{
    padding-left: 0;
    background: #B3C1CD;
  }
  .home-header img{
    width: 200px;
  }
  .home-header a{
    color: #daa520;
  }
  .home-header span{
    display: inline-block;
    min-width: 240px;
    font-weight: 700;
  }
  .home-header h1{
    color: #fff;
    font-size: 28px;
    text-align: center;
    margin: 0;
  }
  .home-aside{
    background: #545C64;
  }
  .home-container{
    height: 100%;

  }
</style>
