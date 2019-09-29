<template>
    <div>
        <!-- <span>采购报表</span> -->
        <div>
                <el-card class="box-card">
                  <el-table :data="details">
                    <el-table-column label="出库单据数" prop="total">
                      
                    </el-table-column>
                    <el-table-column label="产品总数量" prop="totalNum">
                      
                    </el-table-column>
                    <el-table-column label="出库产品总金额" prop="productTotal">
                      
                    </el-table-column>
                  </el-table>
                </el-card>
              </div>

        <reportcmp  @seldate="updata_details" showurl="/api/main/report/outstock/main" :propAndLabel="propAndLabel" idaaa="id11"></reportcmp>
    </div>
</template>
<script>
    import reportcmp from "@/components/report_components.vue"
export default {
    data() {
        return {
            propAndLabel:[
                {prop:"soId",label:"销售单号"},
                {prop:"stockTime",label:"出库日期"},
                {prop:"productCode",label:"产品编号"},
                    {prop:"name",label:"产品名称"},
                    {prop:"stockNum",label:"产品数"},
                    {prop:"productTotal",label:"产品总金额"}
            ],details: [
            {productTotal:"",
            total:"",
            totalNum:""}
        ]
      }
    },methods: {
        updata_details(data){
            console.log(data ,"子组件传递的值")
            this.details[0].productTotal=data.productTotal
            this.details[0].total=data.total
            this.details[0].totalNum=data.totalNum

            console.log(this.details,"父组件里的detail")
        }
    },
    components:{reportcmp}
}
</script>
<style scoped>
</style>