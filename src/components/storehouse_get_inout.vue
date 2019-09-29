<template>
  <div>

    <el-select v-model="payType1" placeholder="请选择">
      <el-option label="货到付款" value=1></el-option>
      <el-option label="款到发货" value=2></el-option>
      <el-option label="预付款到发货" value=3></el-option>
    </el-select>

    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column :prop="poAndSo" label="单号">
        </el-table-column>
        <el-table-column :prop="userAndVenderCode" label="供应商编号">
        </el-table-column>
        <el-table-column :prop="userAndVenderName" label="供应商名称">
        </el-table-column>
        <el-table-column prop="account" label="创建人">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column prop="productTotal" label="产品总价">
        </el-table-column>
        <el-table-column :prop="poAndSoTotal" label="总价">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="getin(scope.row)">{{caozuo}}</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        payType: "",
        page: "1",
        payType1: "1",
        tableData: [],

      }
    },
    props: ["geturl", "getinouturl", "poAndSo", "caozuo","poAndSoTotal","userAndVenderCode", "userAndVenderName"],
    methods: {
      updata_data() {
        console.log(this.poAndSoTotal)
        this.$axios.post(this.geturl, this.$qs.stringify({
          type: 3,
          payType: this.payType1,
          page: this.page
        })).then((resp) => {
          console.log(resp, "请求更新页面返回的数据")
          this.tableData = resp.data.list
          console.log(this.tableData, "tabledata替换后的数据")
        })
      },
      getin(val) {
        console.log(val)
        this.$axios.post(this.getinouturl, this.$qs.stringify({
          poId: val.poId,
          soId: val.soId,
          type: 3,
          payType: val.payType
        })).then((resp) => {
          console.log(resp)
          if (resp.data.code == 4) {
            alert(resp.data.message)
          } else {
            alert(resp.data.message)
            this.tableData = resp.data.data.list
          }
        })
      }
    },
    created() {
      this.updata_data()
    },
    watch: {
      payType1: {
        handler(newval, oldval) {
          this.updata_data()
          console.log(this.payType1)
        }
      }
    },
  }

</script>
<style scoped>
</style>
