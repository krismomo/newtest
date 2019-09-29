<template>
  <div>
    <el-collapse>
      <el-collapse-item>
        <template slot="title">
          <i class="header-icon el-icon-circle-plus" style="font-size:20px;margin-left: 46%"></i>
          查询
        </template>
        <div style="width:800px;margin-left: 150px">
            <el-form v-model="search_data" :inline="true">
                <el-form-item  label="产品编号" label-width="130px">
                    <el-input v-model="search_data.productCode"></el-input>
                </el-form-item>
                <el-form-item  label="产品名称" label-width="130px">
                    <el-input v-model="search_data.name"></el-input>
                </el-form-item>
                <el-form-item  label="库存数量最小值" label-width="130px">
                    <el-input v-model="search_data.min"></el-input>
                </el-form-item>
                <el-form-item  label="库存数量最大值" label-width="130px">
                    <el-input v-model="search_data.max"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="search1">搜索</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-table :data="tableData">
      <el-table-column label="分类编号" prop="categoryId" width="90"></el-table-column>
      <!-- <el-table-column label="分类名称" prop="categoryName"></el-table-column> -->
      <el-table-column label="产品编号" prop="productCode" width="100"></el-table-column>
      <el-table-column label="名称" prop="name" width="100"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="计量单位" prop="unitName" width="80"></el-table-column>
      <el-table-column label="数量" prop="num" width="80"></el-table-column>
      <el-table-column label="入库数量" prop="poNum" width="80"></el-table-column>
      <el-table-column label="出库数量" prop="soNum" width="80"></el-table-column>
      <el-table-column label="创建日期" prop="createDate"></el-table-column>
      <el-table-column label="备注" prop="productCode"></el-table-column>
      <el-table-column label="查询库存记录"  width="200">
        <template slot-scope="scope">
          <el-button @click="search_detail_in(scope.row)">入库</el-button>
          <el-button @click="search_detail_out(scope.row)">出库</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 入库的弹出框 -->
    <el-dialog title="入库" :visible.sync="dialog_in">
        <el-table :data="tableData_in">
          <el-table-column prop="stockTime" label="入库时间"  ></el-table-column>
          <el-table-column prop="orderCode" label="相关采购单号" ></el-table-column>
          <el-table-column prop="createUser" label="入库经手人"></el-table-column>
          <el-table-column prop="stockNum" label="入库数量"></el-table-column>
          <el-table-column prop="stockType" label="入库类型"></el-table-column>
        </el-table>
      </el-dialog>
      <!-- 出库的弹出框 -->
      <el-dialog title="出库" :visible.sync="dialog_out">
          <el-table :data="tableData_out">
            <el-table-column prop="stockTime" label="入库时间" ></el-table-column>
            <el-table-column prop="orderCode" label="相关销售单号" ></el-table-column>
            <el-table-column prop="createUser" label="入库经手人"></el-table-column>
            <el-table-column prop="stockNum" label="入库数量"></el-table-column>
            <el-table-column prop="stockType" label="入库类型"></el-table-column>
          </el-table>
        </el-dialog>


    <el-pagination @current-change="updata_page" background layout="prev, pager, next" :total="pages*10">
        </el-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        search_data: {
          productCode: "",
          name: "",
          min: "",
          max: "",
          page: ""
        },
        pages:"",
        tableData_in:[],
        tableData_out:[],
        dialog_in:false,
        dialog_out:false,



      }
    },
    methods: {
      updata_page(page){
        this.search_data.page=page
        this.$axios.post("/api/main/stock/query",this.$qs.stringify(this.search_data)).then((resp) => {
        console.log(resp)
        this.tableData = resp.data.list
        this.search_data= {
          productCode: "",
          name: "",
          min: "",
          max: "",
          page: ""
        }
 
      })
      },
      search1(){
        this.$axios.post("/api/main/stock/query",this.$qs.stringify(this.search_data)).then((resp) => {
        console.log(resp)
        this.tableData = resp.data.list
        this.search_data= {
          productCode: "",
          name: "",
          min: "",
          max: "",
          page: ""
        }
      })
      },
      search_detail_in(val){
        // console.log(val)
        this.$axios.post("api/main/stock/alterRecord",this.$qs.stringify({productCode:val.productCode,stockType:1})).then((resp)=>{
          console.log(resp)
          this.tableData_in=resp.data.data.list
          this.dialog_in=true
        })

      },
      search_detail_out(val){
        // console.log(val)
        this.$axios.post("api/main/stock/alterRecord",this.$qs.stringify({productCode:val.productCode,stockType:2})).then((resp)=>{
          console.log(resp)
          this.tableData_out=resp.data.data.list
          this.dialog_out=true
        })

      },
    },
    created() {
      this.$axios.post("/api/main/stock/query").then((resp) => {
        console.log(resp)
        this.tableData = resp.data.list
        this.pages=resp.data.pages
      })
    },
  }

</script>
<style scoped>
</style>
