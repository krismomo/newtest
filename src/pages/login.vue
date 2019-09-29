<template>
  <div style="display: flex;justify-content: center">
    
    <el-card class="box-card" shadow="hover">
      <div class="card_col">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <br>
        <span style="font-size:2em;color:#606266">登 录</span>
      </div>
      <div class="card_col">
        <el-input clearable v-model="user.username" placeholder="账号"></el-input>
      </div>
      <div class="card_col">
        <el-input clearable v-model="user.password" placeholder="密码" show-password></el-input>
      </div>
      <div class="card_col">
        <el-button class="border_radius20" type="primary" @click="login( )">提交</el-button>
      </div>
    </el-card>
    
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  // import axios from 'axios'
  const qs = require('querystring')
  export default {

    data() {
      return {
        user: {
          username: "",
          password: "",
          role: "member"
        }
      }
    },
    methods: {
      login() {
        // console.log(this.user.username)
        this.$axios.post("/api/sys/login", this.$qs.stringify(this.user)).then((resp) => {
          console.log(resp)
          if (resp.data.code == 2) {
            this.$store.dispatch("adduser", resp.data.data)
            alert(resp.data.message)
            this.$store.commit("addinfo")
            this.$router.push('/userindex')
            this.$axios.defaults.headers.common['Authorization'] = resp.data.data.token;
          } else if (resp.data.code == 1) {
            alert(resp.data.message)
          } else if (resp.data.code == 3) {
            alert(resp.data.message)
          } else if (resp.data.code == 4 || resp.data.code == 4) {
            alert(resp.data.message)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
  }

</script>
<style scoped>
  .box-card{
    width: 300px;
    height: 350px;
    margin: 100px 0;
    text-align: center;
    border-radius:10px 
  }
  .card_col{
    width: 100%;
    padding: 10px 0
  }
  .border_radius20{
    border-radius:20px 
  }
</style>
