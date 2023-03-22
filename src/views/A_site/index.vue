<template>
  <div class="site-container">
    <div id="pt1" class="module-content">
      <div class="section-content">
        <p class="gradient-text">当前s3共{{ s3Count }}条</p>
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        <el-table :data="tableData" style="width: 100%" max-height="300">
          <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
          <el-table-column prop="sqlData" label="付款说明" class="sql_fee_type" />
          <el-table-column prop="new" label="操作">
            <template>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="searchSqlData"
                >查找</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="update">
            <template>
              <el-button type="primary" icon="el-icon-search">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
export default {
  name: "Site",
  components: { UploadExcelComponent },
  data() {
    return {
      s3Count: 100,
      tableData: [],
      tableHeader: [],
    };
  },
  computed: {},
  created() { },
  methods: {
    //  UploadExcel
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    },
    //  UploadExcel
    //  searchInfo
    searchSqlData() {
      for (var item of this.tableData) {
        this.$set(item, "sqlData", "随便谢谢");
        console.log(item["sqlData"]);
        console.log(typeof item);
      }
    },
  },
};
</script>
<style>
@import "~@/styles/site.scss";
</style>
