<template>
  <div class="divstyle">
    <img src="/static/images/logo.png" alt="" style="margin-left: 20px">
    <div class="divstyle-radius">
      <span>用户账号:{{user.useraccount}}</span>
      <span><i class="el-icon-s-custom"></i></span>
      <!-- 后面改成从服务器拿数据 -->
      <span>{{user.username}}</span>
      <span><i class="el-icon-time"></i></span>
      <span>{{currentTime}}</span>
    </div>
    <!-- <router-link to="/login">登录</router-link> -->
  </div>
</template>
<script>
import {mapState} from 'vuex'
  export default {
    data() {
      return {
        timer: "", //定义一个定时器的变量
        currentTime: new Date(), // 获取当前时间
        
      }
    },
    // updated() {
    //   console.log(this.user)
    // },
    computed: {
      ...mapState(["user"])
    },
    created() {
      var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(function () {
        _this.currentTime = //修改数据date
          new Date().getFullYear() +
          "/" +
          (new Date().getMonth() + 1) +
          "/" +
          new Date().getDate() +
          " 上午" +
          new Date().getHours() +
          ":" +
          new Date().getMinutes() +
          ": " +
          new Date().getSeconds();
      }, 1000);
      // user.username= this.$Cookie.get("username")
      // console.log(user)
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    }
  }

</script>
<style scoped>
  .divstyle {
    width: 100%;
    height: 90px;
    background-color: #056DAF;
    display: flex;
    justify-content: space-between;
    align-items: center
  }

  .divstyle-radius {
    /* width: 300px; */
    height: 30px;
    border-radius: 15px;
    background-color: #034F78;
    margin-right: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
    padding: 0px 10px
  }

</style>
