<template>
  <div class="user-list">
    <h2 style="text-align: left" >留言回复</h2>
    <el-table
      :data="commentList"
      :show-header="true"
      border
      max-height="auto"
      style="width: 98%; margin: 20px auto 0"
      size="small"
    >
      <el-table-column
        prop="title"
        label="标题"
        min-width="180"
        :show-overflow-tooltip="false"
        class-name="aa"
      >
      </el-table-column>
      <!-- <el-table-column
        prop="userName"
        label="留言者"
        :width="dateColumnWidth"
        class-name="aa"
      >
      </el-table-column> -->
      <el-table-column
        prop="createDate"
        label="评论日期"
        :width="dateColumnWidth"
        class-name="aa"
      >
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="状态"
        :width="dateColumnWidth"
        class-name="aa"
      >
        <template slot-scope="scope">
          <el-button size="small">{{scope.row.status ? '已回复' : '待回复'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <!-- <el-button @click="deleteNews(scope.row)" type="text" size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import NavMenu from "../../components/NavMenu";

export default {
  name: "home",
  data() {
    return {
      commentUserName: '',
      commentContent: '',
      commentList: [],
      commentList1: [
        {
          userName: '匿名',
          content: '5.1推荐去哪里玩',
          time: '2020/2/24 14:22:23',
          replyContent: 'xxxxxxxxxxxxxxxxxxxxx',
          replyTime: '2020/2/24 16:12:39'
        },
        {
          userName: 'username',
          content: 'content',
          time: 'time',
          replyContent: 'replyContent',
          replyTime: 'replyTime'
        },
        
      ],
      dateColumnWidth: 150
    }
  },
  created() {
    this.getAllCommitPage()
  },
  methods: {
    comfirmHandle() {
      let {
        commentUserName,
        commentContent,
        commentList
      } = this;
      console.log(commentUserName, commentContent);
      commentList.push({
          userName: commentUserName,
          content: commentContent,
          time: new Date().getTime(),
          replyContent: '',
          replyTime: ''
        },)
      this.commentList = commentList
      this.cancelHandle()
    },
    cancelHandle() {
      this.commentUserName = '';
      this.commentContent = '';
    },
    getAllCommitPage() {
      this.$api.get({
        url: '/comment/back/getCommentPage',
        data: {
          pageSize: 100,
          pageIndex: 1,
          status: '0'
        }
      })
      .then(({success, data}) => {
        this.commentList = data.records
        if (success) {
          console.log(data);
          // this.registerForm = data;
        }
      })
    },
    edit(info) {
      console.log(info);
      this.$router.push({name:'userDetail', query: {id: info.id, modify: true}})
    },
    deleteNews(row) {
      this.$confirm('确定删除?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false,
        closeOnClickModal: false
      }).then(() => {
       this.handleDelSce(row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          showClose: true
        });          
      });
    },
    handleDelSce(id) {
      this.$api.get({
        url: '/comment/back/delete',
        data: {id}
      }).then(({success, msg}) => {
        if (success) {
          this.$message.success('删除成功')
          this.getAllCommitPage()
        }
        else {
          this.$message.error(msg)
        }
      }, ({msg}) => {
        this.$message.error(msg)
      })
    },
  },
};
</script>

<style lang="stylus">
.user-list
  padding-top 20px

</style>
