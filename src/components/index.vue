<template>
  <div id="app">
    <el-container >
      <el-header style="height: 90px;width:100%">
        <headinfo class="headinfostyle"></headinfo>
      </el-header>
      <el-container style="height: 550px">
        <el-aside width="200px">
          <asideinfo></asideinfo>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>


  </div>
</template>

<script>
  import headinfo from '@/components/head.vue'
  import asideinfo from '@/components/aside.vue'
  import contentinfo from '@/components/content.vue'
  export default {
    name: 'App',
    components: {
      headinfo,
      contentinfo,
      asideinfo
    },
    methods: {
     
    },
    // created() {
    //   index()
    // },
  }

</script>
<style>
  .headinfostyle {
    width: 100%;
    height: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
    /* color: #333; */
    /* text-align: center; */
    line-height: 90px;
    padding: 0px
  }

  .el-aside {
    background-color: #F0F9FD;
    /* color: #333; */
    /* text-align: center; */
    /* line-height: 500px; */
  }

  .el-main {
    background-color: #E9EEF3;
    /* color: #333; */
    text-align: center;
    /* line-height: 500px; */
    padding: 0px
  }

  body>.el-container {
    margin-bottom: 40px;
  }
  body{
      margin: 0px
  }


</style>
