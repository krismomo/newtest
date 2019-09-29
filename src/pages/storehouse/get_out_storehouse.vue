<template>
        <div>
            <storehousegetinout geturl="/api/main/sell/somain/show" getinouturl="/api/main/stock/outstock" poAndSo="soId" caozuo="出库" poAndSoTotal="soTotal" userAndVenderCode="customerCode" userAndVenderName="customerName">
              
            </storehousegetinout>
      
      
        </div>
      </template>
      <script>
        import storehousegetinout from "@/components/storehouse_get_inout.vue"
        export default {
          data() {
            return {
              payType: "",
              page: "1",
              payType1: "1",
              tableData: []
            }
          },
          components:{storehousegetinout}
        //   methods: {
        //     updata_data() {
        //       this.$axios.post("/api/main/purchase/pomain/show", this.$qs.stringify({
        //         type: 3,
        //         payType: this.payType1,
        //         page: this.page
        //       })).then((resp) => {
        //         console.log(resp)
        //         this.tableData = resp.data.list
        //       })
        //     },
        //     getin(val) {
        //       console.log(val)
        //       this.$axios.post("/api/main/stock/instock",this.$qs.stringify({poId:val.poId,type:3,payType:val.payType})).then((resp)=>{
        //           console.log(resp)
        //           if(resp.data.code==4){
        //               alert(resp.data.message)
        //           }else{
        //               alert(resp.data.message)
        //               this.tableData=resp.data.data.list
        //           }
        //       })
        //     }
        //   },
        //   created() {
        //     this.updata_data()
        //   },
        //   watch: {
        //     payType1: {
        //       handler(newval, oldval) {
        //         this.updata_data()
        //         console.log(this.payType1)
        //       }
        //     }
        //   },
        }
      
      </script>
      <style scoped>
      </style>
      