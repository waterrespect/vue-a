<template>
  <div class="app-container">
      添加
      <el-form label-width="120px">
         <el-form-item label="医院名称">
            <el-input v-model="hospitalSet.hosname"/>
         </el-form-item>
         <el-form-item label="医院编号">
            <el-input v-model="hospitalSet.hoscode"/>
         </el-form-item>
         <el-form-item label="api基础路径">
            <el-input v-model="hospitalSet.apiUrl"/>
         </el-form-item>
         <el-form-item label="联系人姓名">
            <el-input v-model="hospitalSet.contactsName"/>
         </el-form-item>
         <el-form-item label="联系人手机">
            <el-input v-model="hospitalSet.contactsPhone"/>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="saveorupdate">保存</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>


<script>
    import hospset from '@/api/hospset'
    export default {
        data() {
            return {
                hospitalSet:{} 
            }
        },
        created() {
            //  获取路由id值
            //  调用接口获得医院信息
            if(this.$route.params && this.$route.params.id) {
                const id = this.$route.params.id
                // alert(id)
                this.getHospSet(id)
            }
        },
        methods: {
            //  添加
            save() {
                hospset.saveHospSet(this.hospitalSet)
                    .then(response => {
                        //提示
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        })
                        //  跳转到列表页面,使用路由跳转方式
                        this.$router.push({path:'/hospset/list'})
                    })
            },
            //  根据id查询
            getHospSet(id) {
                hospset.getHospSet(id)
                    .then(response => {
                        this.hospitalSet = response.data
                    })
            },
            //  修改
            update() {
                    hospset.updateHospSet(this.hospitalSet)
                    .then(response => {
                        //提示
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        })
                        //  跳转到列表页面,使用路由跳转方式
                        this.$router.push({path:'/hospset/list'})
                    })
            },
            //  判断
            saveorupdate() {
                if(!this.hospitalSet.id) {
                    this.save();
                } else {
                    this.update();
                }
            },
        }
    }

</script>