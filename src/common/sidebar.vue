<template>
  <!-- 侧边栏导航 -->
  <div class="sideBar">
    <div class="el-menu-wrap">
      <el-menu :default-active="activeIndex" class="el-menu-vertical-demo el-menu--dark" :unique-opened="true">
        <div v-for="(item, index) in authority" :key="index">
          <el-menu-item :index="item.name" v-if="!item.sub" @click="link(item)">
            <span>{{item.nameCN}}</span>
          </el-menu-item>
          <el-submenu :index="item.name" v-else>
            <template slot="title">
              <span>{{item.nameCN}}</span>
            </template>
            <el-menu-item-group v-for="(child,index) in item.sub" :key="index">
              <el-menu-item :index="child.name" v-if="!child.sub" @click="link(child)">
                <span>{{child.nameCN}}</span>
              </el-menu-item>
              <el-submenu v-if="child.sub && child.sub.length > 0" :index="child.name">
                <template slot="title">{{child.nameCN}}</template>
                <el-menu-item-group v-for="(subchild,index) in child.sub" :key="index">
                  <el-menu-item :index="subchild.name" @click="link(subchild,true)">{{subchild.nameCN}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // let authority = localStorage.getItem('authority')
    // authority = authority ? JSON.parse(authority) : []
    let authority = [
      {name: 'user', nameCN: '留言回复'},
      {name: 'news', nameCN: '新闻资讯'},
      {name: 'scenicspotList', nameCN: '景点'},
      {name: 'scenicspotType', nameCN: '景点类型'},
      {name: 'changePassword',nameCN: '修改密码'}
    ];
     return {
      authority,
      activeIndex: ''
    }
  },
  created() {
    this.locatNav() 
  },
  methods: {
    locatNav(){
      let matched = this.$route.matched.map(item => item.name).filter(item => typeof item !== 'undefined');
      
      if (this.$route.meta.childLevel) {
        matched.splice(matched.length - this.$route.meta.childLevel)
      }
      this.activeIndex = matched[matched.length -1];
      if (matched.indexOf('appSnsContent')!== -1 && this.$route.query && this.$route.query.name) {
        this.activeIndex = this.$route.query.name;
      }
      if (matched.indexOf('appSnsContent')!== -1 && this.$route.query.topicCode) {
        this.activeIndex = this.$route.query.topicCode;
      }
    },
    //点击管理
    link(item, socialModule){
      if(item.url){
        window.open(item.url)
      }else{
        this.activeIndex = item.name
        if(socialModule){
          this.$router.push({name: item.name.split('_')[0], query: {id: item.name.split('_')[1], name: item.name, nameCN: item.nameCN}})
        }else{
          this.$router.push({name: item.name})
        }
      }
    }
  },
  watch:{
    '$route':'locatNav'
  }
}
</script>

<style lang="stylus">
.sideBar
  height calc(100% - 60px)
  float left
  position relative
  .menu_btn
    height 36px
    position absolute
    right -45px
    width 45px
    cursor pointer
    z-index 200
  .el-menu-wrap
    width 200px
    height 100%
    .el-menu-vertical-demo.el-menu--dark
      width 200px
      height 100%
      background #324157
      overflow-y scroll
      overflow-x hidden
      .el-menu-item
        color #bfcbd9
        min-width: 160px;
        &:hover,&:focus
          background #515972
      .el-menu-item.is-active
        color #20a0ff
      .el-submenu
        .el-submenu__title
          color #bfcbd9
          &:hover,&:focus
            background #515972
          .el-icon-arrow-down::before
            color #fff
        .el-menu.el-menu--inline
          background-color #1f2d3d
          .el-menu-item-group__title
            padding: 0
</style>
