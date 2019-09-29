<template>
  <div>
    <el-date-picker v-model="selmouth" value-format="yyyy-MM" type="month" placeholder="选择月" @change="sel_mouth">
    </el-date-picker>
    

    <el-table :data="tableData">
      <el-table-column v-for="(item,index) in this.propAndLabel" :key="index" :prop="item.prop" :label="item.label"></el-table-column>
    </el-table>

    <el-pagination background @current-change="change_page" layout="prev, pager, next" :total="pages*10">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        datas:{},
        selmouth: "",
        pages: "",
        page: ""

      }
    },
    watch: {
      selmouth: {
        handler(newdate, olddate) {
          console.log(newdate)
          this.$axios.post(this.showurl, this.$qs.stringify({
            time: newdate,
            page: this.page
          })).then((resp) => {
            this.$emit("seldate",resp.data,this.selmouth)
            console.log(resp,"选择日期后更新的数据")
            console.log(this.tableData,"覆盖tabledata的更新")
            if(!resp.data.details){
              this.tableData=resp.data.list
              this.pages=resp.data.pages
            }else{
              this.pages=resp.data.details.pages
              this.tableData=resp.data.details.list
            }
            this.datas=resp.data
          })
        }
      }
    },
    props: ["showurl","propAndLabel"],
    methods: {
      change_page(page){
        // console.log(this.selmouth,"点击页码的提示")
        // console.log(page)
        this.page=page
        this.$axios.post(this.showurl, this.$qs.stringify({
            time: this.selmouth,
            page: this.page
          })).then((resp) => {
            // console.log(resp,"选择日期后更新的数据")
            if(!resp.data.details){
              this.tableData=resp.data.list
              this.pages=resp.data.pages
            }else{
              this.pages=resp.data.details.pages
              this.tableData=resp.data.details.list
            }
            
          })
      },
      updata() {
        
        this.$axios.post(this.showurl, this.$qs.stringify({
          time: this.selmouth,
          page: this.page
        })).then((resp) => {
          // console.log(resp)
        })
      },
      sel_mouth(mouth) {
        // console.log(mouth)
      }
    },
    created() {
      this.updata()
    //   console.log(this.propAndLabel)
    //   console.log(this.idaaa)
    },
  }

</script>
<style scoped>
</style>
