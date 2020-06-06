<template>
  <div class="scenicspot-type-list">
    <h2 style="text-align: left" >景点类型列表</h2>
    <div style="text-align:right">
      <el-button @click="addNews()" size="medium" type="primary">新建</el-button>
    </div>
     <div class="table-list">
      <el-table
        v-loading="loading"
        ref="tableDate"
        :data="tableDate"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          type="index"
          property="id"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          property="name"
          label="名称">
        </el-table-column>
        <!-- <el-table-column
          property="createDate"
          label="发布时间">
        </el-table-column> -->
        <!-- <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteNews(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="PAGE_SIZE"
      :page-size="pageSize"
      layout="sizes, total, prev, pager, next, jumper"
      :total="total">
    </el-pagination> -->
  </div>
</template>

<script>
export default {
  data() {
    let {currentPage = 1, pageSize = 10,title ='' } = this.$route.query;
    return {
      // currentPage: parseInt(this.currentPage),
      // pageSize: parseInt(this.pageSize),
      currentPage,
      pageSize,
      total: 0,
      title,
      PAGE_SIZE: [10, 50, 100, 200],
      // user: {
      //   title
      // },
      roleOptions: [],
      // tableDate: [],
      // tableDate: [
      //   {
      //     "id": 94,
      //     "title": "话题跳转",
      //     "content": "<p><a href=\"about:blank\" target=\"_blank\">话题</a></p>",
      //     "imgUrl": null,
      //     "datePush": "2020-05-18"
      //   }
      // ],
    tableDate: [
        {
            "id": 1,
            "name": "风景",
            "status": 1,
            "detected": false,
            "createDate": null
        },
        {
            "id": 2,
            "name": "建筑",
            "status": 1,
            "detected": false,
            "createDate": null
        },
        {
            "id": 3,
            "name": "历史",
            "status": 1,
            "detected": false,
            "createDate": null
        },
        {
            "id": 4,
            "name": "户外",
            "status": 1,
            "detected": false,
            "createDate": "2020-05-30T00:00:00.000+0000"
        },
        {
            "id": 5,
            "name": "山水",
            "status": 1,
            "detected": false,
            "createDate": "2020-05-30T00:00:00.000+0000"
        }
    ],
      loading: false,
      query: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取用户列表
    getList() {
      let {currentPage = 1, pageSize = 50, title = ''} = this.$route.query;
      this.query = this.$route.query;
      this.loading = true;
      let data = {
          pageIndex: currentPage,
          pageSize,
          title,
          keyWord: '  ',
          typeId: '0'
      }
      this.$api.get({
        url: '/scenicspotType/getList',
        data
      }).then(({success, msg, data}) => {
      // selectNewsListByPage(data).then(res => {
        this.loading = false;
        console.log(data)
        if (success) {

          this.tableDate = data
          this.currentPage = data.current
          this.pageSize = data.size
          this.total = data.total
        }
        else {
          this.$message.error(msg);
        }
      }).catch(err => {
        this.loading = false;
        this.$message.error(err.msg);
      })
    },
    // 编辑
    edit(row) {
      this.$router.push({name:'scenicspotTypeDetail',query:{id:row.id,modify:true, name: row.name}})
    },
    // 添加
    addNews() {
      this.$router.push({name:'scenicspotTypeDetail',query:{modify:true, add: true}})
    },
    // 删除
    deleteNews(row) {
      this.$confirm('确定删除?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let data = {
          id: row.id
        }
        console.log(data);
        // delNews(data).then(res => {
        //   this.getList()
        //   this.$message.success('删除成功')
        // }).catch(err => {
        //   if(!this.$axios.isCancel(err)){
        //     this.$message.error(err.message);
        //   }
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          showClose: true
        });          
      });
    },
    handleSizeChange(pageSize) {
      this.$router.replace({query: { ...this.query, pageSize, currentPage: 1 }})
    },
    handleCurrentChange(currentPage) {
      this.$router.replace({query: { ...this.query, currentPage }})
    },
  },
  watch: {
    '$route': function () {
      this.getList()
    }
  }
}
</script>

<style lang="stylus" scoped>
.scenicspot-type-list
  padding-top 20px
</style>

