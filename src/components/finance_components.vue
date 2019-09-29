<template>
  <div>
    组件
    <el-select v-model="form.payType" placeholder="请选择" @change="updata_sel">
      <el-option label="货到付款" value=1></el-option>
      <el-option label="款到发货" value=2></el-option>
      <el-option label="预付款到发货" value=3></el-option>
    </el-select>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="poId" label="采购单号"></el-table-column>
      <el-table-column prop="venderCode" label="供应商编号"></el-table-column>
      <el-table-column prop="venderName" label="供应商名称"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="poTotal" label="采购总价"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="payOrGet(scope.row)">{{payorget_text}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="updata_page" background layout="prev, pager, next" :total="pages*10">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        pages: "",
        form: {
          type: 4,
          payType: "",
          page: ""
        }
      }
    },
    props:["payorget_text","showurl","payorgeturl",],
    methods: {
      payOrGet(val) {
        this.$axios.post(this.payorgeturl, this.$qs.stringify({
          poId: val.poId,
        //   soId: val.soId,
          type: val.payType == 1 || val.payType == 2 ? 1 : 2
        })).then((resp) => {
            console.log(resp)
          alert(resp.data.message)
          this.updata()
        })
      },
      updata_sel() {
        console.log(this.form)
        this.$axios.post(this.showurl, this.$qs.stringify(this.form)).then((resp) => {
          console.log(resp)
          this.tableData = resp.data.list
          


        })
      },
      updata_page(page) {
        this.search_data.page = page
        this.$axios.post(this.showurl, this.$qs.stringify(this.form)).then((resp) => {
          console.log(resp)
          this.tableData = resp.data.list
        })
      },
      updata() {
        this.$axios.post(this.showurl, this.$qs.stringify(this.form)).then((resp) => {
        //   console.log(resp)
          this.tableData = resp.data.list
          this.pages = resp.data.pages
        })
      }
    },
    created() {
        this.updata()
    //   this.$axios.post("/api/main/purchase/pomain/show", this.$qs.stringify({
    //     type: 4,
    //     payType: this.payType1,
    //     page: this.page
    //   })).then((resp) => {
    //     console.log(resp)
    //     this.tableData = resp.data.list
    //     this.pages = resp.data.pages
    //   })
    },

  }

</script>
<style scoped>
</style>
