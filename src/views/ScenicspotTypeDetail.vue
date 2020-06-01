<template>
  <div class="scenicspot-type-details">
    <el-form ref="newsForm" :model="form" label-width="80px">
      <el-form-item v-if="!form.add" label="id" >
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <div class="detail-footer">
      <template v-if="modify">
        <el-button size="small" @click="cancel('newsForm')">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('newsForm')">确定</el-button>
      </template>
      <el-button v-else size="small" type="primary" @click="$router.go(-1)">确定</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: this.$route.query,
      id:this.$route.query.id,
      modify:this.$route.query.modify
    }
    
  },
  created() {
    
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.get({
            url: '/scenicspotType/add',
            data: {
              name: this.form.name
            }
          // }).then(({success, data: {nickName = '', token}, msg}) => {
          }).then(({success, msg}) => {
            console.log(success,2223333);
            if (success) {

              this.$router.go(-1)
            }
            else {
              this.$message.error(msg)
            }
          }, rej => {
            console.log(rej, 333);
          })
        }
      });
    },
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1)
    }
  }
}
</script>


<style lang="stylus">
left-space = 30px
.scenicspot-type-details
  padding 50px 0
  // background-color #fff
  .clear-form-style
    line-height 1.42
    min-height 200px
    .ql-container
      .ql-editor
        min-height 200px
  .detail-footer
    margin 50px 0 0 left-space
  .margin-left
    margin-left left-space
  .ql-tooltip.ql-editing
    margin-left 60px   
</style>