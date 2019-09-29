<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="poId" label="采购单编号">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
      </el-table-column>
      <el-table-column prop="venderName" label="供应商名称">
      </el-table-column>
      <el-table-column prop="account" label="创建用户">
      </el-table-column>
      <el-table-column prop="tipFee" label="附加费用">
      </el-table-column>
      <el-table-column prop="productTotal" label="产品采购总价">
      </el-table-column>
      <el-table-column prop="poTotal" label="采购总价">
      </el-table-column>
      <el-table-column prop="payType" label="付款方式">
        <template slot-scope="scope">
          <span>{{scope.row.payType==1?'货到付款':scope.row.payType==2?'款到发货':scope.row.payType==3?'预付款到发货':''}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="prePayFee" label="最低预付款金额">
      </el-table-column>
      <el-table-column prop="status" label="处理状态">
        <template slot-scope="scope">
          <span>{{scope.row.status==2?'已收货':scope.row.status==3?'已付款':''}}</span>
        </template>
      </el-table-column>
      <el-table-column label="了结">
        <template slot-scope="scope">
          <el-button type="primary" @click="done_buylist(scope.row.poId)">了结</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background @current-change="change_page" layout="prev, pager, next" :total="pages*10">
    </el-pagination>

  </div>
</template>
<script>
  export default {
    props: ["paytype1"],
    data() {
      return {
        tableData: [],
        pages: "",
        page:""
      }
    },
    methods: {
      change_page(data){
        console.log(data)
        this.updata_tableData(data)

      },
      done_buylist(data) {
        // console.log(data)
        this.$axios.post("/api/main/purchase/pomain/end", this.$qs.stringify({
          type: 2,
          poId: data
        })).then((resp) => {
          console.log(resp, '删除按钮的resp')
          // this.tableData = resp.data.data.list
          this.updata_tableData(1)
          alert(resp.data.message)
        })
      },
      updata_tableData(page1) {
        this.$axios.post("/api/main/purchase/pomain/show", this.$qs.stringify({
          page:page1,
          type: 2,
          payType: this.paytype1
        })).then((resp) => {
          console.log(resp, '更新页面的resp')
          this.tableData = resp.data.list
          this.pages=resp.data.pages
        })
      }
    },
    created() {
      // console.log(this.paytype1,2222)
      this.updata_tableData(1)
      
    },

  }

</script>
<style scoped>
</style>
