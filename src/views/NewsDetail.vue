<template>
  <div class="news-details" style="padding-top: 20px">
    <h2 style="text-align:left">新增新闻</h2>
      <el-form  :model="newsForm" :rules="userRules" ref="newsForm" label-width="60px" class="demo-ruleForm" style="margin-top:20px">
          <el-form-item prop="title" label="标题">
            <el-col :span="20">
              <el-input
                v-model.trim="newsForm.title"
                placeholder="请输入标题"
                size="medium"
                maxLength="30"
                clearable
                :disabled="!modify"
                type="text">
              </el-input>
            </el-col>
          </el-form-item>
          
          <el-form-item prop="content" v-if="modify">
            <el-col :span="22">
              <div class="clear-form-style">
                <quill-editor v-model="newsForm.content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @textChange="textChange"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
                </quill-editor>
              </div>
            </el-col>
          </el-form-item>
      </el-form>
      <el-upload
        style="display:none"
        ref="uploadIcon"
        :action="`${BASE_URL}/scenicspot/back/upload`"
        :on-success="handleSuccess"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
        :on-error="handleError"
        :before-upload="beforeUpload"
        accept=".jpg,.png,.jpeg,.gif"
        :limit="1"
        :file-list='fileList'
        :show-file-list="false"
        :data="{type: 4, authCode: getAuthCode($route)}">
        <el-button slot="trigger" size="medium" type="primary" id="imgInput"></el-button>
      </el-upload>
      <el-row v-if="!modify">
        <el-col :span="22">
          <div class="ql-container ql-snow margin-left">
              <div class="ql-editor" v-html="newsForm.content"></div>
          </div>
        </el-col>
      </el-row>
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
/* eslint-disable no-unused-vars */
// import {getNewsDetails,addNews,editNews} from '@/utils/getData'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '../../src/assets/quillSize.css'
// import { getAuthCode } from '@/utils/util'

import { quillEditor ,Quill} from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module'

// import func from '../../vue-temp/vue-editor-bridge'
Quill.register('modules/imageResize', ImageResize)

console.log(ImageResize);

const fontSizeStyle = Quill.import('attributors/style/size');
fontSizeStyle.whitelist = ['10px', false, '14px', '16px', '20px', '24px','32px','36px'];
Quill.register(fontSizeStyle, true);

const BASE_URL = 'http://947255bcd7d3.ngrok.io/'

