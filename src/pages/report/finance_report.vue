<template>
  <div>
    <!-- <span>收支报表</span> -->
    <!-- 收支报表没有表格 -->
    <div>
      <el-card class="box-card">
        <el-table :data="details">
          <el-table-column label="收款次数" prop="receCount"></el-table-column>
          <el-table-column label="收款总金额" prop="recePrice"></el-table-column>
          <el-table-column label="付款次数" prop="payCount"></el-table-column>
          <el-table-column label="付款总金额" prop="payPrice"></el-table-column>
        </el-table>
      </el-card>
    </div>



    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="收款明细" name="first">
        <reportcmp @seldate="updata_details" showurl="/api/main/report/payment/detail/receipt" :details="details"
          :propAndLabel="propAndLabel1" >
        </reportcmp>
      </el-tab-pane>
      <el-tab-pane label="付款明细" name="second">
        <reportcmp @seldate="updata_details" showurl="/api/main/report/payment/detail/pay"  :details="details"
          :propAndLabel="propAndLabel2" >
        </reportcmp>
      </el-tab-pane>
    </el-tabs>



  </div>
</template>
<script>
  import reportcmp from "@/components/report_components.vue"
  export default {
    data() {
      return {
        activeName: 'first',
        propAndLabel1: [{
            prop: "soid",
            label: "销售单编号"
          },
          {
            prop: "createTime",
            label: "销售日期"
          },
          {
            prop: "pay_time",
            label: "收款日期"
          },
          {
            prop: "pay_price",
            label: "收款金额"
          },
          {
            prop: "account",
            label: "经手人"
          },
          {
            prop: "status",
            label: "处理状态"
          }
        ],
        propAndLabel2: [{
            prop: "poid",
            label: "采购单编号"
          },
          {
            prop: "createTime",
            label: "采购日期"
          },
          {
            prop: "pay_time",
            label: "付款日期"
          },
          {
            prop: "pay_price",
            label: "付款金额"
          },
          {
            prop: "account",
            label: "经手人"
          },
          {
            prop: "status",
            label: "处理状态"
          }
        ],
        details: [{
          payCount: "",
          payPrice: "",
          receCount: "",
          recePrice: ""
        }],
        selmouth: ""
      }
    },
    // 这个监听是负责更新总详情的
    watch: {
      selmouth: {
        handler(newdate, olddate) {
          // console.log(newdate, "财务报表从组件拿到的日期")
          this.$axios.post("/api/main/report/payment/main", this.$qs.stringify({
            time: newdate,
          })).then((resp) => {
            // console.log(resp, "财务报表的更新")
            this.details[0].payCount = resp.data.payCount
            this.details[0].payPrice = resp.data.payPrice
            this.details[0].receCount = resp.data.receCount
            this.details[0].recePrice = resp.data.recePrice
            console.log(this.details,"更改主报表的更新")
          })
        }
      }
    },
    methods: {
      updata_details(data, selmouth1) {
      //  把子组件的日期传递调过来
        this.selmouth = selmouth1
        

  
      }
    },
    components: {
      reportcmp
    }
  }

</script>
<style scoped>
</style>
