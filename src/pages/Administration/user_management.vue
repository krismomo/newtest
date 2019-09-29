<template>
  <div>
    <!-- 新增用户 -->
    <el-collapse>
      <el-collapse-item>
        <template slot="title">
          <i class="header-icon el-icon-circle-plus" style="font-size:20px;margin-left: 46%"></i>
          新建用户
        </template>
        <!-- 新增用户表单 -->
        <div style="width: 53%;margin-left: 18%">
          <!-- <p>这里是内容</p> -->
          <el-form v-model="form" :rules="rules">
            <el-form-item label="用户名" :label-width="formLabelWidth" prop="account">
              <el-input v-model="form.account" autofocus="true">
                <!-- <i slot="suffix" class="el-input-icon el-icon-close " :style="tips.account"></i> -->
              </el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="pas">
              <el-input v-model="form.passWord">
                <!-- <i slot="suffix" class="el-input-icon el-icon-close" :style="tips.pas"></i> -->
              </el-input>
            </el-form-item>
            <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name">
                <!-- <i slot="suffix" class="el-input-icon el-icon-close" :style="tips.name"></i> -->
              </el-input>
            </el-form-item>
            <el-form-item label="日期" :label-width="formLabelWidth">
              <!-- <el-input v-model="form.createDate" autocomplete="off"></el-input> -->
              <el-date-picker v-model="form.createDate" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择时间"
                type="datetime"></el-date-picker>
            </el-form-item>
            <el-form-item label="锁定状态" :label-width="formLabelWidth">
              <span>锁定</span>
              <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" active-value="0"
                inactive-value="1">
              </el-switch>
              <span>不锁定</span>
            </el-form-item>
            <el-form-item label="权限管理" :label-width="formLabelWidth">
              <el-checkbox-group v-model="form.modelcodes" size="mini">
                <el-checkbox-button label="1">采购管理</el-checkbox-button>
                <el-checkbox-button label="2">销售管理</el-checkbox-button>
                <el-checkbox-button label="3">系统管理</el-checkbox-button>
                <el-checkbox-button label="4">财务管理</el-checkbox-button>
                <el-checkbox-button label="5">仓库管理</el-checkbox-button>
                <el-checkbox-button label="6">业务报表</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <el-button type="primary" style="margin-left: 20%" @click="subform_create()">提交</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- <span>用户管理</span> -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="account" label="账号" style="width: 100%">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="昵称" style="width: 100%">
      </el-table-column>
      <el-table-column prop="models.modelName" label="权限" style="width: 100%">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p v-for="usermodels in scope.row.models">{{usermodels.modelName}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">鼠标放上来查看权限</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建日期" style="width: 100%">
      </el-table-column>
      <el-table-column prop="status" label="锁定状态" style="width: 100%">
      </el-table-column>
      <el-table-column label="操作" style="width: 100%">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="changeuser(scope.row)">操作</el-button>
          <el-button type="danger" plain @click=delaccount(scope.row.account)>删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改用户信息" :visible.sync="dialog">
      <!-- 内容 -->
      <el-form v-model="form" :rules="rules">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.account" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="pas">
          <el-input v-model="form.passWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-input v-model="form.createDate" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="锁定状态" :label-width="formLabelWidth">
          <span>锁定</span>
          <el-switch v-model="form.status" active-color="#13ce66" inactive-color="#ff4949" active-value="0"
            inactive-value="1">
          </el-switch>
          <span>不锁定</span>
        </el-form-item>
        <el-form-item label="权限管理" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.modelcodes" size="mini">
            <el-checkbox-button label="1">采购管理</el-checkbox-button>
            <el-checkbox-button label="2">销售管理</el-checkbox-button>
            <el-checkbox-button label="3">系统管理</el-checkbox-button>
            <el-checkbox-button label="4">财务管理</el-checkbox-button>
            <el-checkbox-button label="5">仓库管理</el-checkbox-button>
            <el-checkbox-button label="6">业务报表</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="subform">提 交</el-button>
      </span>
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
        dialog: false,
        form: {
          account: "",
          name: "",
          passWord: "",
          status: "0",
          modelcodes: [],
          createDate: ""
        },
        formLabelWidth: '120px',
        // modules: ["采购管理", "销售管理", "系统管理", "财务管理", "仓库管理", "业务报表"],
        // 修改账号权限中是否锁定用户
        // userstatus: true,
        // clickuser:"",
        tips: {
          account: "display:none",
          pas: "display:none",
          name: "display:none"
        },
        pages: "",
        page: {
          page: ""
        },
        rules: {
          account: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          pas: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      subform() {
        this.dialog = false
        // console.log(this.checked_modules, this.userstatus)
        console.log(this.form)
        this.$axios.post("/api/main/system/user/update", this.$qs.stringify(this.form)).then((resp) => {
          console.log(resp.data)
          // this.tableData = resp.data.data.list
          this.updata_tabledata()
          this.clean_form()
        })
      },
      subform_create() {
        console.log(this.form)
        if (this.form.account == "" || this.form.passWord == "" || this.form.name == "") {
          alert("请检查填写内容")
          // this.yz_useraccount()
          // this.yz_userpas()
          // this.yz_username()
        } else {
          this.$axios.post("/api/main/system/user/add", this.$qs.stringify(this.form)).then((resp) => {
            console.log(resp.data)
            if (resp.data.code == 2) {
              // this.tableData = resp.data.data.list
              this.updata_tabledata()
            } else if (resp.data.code == 4) {
              alert(resp.data.message)
            }
          })
          this.clean_form()
        }
      },
      changeuser(row) {
        this.form.account = row.account
        this.form.createDate = row.createDate
        this.form.passWord = row.passWord
        this.form.name = row.name
        this.dialog = true
      },
      // yz_useraccount() {
      //   if (this.form.account == "") {
      //     this.tips.account = ""
      //   } else {
      //     this.tips.account = "display:none"
      //   }
      // },
      // yz_userpas() {
      //   if (this.form.passWord == "") {
      //     this.tips.pas = ""
      //   } else {
      //     this.tips.pas = "display:none"
      //   }
      // },
      // yz_username() {
      //   if (this.form.name == "") {
      //     this.tips.name = ""
      //   } else {
      //     this.tips.name = "display:none"
      //   }
      // },
      updata_tabledata() {
        this.$axios.post("/api/main/system/user/show", this.$qs.stringify(this.page)).then((resp) => {
          console.log(resp.data)
          this.tableData = resp.data.list
          this.pages = resp.data.pages
        })
      },
      updata_page(page) {
        this.page.page = page
        console.log(this.page)
        this.$axios.post("/api/main/system/user/show", this.$qs.stringify(this.page)).then((resp) => {
          console.log(resp.data)
          this.tableData = resp.data.list
          this.pages = resp.data.pages
        })
      },
      clean_form() {
        this.form = {
          account: "",
          name: "",
          passWord: "",
          status: "0",
          modelcodes: [],
          createDate: ""
        }
      },
      delaccount(account1) {
        let deldata = {
          account: account1,
          page: this.page.page
        }
        this.$axios.post("/api/main/system/user/delete", this.$qs.stringify(deldata)).then((resp) => {
          console.log(resp)
          if (resp.data.code == 2) {
            this.tableData = resp.data.data.list
          } else if (resp.data.code == 4) {
            alert("该账号还存在未处理的信息")
          }
        })
      }

    },
    mounted() {
      this.updata_tabledata()
    },
  }

</script>
<style scoped>

</style>
