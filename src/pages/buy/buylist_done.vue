<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="">
      <el-tab-pane label="货到付款" name="1">

        <donetable paytype1="1">
        </donetable>

      </el-tab-pane>
      <el-tab-pane label="款到发货" name="2">
        <donetable paytype1="2">
        </donetable>

      </el-tab-pane>
      <el-tab-pane label="预付款到发货" name="3">
        <donetable paytype1="3">
        </donetable>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import donetable from "@/components/bulist_done_components.vue"
  export default {
    data() {
      return {
        activeName: '1'
      }
    },
    components: {
      donetable
    },
    methods: {
      get_tableData() {
        this.$axios.post("/api/main/purchase/pomain/show", this.$qs.stringify({
          type: 2,
          paytype: 1
        })).then((resp) => {
          console.log(resp)
        })
      }
    },
  }

</script>
<style scoped>
</style>
