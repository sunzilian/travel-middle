<template>
  <div class="user-list">
    ScenicspotTypeList
    <el-button @click="addNews()" size="medium" type="primary">新建</el-button>
    <div class="table-list">
      <el-table
        v-loading="loading"
        ref="tableDate"
        :data="tableDate"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          property="title"
          label="标签">
        </el-table-column>
        <!-- <el-table-column
          property="datePush"
          label="发布时间">
        </el-table-column> -->
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <!-- <el-button @click="view(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteNews(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'scenicspot',
  data() {
    let usernameCheck = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'));
      }
      callback();
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.administratorForm.checkPass !== "") {
          this.$refs.administratorForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      currentPage: 1,
      pageSize: 10,
      total: 60,
      PAGE_SIZE: [10, 50, 100, 200],
      // user: {
      //   title
      // },
      roleOptions: [],
      // tableDate: [],
      tableDate: [
        {
          "id": 94,
          "title": "话题跳转",
          "content": "<p><a href=\"about:blank\" target=\"_blank\">话题</a></p>",
          "imgUrl": null,
          "datePush": "2020-05-18"
        }
      ],
      errorMessage: '',
      administratorForm: {
        username: '',
        pass: '',
        checkPass: ''
      },
      rules: {
        username: [{validator: usernameCheck, trigger: 'blur'}],
        pass: [{ validator: validatePass, trigger: 'blur' }]
      },
      loading: false
    };
  },
  components: {
    // HelloWorld
  },
  mounted() {
    this.$api.exampleModule.getExample().then(res => {
      console.log(res);
    });
  },
  methods: {
    edit(row) {
      this.$router.push({name:'scenicspotDetail',query:{id:row.id,modify:true}})
    },
    // 添加
    addNews() {
      this.$router.push({name:'scenicspotDetail',query:{modify:true}})
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
  }
};
</script>

<style lang="stylus">

</style>
