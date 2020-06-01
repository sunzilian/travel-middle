<template>
  <div class="scenicspot-list">
    <h2 style="text-align: left" >景点列表</h2>
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
            <el-button @click="view(scope.row)" type="text" size="small">查看</el-button>
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
      total: 60,
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
          "name": "安徽宏村",
          title: '世世代代艺术家们钟情之处',
          "content": "<p>　　拥有900年古老历史的宏村一直以来就吸引着中国四面八方的游客，他们钟情于这里静谧安详的氛围和造型独特的建筑——就连背后惹眼的黄山也未能使其魅力减少一丝一毫。</p><p>　　几十年来，宏村那古色古香的建筑，澄澈透明的月亮湖以及周围美丽如画的风景一直是艺术家们的灵感源泉。</p><p>　　漫步于狭窄的青石板小道，眺望远处稻田里辛勤劳作的农民，身畔的湖水里倒映着古屋的倩影：这一切都让你忍不住想要妙手绘丹青。</p><p>　　门票：104元（16美元）/人 。</p><p>　　宏村位于黄山市西北约70km处。北京，上海，广州和西安等都有直达黄山机场的航班。</p>",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/34/f4/3f4494ef045ae462c00745a1503d110d.jpg',
          "datePush": "2020-02-18 09:12:22",
          publishName: 'admin'
        },
        {
          "id": 2,
          "name": "安徽黄山",
          title: '黄山传奇',
          "content": "<p>　　黄山被联合国教科文组织世界文化遗产评为“中国最美的山”，它也是许多中国人一生不渝的向往。</p><p>　　海拔1863米的黄山以其“奇松，怪石，云海，温泉”闻名于世。（中国古语说）黄山归来不看岳，足见对其推崇之至。</p><p>　　门票：3月—11月，230元/人，其余时间150元/人。</p><p>　　北京、上海、广州和西安等都有直达黄山机场的航班。</p>",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/f9/ad/fa9d52e376458baa592be21a6052cb26.jpg',
          "datePush": "2020-02-18 09:15:02",
          publishName: 'admin'
        },
        {
          "id": 3,
          "name": "福建武夷山",
          title: '大儒之美',
          "content": "<p>　　作为中国东南地区的主要标志和联合国教科文组织世界文化遗产名录之一，武夷山以其身为程朱理学的起源与发展地备受推崇。11世纪以来，程朱理学在东亚一直影响深远。</p><p>　　九曲河低谷的竹筏漂流很受游客欢迎，历时2小时，行程8千米的旅行让你一览壮丽的武夷美景。要欣赏武夷平缓的山峰，澄澈的河水，漂流绝对是最佳选择。</p><p>　　门票：武夷公园140元/人。竹筏漂流100元/次。</p><p>　　武夷山位于福建省会福州西北方向约350km处。上海，北京，广州和西安等都有直达福州机场的航班。</p>",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/66/fc/6f6c463ccbc9e61e63e4787ed91ca076.jpg',
          "datePush": "2020-02-18 09:33:12",
          publishName: 'admin'
        },
        {
          "id": 4,
          "name": "福建霞浦",
          title: '水墨画般美丽的景致绝非偶然',
          "content": "<p>　　不错，就这样一个看似普通的滩涂却深得中国摄影家的青睐。</p><p>　　虽然只是中国东南沿海的一个小地方，霞浦却拥有全国最大的滩涂——面积40万平方千米，还有延伸400多千米的海岸线。</p><p>　　狭长斑驳的滩涂上，三三两两的散布着竹房、竹篙、浮筒和渔具等器物。这些人工制品与此地美丽的自然景观交相辉映。</p><p>　　门票：免费。</p><p>　　霞浦滩涂周边最近的交通枢纽是福州市，距离景区约117km。</p><p>　　北京、上海、广州和西安等都有直达福州机场的航班。</p>",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/e0/ca/ec0ac50e2f92d2a1c873acc42cd0ea5e.jpg',
          "datePush": "2020-02-18 09:43:12",
          publishName: 'admin'
        },
        {
          "id": 5,
          "name": "甘肃省敦煌市鸣沙山和月牙泉",
          title: '戈壁之旅',
          "content": "<p>　　不，这可不是海市蜃楼！这是中国西北大戈壁滩上实实在在的风景！</p><p>　　环抱月牙泉的鸣沙山由一系列小山丘组成。鸣沙山以其独一无二的外形和随风而鸣的特点而闻名于世。风从山丘上刮过时，可以听到山体响亮的回声。游客可以骑骆驼爬上250米高的山丘。月牙泉边园林里盛开的繁花则与周围漫天的黄沙形成了有趣的对照。</p><p>　　门票：1-11月旺季120元/人，淡季60元/人。</p><p>　　鸣沙山和月牙泉位于敦煌南侧6km处。中国南航每天有往返于西安咸阳机场和敦煌机场的航班。中国国航位于北京和敦煌之间的航班每天只有一班。</p>",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/39/c6/3c96ded6828687d18f837cf9767196d9.jpg',
          "datePush": "2020-02-18 09:46:30",
          publishName: 'admin'
        },
        {
          "id": 6,
          "name": "开平碉楼",
          title: '很多海外华人都是从开平过去的。为什么要离开这美丽的地方呢？',
          "content": "<p>　　20世纪初期，流亡海外的开平人借鉴融合国外众多的建筑风格建造了这些碉楼，其中有伊斯兰风格，罗马风格甚至还有希腊风格。</p><p>　　碉楼既是财富的象征，也是保护当地居民免受战争和劫掠之苦的有效途径。现在开平广袤的田野里依然矗立着大约1800座碉楼。</p><p>　　开平位于广州西南方向130km处。</p><p>　　定期的班车往返于开平客运站和广州不同的长途客运站。开平和香港之间有直达公交和轮渡。</p>",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/c1/30/c310539a390a68d9508156cb6a5f59af.jpg',
          "datePush": "2020-02-18 10:03:42",
          publishName: 'admin'
        },
        {
          "id": 7,
          "name": "广西阳朔",
          title: '黄山传奇',
          "content": "<p>　　黄山被联合国教科文组织世界文化遗产评为“中国最美的山”，它也是许多中国人一生不渝的向往。</p><p>　　海拔1863米的黄山以其“奇松，怪石，云海，温泉”闻名于世。（中国古语说）黄山归来不看岳，足见对其推崇之至。</p><p>　　门票：3月—11月，230元/人，其余时间150元/人。</p><p>　　北京、上海、广州和西安等都有直达黄山机场的航班。</p>",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/0b/0b/00bb2bbaaa6eb9127d36268b782d9590.jpg',
          "datePush": "2020-02-18 10:23:22",
          publishName: 'admin'
        },
        {
          "id": 8,
          "name": "贵州黄果树瀑布",
          title: '大儒之美',
          "content": "<p>　　作为中国东南地区的主要标志和联合国教科文组织世界文化遗产名录之一，武夷山以其身为程朱理学的起源与发展地备受推崇。11世纪以来，程朱理学在东亚一直影响深远。</p><p>　　九曲河低谷的竹筏漂流很受游客欢迎，历时2小时，行程8千米的旅行让你一览壮丽的武夷美景。要欣赏武夷平缓的山峰，澄澈的河水，漂流绝对是最佳选择。</p><p>　　门票：武夷公园140元/人。竹筏漂流100元/次。</p><p>　　武夷山位于福建省会福州西北方向约350km处。上海，北京，广州和西安等都有直达福州机场的航班。</p>",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/2d/9b/29db95f26f4f5d0709ebb2af3bfaa841.jpg',
          "datePush": "2020-02-18 10:33:53",
          publishName: 'admin'
        },
        {
          "id": 9,
          "name": "海南南山海上观音像",
          title: '水墨画般美丽的景致绝非偶然',
          "content": "<p>　　不错，就这样一个看似普通的滩涂却深得中国摄影家的青睐。</p><p>　　虽然只是中国东南沿海的一个小地方，霞浦却拥有全国最大的滩涂——面积40万平方千米，还有延伸400多千米的海岸线。</p><p>　　狭长斑驳的滩涂上，三三两两的散布着竹房、竹篙、浮筒和渔具等器物。这些人工制品与此地美丽的自然景观交相辉映。</p><p>　　门票：免费。</p><p>　　霞浦滩涂周边最近的交通枢纽是福州市，距离景区约117km。</p><p>　　北京、上海、广州和西安等都有直达福州机场的航班。</p>",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/22/77/272710bc279fef9c0db05b6ef39b4c58.jpg',
          "datePush": "2020-02-18 12:09:44",
          publishName: 'admin'
        },
        {
          "id": 10,
          "name": "海南省亚龙湾",
          title: '戈壁之旅',
          "content": "<p>　　不，这可不是海市蜃楼！这是中国西北大戈壁滩上实实在在的风景！</p><p>　　环抱月牙泉的鸣沙山由一系列小山丘组成。鸣沙山以其独一无二的外形和随风而鸣的特点而闻名于世。风从山丘上刮过时，可以听到山体响亮的回声。游客可以骑骆驼爬上250米高的山丘。月牙泉边园林里盛开的繁花则与周围漫天的黄沙形成了有趣的对照。</p><p>　　门票：1-11月旺季120元/人，淡季60元/人。</p><p>　　鸣沙山和月牙泉位于敦煌南侧6km处。中国南航每天有往返于西安咸阳机场和敦煌机场的航班。中国国航位于北京和敦煌之间的航班每天只有一班。</p>",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/2d/4a/24da537dd3d576aabb59626ae2da2442.jpg',
          "datePush": "2020-02-18 12:23:26",
          publishName: 'admin'
        },
        {
          "id": 11,
          "name": "河北承德避暑山庄/热河行宫",
          title: '很多海外华人都是从开平过去的。为什么要离开这美丽的地方呢？',
          "content": "<p>　　20世纪初期，流亡海外的开平人借鉴融合国外众多的建筑风格建造了这些碉楼，其中有伊斯兰风格，罗马风格甚至还有希腊风格。</p><p>　　碉楼既是财富的象征，也是保护当地居民免受战争和劫掠之苦的有效途径。现在开平广袤的田野里依然矗立着大约1800座碉楼。</p><p>　　开平位于广州西南方向130km处。</p><p>　　定期的班车往返于开平客运站和广州不同的长途客运站。开平和香港之间有直达公交和轮渡。</p>",
          "imgUrl": 'http://cache.house.sina.com.cn/infodichan/dichanpic/c1/30/c310539a390a68d9508156cb6a5f59af.jpg',
          "datePush": "2020-02-18 12:29:42",
          publishName: 'admin'
        }
      ],
      loading: false,
      query: null
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    // 获取用户列表
    getList() {
      let {currentPage = 1, pageSize = 10, title = ''} = this.$route.query;
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
        url: '/scenicspot/back/getNewsPage',
        data
      }).then(({success, msg, data}) => {
      // selectNewsListByPage(data).then(res => {
        this.loading = false;
        console.log(data)
        if (success) {
          this.tableDate = data.records
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
    // 搜索
    search(){
      let { title} = this.user
      this.$router.replace({query: {...this.query,title, currentPage: 1}})
    },
    // 查看
    view(row) {
      this.$router.push({name:'scenicspotDetail',query:{id:row.id}})
    },
    // 编辑
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

<style lang="stylus">
.scenicspot-list
  padding-top 20px
</style>

