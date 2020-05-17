<template>
  <div class="home">
    <v-header></v-header>
    <v-sidebar></v-sidebar>
    <div class="main-container">
      <!-- <v-levelbar></v-levelbar> -->
      <section class="content" v-loading.body="loading" element-loading-text="加载中,请稍后">
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script>
import vHeader from '../common/header.vue'
import vSidebar from '../common/sidebar.vue'
// import vLevelbar from '../common/levelbar.vue'

export default {
  components: {
    vHeader,
    vSidebar,
    // vLevelbar
  },
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  min-width 1200px
  overflow hidden
  overflow-x auto
  .main-container 
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 200px;
    right: 0;
    padding: 0 50px;
    overflow-x: hidden;
    overflow-y: auto;
    .content 
      min-height 400px
      transition margin 0.4s ease 0s
    .active
      margin-left 0px
      overflow-y auto
    .container 
      padding 20px 40px
</style>
