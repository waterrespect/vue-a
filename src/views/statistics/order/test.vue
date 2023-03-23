<template>

    <el-upload
    class="upload-demo"
    :action="fileUrl"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    list-type="picture">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

</template>
<script>
  export default {
    data() {
      return {
        fileUrl: 'http://localhost:100/api/oss/file/fileUpload',
        fileList: [
            {
            name: 'food.jpeg', 
            url: 'http://rjl00b71j.hn-bkt.clouddn.com/code/duck/2022-10-13-5e29792d9aea49df8dfb3faebabaf055.png'
            }
            ]
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>