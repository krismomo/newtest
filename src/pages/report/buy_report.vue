<template>
  <div>
    <!-- <span>采购报表</span> -->
    <div>
      <el-card class="box-card">
        <el-table :data="details">
          <el-table-column label="采购单总数" prop="totalnum">
            
          </el-table-column>
          <el-table-column label="已了结数" prop="endtotalnum">
            
          </el-table-column>
          <el-table-column label="采购单总金额" prop="pototal">
            
          </el-table-column>
          <el-table-column label="已付款金额" prop="totalpay">
            
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <reportcmp  @seldate="updata_details" showurl="/api/main/report/pomain/main" :details="details" :propAndLabel="propAndLabel" idaaa="id11">
    </reportcmp>
  </div>
</template>
<script>
  import reportcmp from "@/components/report_components.vue"
  export default {
    data() {
      return {
        propAndLabel: [{
            prop: "poId",
            label: "采购单编号"
          },
          {
            prop: "venderCode",
            label: "供应商编号"
          },
          {
            prop: "venderName",
            label: "供应商名称"
          },
          {
            prop: "createTime",
            label: "创建时间"
          },
          {
            prop: "account",
            label: "创建用户"
          },
          {
            prop: "payType",
            label: "付款方式"
          },
          {
            prop: "payUser",
            label: "付款人"
          },
          {
            prop: "poTotal",
            label: "采购总价"
          },
          {
            prop: "endTime",
            label: "了结时间"
          },
          {
            prop: "endUser",
            label: "了结账号"
          },
        ],
        details: [
            {endtotalnum:"",
            pototal:"",
            totalnum:"",
            totalpay:""}
        ]
      }
    },methods: {
        updata_details(data){
            console.log(data ,"子组件传递的值")
            this.details[0].endtotalnum=data.endtotalnum
            this.details[0].pototal=data.pototal
            this.details[0].totalnum=data.totalnum
            this.details[0].totalpay=data.totalpay
            console.log(this.details,"父组件里的detail")
        }
    },
    components: {
      reportcmp
    }
  }

</script>
<style scoped>
</style>
