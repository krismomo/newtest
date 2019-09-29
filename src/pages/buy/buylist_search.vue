<template>
  <div>
   
    <div style="width: 450px;margin:20px 300px">

      <el-form ref="form" :model="search_value" label-width="100px" >
        <el-form-item label="采购单编号">
          <el-input v-model="search_value.poId"></el-input>
        </el-form-item>
        <el-form-item label="供应商编号">
          <el-input v-model="search_value.venderCode"></el-input>
        </el-form-item>
        <el-form-item label="付款方式">
          <el-input v-model="search_value.payType"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-input v-model="search_value.startDate"></el-input>
        </el-form-item>
        <el-form-item label="截至日期">
          <el-input v-model="search_value.endDate"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="search_value.status"></el-input>
        </el-form-item>
        <el-form-item label="显示的页码">
          <el-input v-model="search_value.page"></el-input>
        </el-form-item>
      </el-form>
      <el-button slot="append" @click="search" icon="el-icon-search" style="width: 202px">筛选</el-button>
    </div>

    <el-dialog title="筛选" :visible.sync="dialog_search">
      <el-table :data="tableData">
        <el-table-column property="poId" label="采购单号"></el-table-column>
        <el-table-column property="account" label="创建人"></el-table-column>
        <el-table-column property="createTime" label="创建时间"></el-table-column>
        <el-table-column property="venderCode" label="供应商编号"></el-table-column>
        <el-table-column property="venderName" label="供应商姓名"></el-table-column>
        <el-table-column property="poTotal" label="采购总价"></el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>
<script>
  import donetable from "@/components/bulist_done_components.vue"
  export default {
    data() {
      return {
        tableData: [],
        search_value: {
          poId: "",
          venderCode: "",
          payType: "",
          startDate: "",
          endDate: "",
          status: "",
          page: ""
        },
        dialog_detail: false,
        dialog_search: false,
        search_data: "",
        select_search_value: "",
        select: ""

      }
    },
    watch: {
      select: {
        handler(newval, oldval) {

        }
      }
    },
    components: {
      donetable
    },
    methods: {
      search_detail() {
        this.$axios.post("/api/main/purchase/pomain/queryItem", this.$qs.stringify({
          poId: this.search_data
        })).then((resp) => {
          console.log(resp)
          if (resp.data.code == 4) {
            alert(resp.data.message)
          } else {
            this.tableData = resp.data
            this.dialog_detail = true
          }
        })
      },
      search() {
        this.$axios.post("/api/main/purchase/pomain/query", this.$qs.stringify(this.search_value)).then((resp) => {
          console.log(resp ,"筛选返回的数据")
          console.log(this.search_value ,"搜索的数据")

          this.tableData = resp.data.list
          this.dialog_search = true
          this.search_value = {
            poId: "",
            venderCode: "",
            payType: "",
            startDate: "",
            endDate: "",
            status: "",
            page: ""
          }
        })
      },
    }
  }

</script>
<style scoped>
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

</style>
