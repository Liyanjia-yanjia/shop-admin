export default {
  data () {
    return {
      roleForm: [],

      assignRight: false,

      rightsTree: [],

      roleId: -1,

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
    async getRoles () {
      const res = await this.$http.get('roles')
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.roleForm = res.data.data
      }
    },

    async delRight (roleId, rightId) {
      const res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.getRoles()
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
      }
    },

    showRightTree (rights) {
      this.assignRight = true
      // console.log(rights)

      this.roleId = rights.id

      const rightId = []
      rights.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            rightId.push(item3.id)
          })
        })
      })

      // console.log(rightId)
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(rightId)
      })
    },

    async hideRight () {
      // console.log(this.roleId)
      this.assignRight = false
      const ids = this.$refs.tree.getCheckedKeys()
      const ids2 = this.$refs.tree.getHalfCheckedKeys()
      console.log(ids, ids2)
      const checkedId = [...ids, ...ids2]
      // console.log(checkedId)
      const res = await this.$http.post(`roles/${this.roleId}/rights`, {
        rids: checkedId.join(',')
      })
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
      }
      this.getRoles()
    },

    async getRights () {
      const res = await this.$http.get(`rights/tree`)
      console.log(res)
      this.rightsTree = res.data.data
    }
  }
}
