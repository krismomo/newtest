<template>
  <div>
    <!-- 新添采购商 -->
    <el-collapse>
      <el-collapse-item>
        <template slot="title">
          <i class="header-icon el-icon-circle-plus" style="font-size:20px;margin-left: 46%"></i>
          添加采购商
        </template>

        <div style="width:100%">
          <el-form :model="form" :rules="rules" label-position="right" label-width="100px" :inline="true">
            <el-form-item label="供应商编号" prop="venderCode">
              <el-input v-model="form.venderCode"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
              <el-input show-password v-model="form.passWord"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contactor">
              <el-input v-model="form.contactor"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="邮编">
              <el-input v-model="form.postCode"></el-input>
            </el-form-item>
            <el-form-item label="添加日期">
              <!-- <el-input v-model="form.createDate"></el-input> -->
              <el-date-picker v-model="form.createDate" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择时间"
                type="datetime"></el-date-picker>
            </el-form-item>
            <el-form-item label="电话" prop="tel">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="传真">
              <el-input v-model="form.fax"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="sub_create_supplier()">提交</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 表格部分 -->
    <el-table :data="tableData" size="mini" stripe height="800" style="width: 100%">
      <el-table-column prop="venderCode" label="供应商编号" height="40">
      </el-table-column>
      <el-table-column prop="name" label="供应商名称" width="200">
      </el-table-column>
      <el-table-column prop="contactor" label="联系人">
      </el-table-column>
      <el-table-column prop="tel" label="电话" width="150">
      </el-table-column>
      <el-table-column prop="fax" label="传真">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="postCode" label="邮编">
      </el-table-column>
      <el-table-column prop="createDate" label="注册日期" width="100">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" plain @click=" change_supplier(scope.row)">修改</el-button>
          <el-button type="danger" plain @click="del_supplier(scope.row.venderCode)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改用户卡片 -->
    <el-dialog title="修改用户信息" :visible.sync="dialog">
      <el-form :model="form" :rules="rules" label-position="right" label-width="100px">
        <el-form-item label="供应商编号" prop="venderCode">
          <el-input v-model="form.venderCode"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input show-password v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactor">
          <el-input v-model="form.contactor"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="form.postCode"></el-input>
        </el-form-item>
        <el-form-item label="注册日期">
          <!-- <el-input v-model="form.createDate"></el-input> -->
          <el-date-picker v-model="form.createDate" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择时间"
            type="datetime"></el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="传真">
          <el-input v-model="form.fax"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="sub_change_supplier">提交</el-button>
    </el-dialog>
    <el-pagination @current-change="updata_page" background layout="prev, pager, next" :total="pages*10">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        form: {
          venderCode: "",
          name: "",
          passWord: "",
          contactor: "",
          address: "",
          postCode: "",
          createDate: "",
          tel: "",
          fax: ""
        },
        dialog: false,
        pages: "",
        page: {
          page: ""
        },
        // 验证规则
        rules: {
          venderCode: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入供应商名称',
            trigger: 'blur'
          }],
          passWord: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          contactor: [{
            required: true,
            message: '请输入联系人',
            trigger: 'blur'
          }],
          tel: [{
            required: true,
            message: '请输入电话',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      updeta_supplier_list() {
        this.$axios.post("/api/main/purchase/vender/show", this.$qs.stringify(this.page)).then((resp) => {
          console.log(resp)
          this.tableData = resp.data.list
          this.pages = resp.data.pages
        })
      },
      sub_create_supplier() {
        console.log(this.form)
        this.$axios.post("/api/main/purchase/vender/add", this.$qs.stringify(this.form)).then((resp) => {
          console.log(resp)
          if (resp.data.code == 2) {
            this.updeta_supplier_list()
            this.form = {
              venderCode: "",
              name: "",
              passWord: "",
              contactor: "",
              address: "",
              postCode: "",
              createDate: "",
              tel: "",
              fax: ""
            }

          } else if (resp.data.code == 4||resp.data.code == 3) {
            alert(resp.data.message)
          }
        })
      },
      change_supplier(row) {
        // 写到这里了，把form的值绑定到row的数据
        this.dialog = true
        this.form.venderCode = row.venderCode
        this.form.name = row.name
        this.form.passWord = row.passWord
        this.form.contactor = row.contactor
        this.form.address = row.address
        this.form.postCode = row.postCode
        this.form.createDate = row.createDate
        this.form.tel = row.tel
        this.form.fax = row.fax
      },
      sub_change_supplier() {
        this.$axios.post("/api/main/purchase/vender/update", this.$qs.stringify(this.form)).then((resp) => {
          console.log(resp)
          this.updeta_supplier_list()
          this.dialog = false
        })
      },
      del_supplier(vendercode) {
        let del_form = {
          venderCode: vendercode
        }
        this.$axios.post("/api/main/purchase/vender/delete", this.$qs.stringify(del_form)).then((resp) => {
          console.log(resp)
          this.updeta_supplier_list()
        })
      },
      updata_page(page) {
        this.page.page = page
        console.log(this.page)
        this.$axios.post("/api/main/system/user/show", this.$qs.stringify(this.page)).then((resp) => {
          console.log(resp.data)
          this.updeta_supplier_list()
          // this.tableData = resp.data.list
          // this.pages = resp.data.pages
        })
      },

    },
    created() {
      this.updeta_supplier_list()
    },
  }

</script>
<style scoped>
</style>
