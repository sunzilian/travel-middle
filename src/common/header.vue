<template>
  <el-row class="header-row">
    <el-col :span="12" class="header-img">
      <div class="header-logo">
        <div class="logo-wrap">
          <!-- <img src="../assets/images/logo.png" alt=""> -->
					<span class="logo-title">会员运营管理平台</span>
        </div>
      </div>
    </el-col>
    <el-col :span="12" class="header-right user-option">
      <span>{{userName}}</span>
      <span v-if="lastLoginTime">
        <span class="hdl-time"></span>
        <span>上次登录时间: </span>
        <span>{{lastLoginTime}}</span>
      </span>
      <span class="logout" @click="logout">
        <span class="hdl-logout"></span>
        <span>退出登录</span>
      </span>
    </el-col>
  </el-row>
</template>

<script>
// import moment from 'moment'
// import { logout } from '@/utils/getData'
// import { system } from '@/utils/constants'

export default {
  data(){
    let userName = localStorage.getItem('userName')
    let lastLoginTime = localStorage.getItem('lastLoginTime')
    return{
      userName,
      lastLoginTime
    }
  },
  methods: {
    // 注销退出
    logout: function(){
      this.$confirm('您确定要注销系统?', '注销', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        console.log(222222);
        window.localStorage.clear();
        window.location.reload();
        // logout({params: { channel: system }}).then(res => {
        //   this.$router.push({name: 'login'})
        //   localStorage.removeItem('authority')
        // }).catch(err => {
        //   this.$message.error(err.message)
        // })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="stylus">
.header-row
  height 60px
  width 100%
  line-height 60px
  background #fff
  color #909399
  min-width 1200px
  .header-img
    height 60px
    line-height 60px
    padding-left 20px
    .header-logo
      width 200px
      line-height 60px
      .logo-wrap
        width 200px
        padding-left 20px
        margin 0 auto
        img 
          width 100px
          height auto
          vertical-align middle
        .logo-title
          font-size 20px
          color #e60012
          font-weight bold
          vertical-align middle
          margin-left 10px
          position relative
          bottom 1px
  .header-right
    text-align right
    height 60px
    padding-right 20px
    .user-img
      display inline-block
      vertical-align middle
      width 36px
      height 26px
      border-radius 50%
      // background url("../assets/images/mains.png") -378px -67px
    .logout
      cursor pointer
      font-size 16px
    .please-login
      font-size 20px
      color #f00
      height 100%
      line-height 40px
  .user-option
    font-size 16px
    text-align right
    height 60px
    padding-right 20px
  .hdl-logout,.hdl-time
    font-size 12px
    margin-left 8px
.el-notification.right
  top 100px!important
</style>
