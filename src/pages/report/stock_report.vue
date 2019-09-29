<template>
  <div>

    <div>
      <el-card class="box-card">
        <el-table :data="details">
          <el-table-column label="总数" prop="totalNum"></el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- <span>库存报表</span> -->
    <reportcmp  @seldate="updata_details" showurl="/api/main/report/stock/main" :details="details" :propAndLabel="propAndLabel" idaaa="id11">
    </reportcmp>
  </div>
</template>
<script>
  import reportcmp from "@/components/report_components.vue"
  export default {
    data() {
      return {
        propAndLabel: [{
            prop: "ProductCode",
            label: "产品编号"
          },
          {
            prop: "name",
            label: "产品名称"
          },
          {
            prop: "num",
            label: "库存数"
          }
        ],
        details: [
            {totalNum:"",
            }
        ]

      }
    },methods: {
        updata_details(data){
            console.log(data ,"子组件传递的值")
            this.details[0].totalNum=data.totalNum
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
