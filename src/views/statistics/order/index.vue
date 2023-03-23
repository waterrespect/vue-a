<template>
    <div>
        <h1>缩略图</h1>
        <el-upload
            class="avatar-uploader"
            :action="fileUrl"
            :show-file-list="false"
            :on-success="onUploadSuccess"
            :before-upload="beforeAvatarUpload">

            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>

        </el-upload>

        <h1>路径:{{imgUrl}}</h1>

    </div>

</template>

<script>
    import ossApi from '@/api/oss'
    export default {
    

    data() {
      return {
        fileUrl: 'http://localhost:100/api/oss/file/fileUpload',
        textHide:true,
        imgUrl: ''
      }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imgUrl = URL.createObjectURL(file.raw);
        },

        onUploadSuccess(response, file) {
            if(response.code !== 200) {
                this.$message.error("上传失败")
                return
            }
            // 填充上传文件列表
            this.imgUrl = file.response.data
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

    },

    created: function () {
    }
}
</script>

<style>

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