<template>
  <div>
    <!-- <span>采购报表</span> -->

    <div>
      <el-card class="box-card">
        <el-table :data="details">
          <el-table-column label="销售单数" prop="totalnum">

          </el-table-column>
          <el-table-column label="已了结单数" prop="endtotalnum">

          </el-table-column>
          <el-table-column label="销售总金额" prop="sototal">

          </el-table-column>
          <el-table-column label="已付款金额" prop="totalpay">

          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <reportcmp  @seldate="updata_details" showurl="/api/main/report/somain/main" :propAndLabel="propAndLabel" idaaa="id11"></reportcmp>
  </div>
</template>
<script>
  import reportcmp from "@/components/report_components.vue"
  export default {
    data() {
      return {
        propAndLabel: [{
            prop: "soId",
            label: "销售单编号"
          },
          {
            prop: "customerCode",
            label: "购买用户编号"
          },
          {
            prop: "customerName",
            label: "购买用户名称"
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
            prop: "soTotal",
            label: "购买总价"
          },
          {
            prop: "remark",
            label: "备注"
          }
        ],
        details: [
            {endtotalnum:"",
            sototal:"",
            totalnum:"",
            totalpay:""}
        ]

      }
    },methods: {
        updata_details(data){
            console.log(data ,"子组件传递的值")
            this.details[0].endtotalnum=data.endtotalnum
            this.details[0].sototal=data.sototal
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
