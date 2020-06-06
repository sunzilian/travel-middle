<template>
  <div class="scenicspot-type-details">
    <el-form ref="newsForm" :model="form" label-width="80px">
      <!-- <el-form-item v-if="!form.add" label="id" >
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item v-if="!form.add" label="id" >
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="commmetInfo.title"></el-input>
      </el-form-item> -->
      <el-form-item label="标题">
        <el-input style="width: 280px" v-model="commmetInfo.title" disabled ></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input style="width: 700px" v-model="commmetInfo.context" disabled type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="提问时间">
        <el-input style="width: 280px" v-model="commmetInfo.createDate" disabled></el-input>
      </el-form-item>
      <el-form-item label="回复内容" >
        <el-input style="width: 700px" v-model="commmetInfo.answerContext" type="textarea"></el-input>
      </el-form-item>
      <!-- <el-form-item label="回复时间" v-if="commmetInfo.answerDate">
        <el-input v-model="commmetInfo.answerDate"></el-input>
      </el-form-item> -->
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
      modify:this.$route.query.modify,
      commmetInfo: {}
    }
    
  },
  created() {
    this.getCommentInfo()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.get({
            url: '/comment/back/answerComment',
            data: {
              id: this.id,
              answer: this.commmetInfo.answerContext
            }
          }).then(({success, msg}) => {
            if (success) {
              this.$message.success('回复成功')
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
    getCommentInfo() {
      this.$api.get({
        url: '/comment/getComment',
        data: {
          id: this.id
        }
      }).then(({success, data}) => {
        if (success) {
          this.commmetInfo = data
        }
      }, rej => {
        console.log(rej, 333);
      })
    },
    cancel(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1)
    }
  }
}
</script>


<style lang="stylus">
left-space = 80px
.scenicspot-type-details
  overflow hidden
  padding 50px 0
  text-align left
  // background-color #fff
  .el-form
    padding 0 30px
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