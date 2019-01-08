export default {
  data () {
    return {
      roleList: [],

      roleId: -1,

      assignRights: false,
      rightsTree: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },

  created () {
    this.getRoles()
    this.getRights()
  },

  methods: {
    // 获取到角色所拥有的权限
    async getRoles () {
      const res = await this.$http.get('roles')
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.roleList = res.data.data
      }
    },

    // 显示分配权限对话框
    showRightsMask (rights) {
      this.assignRights = true

      // 赋值对应的角色id
      this.roleId = rights.id
      const rightsId = []
      // console.log(rights)
      // 获取所有应该被默认选中的权限id
      rights.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            rightsId.push(item3.id)
          })
        })
      })
      // console.log(rightsId)
      // 由于dom的异步更新，此时无法使用$refs获取到组件对象，调用方法
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(rightsId)
      })
    },

    // 隐藏分配权限对话框
    async hideAssignMask () {
      // console.log(this.roleID)

      const checkedKeys = this.$refs.tree.getCheckedKeys()
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      // 数组解构，获取选中的和半选中的权限id
      const allKeys = [...checkedKeys, ...halfCheckedKeys]
      // console.log(checkedKeys, halfCheckedKeys)
      const res = await this.$http.post(`roles/${this.roleId}/rights`, {
        rids: allKeys.join(',')
      })
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.assignRights = false
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        this.getRoles()
      }
    },

    // 获取所有权限
    async getRights () {
      const res = await this.$http.get('rights/tree')
      console.log(res)
      if (res.data.meta.status === 200) {
        this.rightsTree = res.data.data
      }
    }
  }
}
