<template>
    <div>

      <link rel="stylesheet" href="/static/editor.md/css/editormd.css">

      <!-- editormd -->
      <!-- <button id="get-md-btn">Get Markdown</button> -->
      <!-- <button id="get-html-btn">Get HTML</button> -->

      <fieldset class="inn-account__item">
        <legend class="inn-account__item__title is-enabled-toggle">
          <span class="poi-label poi-label_primary">文章标题</span>
        </legend>
        <div class="inn-account__item__content is-expand">
          <input type="text" 
            name="postTitle" 
            class="poi-form__control" 
            title="文章标题（*）" 
            placeholder="文章标题（*）" 
            required="" value="" 
            style="font-size: 1.5rem;"
            v-model = "article.articleTitle"/>
        </div>
      </fieldset>

      <fieldset class="inn-account__item">
        <legend class="inn-account__item__title is-enabled-toggle">
          <span class="poi-label poi-label_primary">文章内容</span>
        </legend>
        <div id="editor" style="z-index: 10" />
      </fieldset>

      <fieldset class="inn-account__item">
        <legend class="inn-account__item__title is-enabled-toggle">
          <span class="poi-label poi-label_primary">缩略图</span>
        </legend>
        <el-upload
            class="avatar-uploader"
            v-loading="loading"
            :action="fileUrl"
            :show-file-list="false"
            :on-success="onUploadSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </fieldset>


      <fieldset class="inn-account__item">
        <legend class="inn-account__item__title is-enabled-toggle">
          <span class="poi-label poi-label_primary">分类/目录</span>
        </legend>


          <el-select
              v-model="Big_Category_Id"
              placeholder="请选择大分类"
              @change="BigCategoryChanged">
              <el-option
                  v-for="item in BigCategoryList"
                      :key="item.id"
                      :label="item.sortName"
                      :value="item.id"/>
          </el-select>

          <el-select
              v-model="Small_Category_Id"
              placeholder="请选择小分类"
              @change="CategoryChanged">
          <el-option
              v-for="item in CategoryList"
              :key="item.id"
              :label="item.sortName"
              :value="item.id"/>
          </el-select>

            {{Big_Category_Id}}
            {{Small_Category_Id}}
      </fieldset>


      <fieldset class="inn-account__item">
        <legend class="inn-account__item__title is-enabled-toggle">
          <span class="poi-label poi-label_primary">标签</span>
        </legend>
        <el-radio v-model="article.type" label="1">原创</el-radio>
        <el-radio v-model="article.type" label="2">转载</el-radio>
        <el-radio v-model="article.type" label="3">翻译</el-radio>
      </fieldset>

      <fieldset class="inn-account__item">
        <legend class="inn-account__item__title is-enabled-toggle">
          <span class="poi-label poi-label_primary">链接</span>
        </legend>

        <div class="inn-account__item__content is-expand">
          <input type="text" 
            name="postTitle" 
            class="poi-form__control" 
            title="链接（*）" 
            placeholder="链接（*）" 
            required="" value="" 
            style="font-size: 1.5rem;"
            v-model = "article.originalUrl"/>
        </div>

      </fieldset>

      <fieldset class="inn-account__item">
        <legend class="inn-account__item__title is-enabled-toggle">
          <span class="poi-label poi-label_primary">状态</span>
        </legend>
        <el-radio v-model="article.status" label="1">公开</el-radio>
        <el-radio v-model="article.status" label="2">私密</el-radio>
        <el-radio v-model="article.status" label="3">评论可见</el-radio>
      </fieldset>

      <el-button @click="save" type="primary" :loading="save_loading">{{button}}</el-button> <h1>{{success}}</h1>
      {{article}}

    </div>
  </template>
   
  <script>
  import scriptjs from 'scriptjs'
  import ossApi from '@/api/oss'
  import CategoryListApi from '@/api/sort'
  import articleApi from '@/api/article'
  const defaultForm = {
    id: '',// 文章id
    articleTitle: '',//  标题
    articleContent: '',//  内容
    articleContentHtml: '',// 富文本内容
    articleCover: '',//  缩略图
    categoryId: '',//分类id
    type: '',//类型
    originalUrl: '',// 原文链接
    status: ''// 状态
  }

  export default {
    name: 'EditorMarkdown',
    props: {
      modelValue: {
        type: String,
        required: true,
        default: ''
      },
      html: {
        type: String,
        required: true,
        default: 'null'
      },
      height: {
        type: String,
        required: false,
        default: '720px'
      }
    },

    data() {

      return {
        editor: {},
        ml: "",
        article : defaultForm,
        textHide:true,
        imgUrl: '',
        fileUrl: 'http://localhost:100/api/oss/file/fileUpload',
        loading: false,
        BigCategoryList: [],
        CategoryList: [],
        Big_Category_Id: '',//  大分类id
        Small_Category_Id: [],// 分类id,
        save_loading: false,
        success: '',
        button: '保存'
      }
    },

    // 生命周期函数：内存准备完毕，页面尚未渲染
    created() {
        //  调用省列表
        this.findAllCategory()
    },

    mounted() {
      // 设置延迟初始化markdown编辑器, 因为只会初始化一次，需要等待数据加载完成之后再初始化
      setTimeout(() => {
        this.initEditor()
      }, 300)
    },

    methods: {

//  获得文本html内容========================================================================================================================
      get_html() {
        this.article.articleContent = this.editor.getMarkdown()
        this.article.articleContentHtml = this.editor.getHTML()
        console.log("html => " + this.article.articleContentHtml)
        console.log("modelValue => " + this.article.articleContent)
      },
      //
      initEditor() {
        (async() => {
          await this.fetchScript('/static/editor.md/lib/jquery.js')
          await this.fetchScript('/static/editor.md/editormd.js')
          // await this.fetchScript('/static/editor.md/editormd.amd.js')
   
          this.$nextTick(() => {
            // 内容
            var content = this.modelValue
   
            const editor = window.editormd('editor', {
              path: '/static/editor.md/lib/',
              height: this.height,
              emoji: true,
              // 开启图片上传，图片上传重写了的
              saveHTMLToTextarea: true,
              // 可分区域定制样式主题
              theme        : (localStorage.theme) ? localStorage.theme : "dark",
              editorTheme  : (localStorage.editorTheme) ? localStorage.editorTheme : "3024-night",
              previewTheme : (localStorage.previewTheme) ? localStorage.previewTheme : "dark",
   
              imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp","ico"],
              // 这里需要考虑返回值，所以封装了一层
              imageUploadURL: '/markdown/upload', //需在服务端定义接口
              htmlDecode: true, // 识别html标签
              // 监听更新，更新父组件值
              change: function() {
                this.$emit('update:modelValue', this.getMarkdown())
              },
              // 退出全屏
              onfullscreen: function() {
                // 原生JS修改层级
                var editor = document.getElementById('editor')
                editor.style['z-index'] = 13
              },
              // 全屏
              onfullscreenExit: function() {
                // 原生JS修改层级
                var editor = document.getElementById('editor')
                editor.style['z-index'] = 10
              },
              // 加载完成后再设置内容
              onload: function() {
                this.setMarkdown(content)
                // 加载ctrl + v粘贴图片插件
                window.editormd.loadPlugin('/static/editor.md/plugins/image-handle-paste/image-handle-paste', function() {
                  editor.imagePaste()
                })
              }
            })
   
            const vm = this
            // 监听，改变父组件的值
            editor.on('change', function() {
              vm.$emit('update:modelValue', this.getMarkdown())
            })
   
            this.editor = editor
   
            // eslint-disable-next-line no-undef
            $("#get-md-btn").bind('click', function(){  //获取左侧Markdown内容
              alert(editor.getMarkdown());
            });
   
            // eslint-disable-next-line no-undef
            $("#get-html-btn").bind('click', function() { //获取右侧html内容
              alert(editor.getHTML());
            });
            
          })
        })()
      },

      fetchScript(url) {
        return new Promise((resolve) => {
          scriptjs(url, () => {
            resolve()
          })
        })
      },
//  获得文本html内容=======================================================================================================================

//  获得缩略图内容=======================================================================================================================
        onUploadSuccess(response, file) {
            this.loading = true
            if(response.code !== 200) {
                this.$message.error("上传失败")
                return
            }
            // 填充上传文件列表
            this.imgUrl = file.response.data
            this.article.articleCover = this.imgUrl
            this.loading = false
        },
        //  判断是否图像
        beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isPNG && !isJPG) {
            this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        //  在上传之前,删除已经存在的缩略图
        if('' != this.imgUrl) {
            console.log(this.imgUrl.replace("http://rjl00b71j.hn-bkt.clouddn.com/code/duck/", ""))
            //  删除缩略图
            ossApi.pic_delete(this.imgUrl.replace("http://rjl00b71j.hn-bkt.clouddn.com/code/duck/", ""))
        }
        if(isPNG) {
            return isPNG && isLt2M;
        }
        return isJPG && isLt2M;
        },
//  分类/目录=======================================================================================================================
        //  找到所有大分类
        findAllCategory() {
            CategoryListApi.Category_findByParentId(1).then(response => {
                this.BigCategoryList = response.data
            })
        },
        //  点击某个大分类，显示里面市
        BigCategoryChanged() {
            //  初始化
            this.categoryList = []
            //  调用方法
            CategoryListApi.Category_findByParentId(this.Big_Category_Id)
                .then(response => {
                    this.CategoryList = response.data
            })
            this.article.categoryId = this.Big_Category_Id
            this.Small_Category_Id = ''
        },

        CategoryChanged() {
          this.article.categoryId = this.Small_Category_Id
        },


//  每隔一段时间保存=======================================================================================================================
      save() { // 新开存档没有id，等保存后新建
        this.save_loading = true
        this.get_html()
        articleApi.saveorupdate(this.article).then(response => {
            this.article.id = response.data
            if(response.data == undefined || response.data.length <= 0) {
              this.success = "保存失败"
            } else {
              this.success = "保存成功"
            }
        })
        this.save_loading = false
      }
    }
  }
  </script>
   
  <style scoped>
  /* 上传图片弹窗样式有点问题，可能是冲突了 */
  #editor::v-deep(.editormd-dialog-header) {
    padding: 0 20px;
  }


  .show_input_image {
  position: absolute;
  left: 10px;
  width: 130px;
  height: 130px;
}
 .input_image {
  position: relative;
  width: 130px;
  height: 130px;
  background-color: blue;
  z-index: 999;
  opacity: 0;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  </style>
   
   
   