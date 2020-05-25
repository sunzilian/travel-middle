<template>
  <div class="admin">
    password
    <div class="change-content">
      <h2 class="change-title">密码修改</h2>
      <div class="change-main">
        <el-form :model="pwdSetting" status-icon :rules="rules" ref="pwdSetting" label-width="100px" class="pwdSetting" size="small"  label-suffix="：">
          <el-form-item label="登录账号" prop="loginName">
            <el-input class="input-width" v-model="pwdSetting.loginName" placeholder="请输入登录账号"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" prop="oldPassword">
              <el-input class="input-width" type="password"  v-model="pwdSetting.oldPassword" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
              <el-input class="input-width" type="password"  v-model="pwdSetting.newPassword" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="confirmPassword">
              <el-input class="input-width" type="password"  v-model="pwdSetting.confirmPassword" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('pwdSetting')" style="width:100px">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.admin
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column

.administrator-form
  width 30%
  min-width 400px
</style>

<script>
// import md5Base64 from 'md5-base64'
// import { editPassword } from '@/utils/getData'
// import { system } from '@/utils/constants'
// import { passwordReg, loginNameReg } from '@/utils/reg'

export default {
  data(){
    // let loginNameCheck = (rule, value, callback) => {
    //   loginNameReg(value) ? callback() : callback(new Error('登录账号为手机号码,手机号码格式错误'))
    // }
    // let passwordCheck = (rule, value, callback) => {
    //   passwordReg(value) ? callback() : callback(new Error('登录密码必须包含大写字母、小写字母和数字，长度为8-30位'))
    // }
    // let checkPwd = (rule, value, callback) => {
    //   if (this.pwdSetting.confirmPassword !== '') {
    //     this.$refs.pwdSetting.validateField('confirmPassword');
    //   }
    //   if (this.pwdSetting.oldPassword == value) {
    //     callback(new Error('新旧密码不能相同'));
    //   }
    //   callback()
    // }
    // let confirmPwd = (rule, value, callback) => {
    //   if (value !== this.pwdSetting.newPassword) {
    //     callback(new Error('两次输入的新密码不一致'))
    //   } else {
    //     callback()
    //   }
    // }
    return{
      pwdSetting: {
        loginName: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
      //   loginName: [
      //     { required: true, message: '请输入登录账号', trigger: 'blur' },
      //     { validator: loginNameCheck, trigger: 'blur'}
      //   ],
      //   oldPassword:[
      //     { required: true, message: '请输入旧密码', trigger: 'blur' },
      //     { validator: passwordCheck, trigger: 'blur' }
      //   ],
      //   newPassword:[
      //     { required: true, message: '请输入新密码', trigger: 'blur' },
      //     { validator: passwordCheck, trigger: 'blur' },
      //     { validator: checkPwd, trigger: 'blur' }
      //   ],
      //   confirmPassword:[
      //     { required: true, message: '请重复新密码', trigger: 'blur' },
      //     { validator: passwordCheck, trigger: 'blur' },
      //     { validator: confirmPwd, trigger: 'blur' }
      //   ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.pwdSetting.validate((valid) => {
        if (valid) {
        let { loginName, oldPassword, newPassword, confirmPassword } = this.pwdSetting
        console.log(loginName, oldPassword, newPassword, confirmPassword);
        // editPassword({ loginName, oldPassword: md5Base64(oldPassword), newPassword: md5Base64(newPassword), channel: system }).then(res => {
        // editPassword({ loginName, oldPassword, newPassword, channel: system }).then(res => {
        //   this.$router.push({name: 'login'})
        // }).catch(err => {
        //   this.$message.error(err.message)
        // })
        // } else {
        //   return false
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.tip
  margin-left 20px
  font-size 12px
  color #f00
.header-row
  height 60px
  width 100%
  line-height 60px
  background #fff
  color #909399
  min-width 1200px
  .header-logo
    width 360px
    line-height 60px
    .logo-wrap
      width 360px
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
.change-content
  margin 40px
  min-width 1120px
  background-color #fff
  border-bottom 1px #e6e5ed solid
  border-radius 3px
  .change-title
    padding-left 20px
    border-bottom 1px #e6e5ed solid
    font-size 14px
    font-weight 600
    line-height 40px
    color #606266
  .change-main
    padding 30px 0 50px 10px 
    .input-width
      width 350px
</style>