export default {
  components: {
    quillEditor
  },
  data() {
    const validateLength= (rule, value, callback) => {
      let length = this.$refs.myQuillEditor.quill.getLength();
      if (rule.required && !value) {
        callback(new Error(`${rule.text}不能为空`));
      }else{
        if ((length-1) > rule.max ) {
          callback(new Error(`${rule.text}最多${rule.max}个字，当前超出${length - rule.max - 1}个字`));
        }else{
          callback()
        }
      }
    };
    return {
      BASE_URL,
      picUrls: [],
      coverImg: '',
      iconUrls:[], 
      fileList:[],
      loveList: [],
      getAuthCode: function() {},  
      contentLength:0,
      newsForm: {
        // title:'海底捞供应链调查 | 一锅红汤“养活”10多家关联公司',
        // id: '',
        // // eslint-disable-next-line no-useless-escape
        // content:'<p><span style=\"font-size: 16px;\">在经历了多年的传言之后，国内餐饮业巨头海底捞上市终于迎来实质性动作。5月17日晚间，海底捞在开曼群岛注册的海底捞国际控股公司向港交所递交了招股书。</span></p><p><span style=\"font-size: 16px;\">透过海底捞招股书可见，海底捞IPO不仅能让公司创始人获益匪浅，也揭开了海底捞董事长张勇背后的资本帝国，同时，依靠“一锅红汤”而不断壮大的企业也浮出水面。</span></p><p><span style=\"font-size: 16px;\">张勇的资本帝国</span></p><p><span style=\"font-size: 16px;\"><img src=\"https://hdl-emas-app-bucket.oss-cn-beijing.aliyuncs.com/app/news/image/ffe009c3e57d40cf8ab0b45e940b89e7-340-228.png\"><img src=\"https://hdl-emas-app-bucket.oss-cn-beijing.aliyuncs.com/app/news/image/36ce572fa16d4d7f8a6fcccc8dd08df2-340-228.png\"></span></p><p><span style=\"font-size: 16px;\">彼时，1994年，海底捞董事长张勇和他的小伙伴们，四个人合伙在四川省简阳市创办了一家名为“海底捞火锅城”的火锅店，那时火锅店里只有四张桌子。</span></p><p><span style=\"font-size: 16px;\">如今，海底捞在招股书中公布，目前运营的餐厅数量达到了320家，包括中国内地的296家餐厅以及24家位于中国台湾、中国香港以及海外在新加坡、韩国、日本及美国的餐厅。</span></p><p><span style=\"font-size: 16px;\">海底捞还表示，上市募集资金后，海底捞计划将募资的60%用于扩张，20%拟用于研发和实施新技术，15%拟用于还贷，5%作为一般营运资金使用。</span></p><p><span style=\"font-size: 16px;\">伴随着海底捞招股书的面世，公司掌门人张勇的资本帝国也浮出水面。虽然这是海底捞首次上市，但与之有关联的两家公司早已涉足资本市场。一家是颐海国际，另一家是优鼎优。</span></p><p><span style=\"font-size: 16px;\">2016年，作为海底捞底料独家供应商的颐海国际登陆香港交易所；2017年，海底捞旗下冒菜品牌优鼎优登陆新三板。</span></p><p><span style=\"font-size: 16px;\">资料显示，颐海国际的实际控制人是张勇夫妇，直接持股35.59%，并通过合计持股68%的静远投资间接持有颐海国际50%的股份。颐海国际的现任董事长施永宏乃张勇海底捞的合伙创始人。</span></p><p><span style=\"font-size: 16px;\">据公司年报显示，火锅底是料颐海国际主要的收入来源，占全年收入的79%。</span></p>'
      },
      editorOption: {
        placeholder: '输入内容...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            // [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'size': ['10px', false, '14px', '16px', '20px', '24px','32px', '36px'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          syntax: {
            // eslint-disable-next-line no-undef
            highlight: text => hljs.highlightAuto(text).value
          },
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          }
        }
      },
      isEdit: false,
      deparments:[],
      depMap: {},
      sexOptions: [
        {
          value: '0',
          label: '女'
        },
        {
          value: '1',
          label: '男'
        }
      ],
      roleOptions: [],
      userRules:  {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
        content: [
          { required: true, validator:validateLength, trigger: 'blur',max:10000,text:"新闻内容" },
        ],
      },
      roleIsNull: false,
      detals:{},
      id:this.$route.query.id,
      modify:this.$route.query.modify
    }
  },
  created() {
    if (this.id) {
      this.getNews()
    }
  },
  mounted() {
    if (this.modify) {
      var vm =this
      var imgHandler = async function(state) {
        vm.addImgRange = vm.$refs.myQuillEditor.quill.getSelection()
        if (state) {
          let fileInput = document.getElementById('imgInput')
          // console.log(fileInput);
          fileInput.click()
        }
      }
      vm.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
    }
  },
  methods: {
    
    getNews() {
      this.$api.get({
        url: '/news/back/getNews',
        data: {
          id: this.id
        }
      }).then(({success, msg, data}) => {
        if (success) {
          // this.$router.push('administrator');
          // this.loveList = data;
          console.log(data,'9838838338ss');
          // this.newsForm = data
          this.$set(this.newsForm, 'title', data.name)
          this.$set(this.newsForm, 'content', data.context)
          this.$set(this.newsForm, 'id', data.id)

        }
        else {
          this.$message.error(msg)
        }
      }, ({msg}) => {
        this.$message.error(msg)
      })
    },
    getScenicspotType() {
      this.$api.get({
        url: '/scenicspotType/getList',
        data: {}
      }).then(({success, msg, data}) => {
        if (success) {
          // this.$router.push('administrator');
          this.loveList = data;
          console.log(data,'ssssssss');
        }
        else {
          this.$message.error(msg)
        }
      }, ({msg}) => {
        this.$message.error(msg)
      })
    },
    handleSuccess(res, files, fileList){
      console.log(res, files, fileList, 'ssss');
      // let value = res.data.absoluteUrl
      let value = BASE_URL + res.data
      this.$refs.myQuillEditor.quill.insertEmbed(this.addImgRange != null?this.addImgRange.index:0, 'image', value);
      this.fileList = []
    },
    onSuccess(res) {
      console.log(res);
      if (res.success) {
        this.coverImg = BASE_URL + res.data
      }
      else {
        this.$message.error(res.msg)
      }
    },
    beforeUpload(file){},
    handleError(err, files, fileList){},
    handleRemove(files, fileList){},
    handleExceed(files, fileList) {},
    onEditorReady(){},
    onEditorFocus(){},
    textChange(v){
      
    },
    onEditorBlur(quill){
      this.$refs.newsForm.validateField('content',(error) =>{ console.log(quill, error);})
    },
    // 确认提交
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate((valid) => {     
        if (valid) {
          // let imgList = this.newsForm.content.match(/<img[^>]+>/g),imgUrl;
          // // eslint-disable-next-line no-useless-escape
          // imgList && imgList.length && (imgUrl = imgList[0].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1])
          // this.id ? this.edit(imgUrl) : this.add(imgUrl);
          console.log(this.newsForm)
          this.addNews()
        }
      });
    },
    addNews(){
      let {id, title, content} = this.newsForm
      this.$api.post({
        url: '/news/back/saveNews',
        data: {
          id,
          name: title,
          context: content
        }
      }).then(({success, msg}) => {
        if (success) {
          console.log('addnews success')
          this.$router.go(-1)

        }
        else {
          this.$message.error(msg)
        }
      }, ({msg}) => {
        this.$message.error(msg)
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
left-space = 30px
.news-details
  padding 50px 0
  // background-color #fff
  .img-show
    // width 100%
    height 100%
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