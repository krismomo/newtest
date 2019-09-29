<template>
  <div>
    <el-collapse v-model="activeName" accordion class="tabstyle">
      <el-collapse-item name="1">
        <!-- 标题 -->
        <template slot="title">
          <img src="/static/images/leftico01.png" alt="">
          <span>&nbsp;&nbsp;&nbsp;管理信息</span>
        </template>
        <!-- 内容     -->
        <ul>
          <li>
            <router-link to="/userindex">首页</router-link>
            <!-- <a @click="index()">首页</a> -->
          </li>
          <li>
            <router-link to="/user_management">用户管理</router-link>
          </li>
          <li>
            <span @click="logout">退出</span>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item name="2">
        <!-- 标题 -->
        <template slot="title">
          <img src="/static/images/leftico01.png" alt="">
          <span>&nbsp;&nbsp;&nbsp;采购管理</span>
        </template>
        <!-- 内容     -->
        <ul>
          <li>
            <router-link to="/Supplier">供应商管理</router-link>
          </li>
          <li>
            <router-link to="/new_buylist">新添采购单</router-link>
          </li>
          <li>
            <router-link to="/buylist_done">采购单了结</router-link>
          </li>
          <li>
            <router-link to="/buylist_search">采购单查询</router-link>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item name="3">
        <!-- 标题 -->
        <template slot="title">
          <img src="/static/images/leftico01.png" alt="">
          <span>&nbsp;&nbsp;&nbsp;仓管管理</span>
        </template>
        <!-- 内容     -->
        <ul>
          <li>
            <router-link to="/get_in_storehouse">入库登记</router-link>
          </li>
          <li>
            <router-link to="/get_out_storehouse">出库登记</router-link>
          </li>
          <li>
            <router-link to="/storehouse_search">库存查询</router-link>
          </li>
          <li>
            <router-link to="/storehouse_check">库存盘点</router-link>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item name="4">
        <!-- 标题 -->
        <template slot="title">
          <img src="/static/images/leftico01.png" alt="">
          <span>&nbsp;&nbsp;&nbsp;销售管理</span>
        </template>
        <!-- 内容     -->
        <ul>
          <li>
            <router-link to="/Product_Classification_list">产品分类管理</router-link>
          </li>
          <li>
            <router-link to="/Product_list">产品管理</router-link>
          </li>
          <li>
            <router-link to="/customer_management">客户管理</router-link>
          </li>
          <li>
            <router-link to="/new_sales_slip">新添销售单</router-link>
          </li>
          <li>
            <router-link to="/sales_slip_done">销售单了结</router-link>
          </li>
          <li>
            <router-link to="/sales_slip_search">销售点查询</router-link>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item name="5">
        <!-- 标题 -->
        <template slot="title">
          <img src="/static/images/leftico01.png" alt="">
          <span>&nbsp;&nbsp;&nbsp;财务收支</span>
        </template>
        <!-- 内容     -->
        <ul>
          <li>
            <router-link to="/get_money_register">收款登记</router-link>
          </li>
          <li>
            <router-link to="/pay_register">付款登记</router-link>
          </li>
          <li>
            <router-link to="/finance_check">收支查询</router-link>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item name="6">
        <!-- 标题 -->
        <template slot="title">
          <img src="/static/images/leftico01.png" alt="">
          <span>&nbsp;&nbsp;&nbsp;月度报表</span>
        </template>
        <!-- 内容     -->
        <ul>
          <li>
            <router-link to="/buy_report">月度采购报表</router-link>
          </li>
          <li>
            <router-link to="/sale_report">月度销售报表</router-link>
          </li>
          <li>
            <router-link to="/get_out_storehouse_report">月度出库报表</router-link>
          </li>
          <li>
            <router-link to="/get_in_storehouse_report">月度入库报表</router-link>
          </li>
          <li>
            <router-link to="/stock_report">月度库存报表</router-link>
          </li>
          <li>
            <router-link to="/finance_report">月度收支报表</router-link>
          </li>

        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: ''
      };
    },
    methods: {
      
      logout() {
        if (this.$Cookie.get("token") != undefined) {
          this.$axios.get("/api/sys/logout").then((resp) => {
            console.log(resp.data.code)
            if (resp.data.code == 2) {
              // 删除cookie里的值
              this.$Cookie.remove("username")
              this.$Cookie.remove("token")
              this.$Cookie.remove("account")
              alert("退出成功")
              // 把store储存的username值变空
              this.$store.dispatch("deldata_info", "")
              // this.index()
              this.$router.push('/login')
            }
          })
        } else {
          alert("还未登录，请先登录")
        }
      }
    },
  }

</script>
<style scoped>
  ul li {
    list-style-image: url("/static/images/list.gif");
    list-style-position: inside;
    padding: 5px
  }

  ul {
    padding: 0px !important
  }

  .tabstyle>>>.el-collapse-item__wrap {
    background-color: #F0F9FD
  }

  .tabstyle>>>.el-collapse-item__header {
    background-color: #D4E7F0;
    padding-left: 20px;
    border-bottom: 1px solid #B9CAD3;
    height: 40px;
  }

  .tabstyle>>>.el-collapse-item__content {
    padding-bottom: 0px
  }

</style>
