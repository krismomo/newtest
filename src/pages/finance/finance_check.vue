<template>
  <div>
    <!-- <span>财务查询</span> -->
    <el-card class="box-card" width>
      <div style="width:400px;margin: 20px 313px">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="起始日期">
            <el-date-picker v-model="form.startDate" type="date" style="width: 300px" placeholder="选择起始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期">
            <el-date-picker v-model="form.endDate" type="date" style="width: 300px" placeholder="选择结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="收支类型">
            <el-select v-model="form.type" placeholder="请选择" style="width:300px">
              <el-option label="支出" value="支出"></el-option>
              <el-option label="收入" value="收入"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单据付款方式">
            <el-select v-model="form.payType" placeholder="请选择" style="width:300px">
              <el-option label="货到付款" value="1"></el-option>
              <el-option label="款到发货" value="2"></el-option>
              <el-option label="预付款到发货" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="相关单据号">
            <el-input v-model="form.no"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <el-button type="primary" @click="sub_form">提交</el-button>
    </el-card>


    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="payTime" label="付款(收款)日期" >
        </el-table-column>
        <el-table-column prop="ordercode" label="相关单据号" >
        </el-table-column>
        <el-table-column prop="payPrice" label="付款(收款)金额" >
        </el-table-column>
        <el-table-column prop="account" label="经手人">
        </el-table-column>
        <el-table-column prop="payType" label="单据付款方式">
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          startDate: "",
          endDate: "",
          type: "收入",
          payType: "",
          no: "",
          page: "",
        },
        tableData: []
      }
    },
    methods: {
      sub_form() {
        this.$axios.post("/api/main/finance/query", this.$qs.stringify(this.form)).then((resp) => {
          console.log(resp)
          this.tableData = resp.data.list
        })
      }
    }
  }

</script>
<style scoped>
</style>
