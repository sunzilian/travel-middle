<template>
  <div class="scenicspot-list">
    <h2 style="text-align: left" >新闻列表</h2>
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
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          property="name"
          label="名称">
        </el-table-column>
        <el-table-column
          property="publishName"
          label="发布者">
        </el-table-column>
        <el-table-column
          property="datePush"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button v-if="+scope.row.top !== 1" @click="handleTop(scope.row, '1', scope.$index)" type="text" size="small">置顶</el-button>
            <el-button v-else @click="handleTop(scope.row, '0', scope.$index)" type="text" size="small">取消置顶</el-button>
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteNews(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="PAGE_SIZE"
      :page-size="pageSize"
      layout="sizes, total, prev, pager, next, jumper"
      :total="total"> 
    </el-pagination>
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
      tableDate: [
        {
          "id": 1,
          "name": "“云游”武威——待到春暖花开时，邀您如约“天马行空”",
          title: '世世代代艺术家们钟情之处',
          "content": "http://www.mafengwo.cn/travel-news/1442049.html",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/34/f4/3f4494ef045ae462c00745a1503d110d.jpg',
          "datePush": "2020-02-18 13:01:22",
          publishName: 'admin',
          top: 1
        },
        {
          "id": 2,
          "name": "“众志成城战疫情”武威市青年音乐家协会助力防控疫情！",
          title: '黄山传奇',
          "content": "http://www.mafengwo.cn/travel-news/1442048.html",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/f9/ad/fa9d52e376458baa592be21a6052cb26.jpg',
          "datePush": "2020-02-18 13:11:32",
          publishName: 'admin',
          top: 2
        },
        {
          "id": 3,
          "name": "福建武夷山",
          title: '大儒之美',
          "content": "http://www.mafengwo.cn/travel-news/1442033.html",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/66/fc/6f6c463ccbc9e61e63e4787ed91ca076.jpg',
          "datePush": "2020-02-18 14:07:10",
          publishName: 'admin'
        },
        {
          "id": 4,
          "name": "致敬英雄！海昌海洋公园面向全国医护人员免费开放",
          title: '水墨画般美丽的景致绝非偶然',
          "content": "http://www.mafengwo.cn/travel-news/1442017.html",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/e0/ca/ec0ac50e2f92d2a1c873acc42cd0ea5e.jpg',
          "datePush": "2020-02-18 14:27:34",
          publishName: 'admin'
        },
        {
          "id": 5,
          "name": "@全国医务工作者及家属，新疆昌吉州邀您免费畅游所有A级景区",
          title: '戈壁之旅',
          "content": "http://www.mafengwo.cn/travel-news/1442035.html",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/39/c6/3c96ded6828687d18f837cf9767196d9.jpg',
          "datePush": "2020-02-18 14:29:10",
          publishName: 'admin'
        },
        {
          "id": 6,
          "name": "日本签证最新消息，日本签证再次放宽",
          title: '很多海外华人都是从开平过去的。为什么要离开这美丽的地方呢？',
          "content": "http://www.mafengwo.cn/travel-news/1439650.html",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/c1/30/c310539a390a68d9508156cb6a5f59af.jpg',
          "datePush": "2020-02-18 14:43:37",
          publishName: 'admin'
        },
        {
          "id": 7,
          "name": "泰国曼谷CENTRAL商圈完全购物指南",
          title: '黄山传奇',
          "content": "http://www.mafengwo.cn/travel-news/218980.html",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/0b/0b/00bb2bbaaa6eb9127d36268b782d9590.jpg',
          "datePush": "2020-02-18 15:09:54",
          publishName: 'admin'
        },
        {
          "id": 8,
          "name": "让我们在秋末，来一场日本自由行治愈系的邂逅",
          title: '大儒之美',
          "content": "http://www.mafengwo.cn/travel-news/219747.html",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/2d/9b/29db95f26f4f5d0709ebb2af3bfaa841.jpg',
          "datePush": "2020-02-18 15:34:44",
          publishName: 'admin'
        },
        {
          "id": 9,
          "name": "海南南山海上观音像",
          title: '水墨画般美丽的景致绝非偶然',
          "content": "<p>　　不错，就这样一个看似普通的滩涂却深得中国摄影家的青睐。</p><p>　　虽然只是中国东南沿海的一个小地方，霞浦却拥有全国最大的滩涂——面积40万平方千米，还有延伸400多千米的海岸线。</p><p>　　狭长斑驳的滩涂上，三三两两的散布着竹房、竹篙、浮筒和渔具等器物。这些人工制品与此地美丽的自然景观交相辉映。</p><p>　　门票：免费。</p><p>　　霞浦滩涂周边最近的交通枢纽是福州市，距离景区约117km。</p><p>　　北京、上海、广州和西安等都有直达福州机场的航班。</p>",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/22/77/272710bc279fef9c0db05b6ef39b4c58.jpg',
          "datePush": "2020-02-18",
          publishName: 'admin'
        },
        {
          "id": 10,
          "name": "海南省亚龙湾",
          title: '戈壁之旅',
          "content": "<p>　　不，这可不是海市蜃楼！这是中国西北大戈壁滩上实实在在的风景！</p><p>　　环抱月牙泉的鸣沙山由一系列小山丘组成。鸣沙山以其独一无二的外形和随风而鸣的特点而闻名于世。风从山丘上刮过时，可以听到山体响亮的回声。游客可以骑骆驼爬上250米高的山丘。月牙泉边园林里盛开的繁花则与周围漫天的黄沙形成了有趣的对照。</p><p>　　门票：1-11月旺季120元/人，淡季60元/人。</p><p>　　鸣沙山和月牙泉位于敦煌南侧6km处。中国南航每天有往返于西安咸阳机场和敦煌机场的航班。中国国航位于北京和敦煌之间的航班每天只有一班。</p>",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/2d/4a/24da537dd3d576aabb59626ae2da2442.jpg',
          "datePush": "2020-02-18",
          publishName: 'admin'
        },
        {
          "id": 11,
          "name": "河北承德避暑山庄/热河行宫",
          title: '很多海外华人都是从开平过去的。为什么要离开这美丽的地方呢？',
          "content": "<p>　　20世纪初期，流亡海外的开平人借鉴融合国外众多的建筑风格建造了这些碉楼，其中有伊斯兰风格，罗马风格甚至还有希腊风格。</p><p>　　碉楼既是财富的象征，也是保护当地居民免受战争和劫掠之苦的有效途径。现在开平广袤的田野里依然矗立着大约1800座碉楼。</p><p>　　开平位于广州西南方向130km处。</p><p>　　定期的班车往返于开平客运站和广州不同的长途客运站。开平和香港之间有直达公交和轮渡。</p>",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/c1/30/c310539a390a68d9508156cb6a5f59af.jpg',
          "datePush": "2020-02-18",
          publishName: 'admin'
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
      let {currentPage = 1, pageSize = 10, title = ''} = this.$route.query;
      console.log(this.$route.query);
      this.query = this.$route.query;
      this.loading = true;
      let data = {
          pageIndex: currentPage,
          pageSize,
          title,
          keyWord: '',
          top: '0'
      }
      this.$api.get({
        url: '/news/back/getNewsPage',
        data
      }).then(({success, msg, data}) => {
        this.loading = false;
        console.log(data)
        if (success) {
          this.tableDate = data.records
          this.currentPage = +data.current
          this.pageSize = +data.size
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
    // 搜索
    search(){
      let { title} = this.user
      this.$router.replace({query: {...this.query,title, currentPage: 1}})
    },
    // 查看
    view(row) {
      this.$router.push({name:'newsDetail',query:{id:row.id}})
    },
    // 编辑
    edit(row) {
      this.$router.push({name:'newsDetail',query:{id:row.id,modify:true}})
    },
    // 添加
    addNews() {
      this.$router.push({name:'newsDetail',query:{modify:true}})
    },
    // 删除
    deleteNews(row) {
      this.$confirm('确定删除?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: false,
        closeOnClickModal: false
      }).then(() => {
       this.handleDelNews(row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          showClose: true
        });          
      });
    },
    handleDelNews(id) {
      this.$api.get({
        url: '/news/back/delete',
        data: {id}
      }).then(({success, msg}) => {
        if (success) {
          this.$message.success('删除成功')
          this.getList()
        }
        else {
          this.$message.error(msg)
        }
      }, ({msg}) => {
        this.$message.error(msg)
      })
    },
    handleSizeChange(pageSize) {
      alert(pageSize)
      this.$router.replace({query: { ...this.query, pageSize, currentPage: 1 }})
    },
    handleCurrentChange(currentPage) {
      alert(currentPage)
      this.$router.replace({query: { ...this.query, currentPage }})
    },
    handleTop(info, top, index) {
      console.log(3334322342344,info, top, index);
      this.$api.get({
        url: '/news/back/updateTop',
        data: {
          id: info.id,
          top
        }
      }).then(({success, msg}) => {
        if (success) {
          this.$message.success(info.top ? '取消置顶':'置顶成功')
          this.tableDate[index].top = !info.top
        }
        else {
          this.$message.error(msg)
        }
      }, ({msg}) => {
        this.$message.error(msg)
      })
    }
  },
  watch: {
    '$route': function () {
      console.log('watch  route');
      this.getList()
    }
  }
}
</script>

<style lang="stylus">
.scenicspot-list
  padding-top 20px
</style>

