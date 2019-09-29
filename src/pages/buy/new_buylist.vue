<template>
  <div>
    <!-- 添加采购单 -->
    <el-collapse v-model="activeNames" @change="when_add_new_butlist">
      <el-collapse-item>
        <template slot="title">
          <i class="header-icon el-icon-circle-plus" style="font-size:20px;margin-left: 46%"></i>
          添加采购单
        </template>
        <div>
          <el-form :model="form" style="width: 90%" :rules="rules" label-position="right" label-width="150px"
            :inline="true">
            <el-form-item label="采购单编号" prop="poId">
              <el-input v-model="form.poId"></el-input>
            </el-form-item>
            <el-form-item label="供应商编号" prop="venderCode">
              <el-input v-model="form.venderCode" style="width: 202px">
                <template slot="append">
                  <el-button @click="choose_supplier_btn">选择</el-button>
                </template>
              </el-input>

              <el-dialog title="选择供应商" :visible.sync="dialog_choose_supplier" append-to-body>
                <el-pagination @current-change="updata_supplier_page" background layout="prev, pager, next"
                  :total="supplier_pages*10">
                </el-pagination>
                <el-table ref="singleTable" :data="supplier" @current-change="choose_supplier" highlight-current-row
                  style="width: 100%">
                  <el-table-column type="index" width="50">
                  </el-table-column>
                  <el-table-column property="venderCode" label="供应商编号">
                  </el-table-column>
                  <el-table-column property="name" label="供应名称">
                  </el-table-column>
                  <el-table-column property="address" label="地址" width="120">
                  </el-table-column>
                  <el-table-column property="contactor" label="联系人" width="120">
                  </el-table-column>
                  <el-table-column property="tel" label="电话">
                  </el-table-column>
                </el-table>
              </el-dialog>

            </el-form-item>
            <el-form-item label="创建用户" prop="account">
              <el-input v-model="form.account" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="附加费用">
              <el-input v-model="form.tipFee"></el-input>
            </el-form-item>
            <el-form-item label="产品总价" prop="productTotal">
              <el-input v-model="form.productTotal" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="采购总价" prop="poTotal">
              <el-input v-model="form.poTotal" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="付款方式">
              <el-select v-model="form.payType" placeholder="请选择" style="width: 200px">
                <el-option label="货到付款" value="1"></el-option>
                <el-option label="款到发货" value="2"></el-option>
                <el-option label="预付款到发货" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="150px" label="最低预付款金额" width="200">
              <el-input v-model="form.prePayFee"></el-input>
            </el-form-item>
            <el-form-item label="采购单状态" prop="status">
              <el-input v-model="status_msg" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <el-date-picker v-model="form.createTime" value-format="yyyy-MM-dd hh:mm:ss" placeholder="选择时间"
                type="datetime" style="width: 202px;height:40px"></el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remark"></el-input>
            </el-form-item>
            <!-- 提交新添采购单按钮 -->
            <el-button type="primary" @click="sub_form"
              style="width: 202px;height:40px;margin-left:150px;margin-bottom: 20px">
              提交
            </el-button>

            <el-collapse v-model="activeNames" style="margin-left: 79px">
              <el-collapse-item title="采购单明细" name="1">

                <el-table :data="form.poitems" style="width: 100%">
                  <el-table-column prop="poId" label="采购单编号" width="180">
                  </el-table-column>
                  <el-table-column prop="productCode" label="产品编号" width="180">
                  </el-table-column>
                  <el-table-column prop="name" label="产品名称" width="180">
                  </el-table-column>
                  <el-table-column prop="unitPrice" label="产品单价">
                  </el-table-column>
                  <el-table-column prop="num" label="产品数量">
                  </el-table-column>
                  <el-table-column prop="unitName" label="数量单位">
                  </el-table-column>
                  <el-table-column prop="itemPrice" label="明细总价">
                  </el-table-column>
                  <el-table-column label="删除">
                    <template slot-scope="scope">
                      <el-button type="danger" @click="del_poitem(scope.$index)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>

                <el-button type="primary" @click="push_poitem()" style="margin-top: 20px">添加新的明细</el-button>

                <!-- 新添明细弹窗 -->
                <el-dialog title="添加新的明细" :visible.sync="dialog_add" @open="copy_poId()">
                  <el-form :model="poitem" :rules="rules">
                    <el-form-item label="采购单编号" :label-width="formLabelWidth">
                      <el-input v-model="poitem.poId" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="产品编号" :label-width="formLabelWidth">
                      <el-input v-model="poitem.productCode" style="width:200px" :disabled="true">
                        <template slot="append">
                          <el-button type="primary" @click="dialog_choose_product = true" style="width:100px">
                            选择产品
                          </el-button>
                        </template>
                      </el-input>

                      <!-- 选择产品的弹窗 -->
                      <el-dialog title="选择产品" @open="get_product_list" :visible.sync="dialog_choose_product"
                        append-to-body>
                        <el-pagination @current-change="updata_product_page" background layout="prev, pager, next"
                          :total="product_pages*10">
                        </el-pagination>
                        <el-table ref="singleTable" :data="product" @current-change="choose_product"
                          highlight-current-row style="width: 100%">
                          <el-table-column type="index" width="50">
                          </el-table-column>
                          <el-table-column property="productCode" label="产品编号" width="120">
                          </el-table-column>
                          <el-table-column property="categoryId" label="所属分类" width="120">
                          </el-table-column>
                          <el-table-column property="name" label="产品名称">
                          </el-table-column>
                          <el-table-column property="unitName" label="计量单位">
                          </el-table-column>
                          <el-table-column property="price" label="单价">
                          </el-table-column>
                        </el-table>
                      </el-dialog>
                    </el-form-item>

                    <el-form-item label="产品名称" :label-width="formLabelWidth">
                      <el-input v-model="poitem.name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="产品单价" :label-width="formLabelWidth" prop="unitPrice">
                      <el-input v-model.number="poitem.unitPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="产品数量" :label-width="formLabelWidth" prop="num">
                      <el-input-number v-model.number="poitem.num" type="number" style="width: 202px"
                        @blur="choose_product_on_blur"></el-input-number>
                    </el-form-item>
                    <el-form-item label="数量单位" :label-width="formLabelWidth">
                      <el-input v-model="poitem.unitName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="明细总价" :label-width="formLabelWidth">
                      <el-input v-model="poitem.itemPrice" :disabled="true"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sub_poitem()">确 定</el-button>
                  </div>
                </el-dialog>


              </el-collapse-item>
            </el-collapse>
          </el-form>

        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 添加采购单结束 -->





    <!-- 表格部分 -->
    <el-table :data="tableData" size="mini" stripe height="800" style="width: 100%">
      <el-table-column prop="poId" label="采购单编号">
      </el-table-column>
      <el-table-column prop="venderCode" label="供应商编号" width="100">
      </el-table-column>
      <el-table-column prop="venderName" label="供应商名称" width="150">
      </el-table-column>
      <el-table-column prop="account" label="创建用户" height="40">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" width="100">
      </el-table-column>
      <el-table-column prop="tipFee" label="附加费用">
      </el-table-column>
      <el-table-column prop="poTotal" label="采购总价" width="100">
      </el-table-column>

      <el-table-column label="付款方式">
        <template slot-scope="scope">
          <span>{{scope.row.payType==1?"货到付款":scope.row.payType==2?"款到发货":scope.row.payType==3?"预付款到发货":''}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="change_buylist(scope.row)">修改</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="180">
        <template slot-scope="scope">
          <el-button type="danger" plain @click="del_buylist(scope.row.poId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改采购单的弹出窗口 -->
    <el-dialog title="修改采购单" :visible.sync="dialog_change_buylist" width="65%">
      <el-form :model="form" style="width: 90%" :rules="rules" label-position="right" label-width="150px"
        :inline="true">
        <el-form-item label="采购单编号" prop="poId">
          <el-input v-model="form.poId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="供应商编号" prop="venderCode">
          <el-input v-model="form.venderCode" prop="venderCode" style="width: 202px">
              <template slot="append">
                  <el-button @click="choose_supplier_btn">选择</el-button>
                </template>
          </el-input>


          
        </el-form-item>
        <el-form-item label="创建用户" prop="account">
          <el-input v-model="form.account" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="附加费用" prop="tipFee">
          <el-input v-model="form.tipFee"></el-input>
        </el-form-item>
        <el-form-item label="产品总价" prop="productTotal">
          <el-input v-model="form.productTotal" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="采购总价" prop="poTotal">
          <el-input v-model="form.poTotal" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="付款方式">
          <el-select v-model="form.payType" placeholder="请选择" style="width: 200px">
            <el-option label="货到付款" value="1"></el-option>
            <el-option label="款到发货" value="2"></el-option>
            <el-option label="预付款到发货" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="150px" label="最低预付款金额" prop="prePayFee" width="200">
          <el-input v-model="form.prePayFee"></el-input>
        </el-form-item>
        <el-form-item label="采购单状态" prop="status">
          <el-input v-model="form.status" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
         <el-button type="primary" @click="sub_change_buylist">提交</el-button>
        <el-collapse v-model="activeNames" @change="" style="width:100%;margin-left:31px ">
          <el-collapse-item title="采购单明细" name="1">

            <el-pagination @current-change="updata_change_product_page" background layout="prev, pager, next"
              :total="product_pages*10">
            </el-pagination>
            <el-table ref="singleTable" :data="form.poitems" @current-change="choose_supplier" highlight-current-row
              style="width: 100%">
              <el-table-column type="index" width="50">
              </el-table-column>
              <el-table-column property="productCode" label="产品编号" width="120">
              </el-table-column>
              <el-table-column property="productName" label="产品名称">
              </el-table-column>
              <el-table-column property="num" label="数量">
              </el-table-column>
              <el-table-column property="unitName" label="计量单位">
              </el-table-column>
              <el-table-column property="itemPrice" label="小计">
              </el-table-column>
              <el-table-column label="删除">
                <template slot-scope="scope">
                  <el-button type="danger" @click="del_poitem(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-button type="primary" @click="push_poitem()" style="margin-top: 20px">添加新的明细</el-button>

                <!-- 新添明细弹窗 -->
                <el-dialog title="添加新的明细"  :visible.sync="dialog_add" @open="copy_poId()" append-to-body>
                  <el-form :model="poitem" :rules="rules" style="width:450px;margin-left: 75px">
                    <el-form-item label="采购单编号" :label-width="formLabelWidth">
                      <el-input v-model="poitem.poId" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="产品编号" :label-width="formLabelWidth">
                      <el-input v-model="poitem.productCode" style="width:330px" :disabled="true">
                        <template slot="append">
                          <el-button type="primary" @click="dialog_choose_product = true" style="width:100px">
                            选择产品
                          </el-button>
                        </template>
                      </el-input>

                      <!-- 选择产品的弹窗 -->
                      <el-dialog title="选择产品" @open="get_product_list" :visible.sync="dialog_choose_product"
                        append-to-body>
                        <el-pagination @current-change="updata_product_page" background layout="prev, pager, next"
                          :total="product_pages*10">
                        </el-pagination>
                        <el-table ref="singleTable" :data="product" @current-change="choose_product"
                          highlight-current-row style="width: 100%">
                          <el-table-column type="index" width="50">
                          </el-table-column>
                          <el-table-column property="productCode" label="产品编号" width="120">
                          </el-table-column>
                          <el-table-column property="categoryId" label="所属分类" width="120">
                          </el-table-column>
                          <el-table-column property="name" label="产品名称">
                          </el-table-column>
                          <el-table-column property="unitName" label="计量单位">
                          </el-table-column>
                          <el-table-column property="price" label="单价">
                          </el-table-column>
                        </el-table>
                      </el-dialog>
                    </el-form-item>

                    <el-form-item label="产品名称" :label-width="formLabelWidth">
                      <el-input v-model="poitem.name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="产品单价" :label-width="formLabelWidth" prop="unitPrice">
                      <el-input v-model.number="poitem.unitPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="产品数量" :label-width="formLabelWidth" prop="num">
                      <el-input-number v-model.number="poitem.num" type="number" style="width:330px"
                        @blur="choose_product_on_blur"></el-input-number>
                    </el-form-item>
                    <el-form-item label="数量单位" :label-width="formLabelWidth">
                      <el-input v-model="poitem.unitName" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="明细总价" :label-width="formLabelWidth">
                      <el-input v-model="poitem.itemPrice" :disabled="true"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sub_poitem()">确 定</el-button>
                  </div>
                </el-dialog>

          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-dialog>



    <el-pagination @current-change="updata_page" background layout="prev, pager, next" :total="pages*10">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      // 自定义校验规则
      var check_product_number = (rule, value, callback) => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback()
        }
      }

      return {
        tableData: [],
        form: {
          poId: "",
          venderCode: "",
          account: "",
          createTime: "",
          tipFee: 0,
          productTotal: "",
          poTotal: "",
          payType: "",
          prePayFee: 0,
          remark: "",
          status: 1,
          poitems: []
        },
        poitem: {
          poId: "",
          productCode: "",
          unitPrice: "",
          num: "",
          unitName: "",
          itemPrice: "",
          name: ""
        },
        dialog: false,
        pages: "",
        page: "",
        status_msg: "新增采购单",
        activeNames: ["0"],
        // 控制弹窗的变量
        dialog_add: false,
        dialog_choose_product: false,
        dialog_choose_supplier: false,
        dialog_change_buylist: false,

        product_pages: "",
        supplier_pages: "",

        formLabelWidth: "120px",




        // 这个数组内的数据仅供模拟，有服务器时删除
        product: [],
        supplier: [],

        // 验证规则
        rules: {
          poId: [{
            required: true,
            message: '请输入采购单编号',
            trigger: 'blur'
          }],
          venderCode: [{
            required: true,
            message: '请输入供应商编号',
            trigger: 'blur'
          }],
          account: [{
            required: true,
            message: '请输入创建用户名',
            trigger: 'blur'
          }],
          tipFee: [{
            required: true,
            message: '请输入附加费用',
            trigger: 'blur'
          }],
          productTotal: [{
            required: true,
            message: '请输入产品总价',
            trigger: 'blur'
          }],
          poTotal: [{
            required: true,
            message: '请输入采购总价',
            trigger: 'blur'
          }],
          payType: [{
            required: true,
            message: '请输入付款方式',
            trigger: 'blur'
          }],
          prePayFee: [{
            required: true,
            message: '请输入最低预付款金额',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请选择采购单状态',
            trigger: 'blur'
          }],
          createTime: [{
            required: true,
            message: '请填写创建时间',
            trigger: 'blur'
          }],
          productCode: [{
            required: true,
            message: '请选择产品编号',
            trigger: 'blur'
          }],
          unitPrice: [{
            required: true,
            message: '请填写产品单价,必须为数字',
            trigger: 'blur',
            type: 'number',
          }],
          num: [{
            required: true,
            message: '请选择产品数量,必须为数字',
            trigger: 'blur',
            type: 'number',
          }],

        }

      }
    },
    watch: {
      "form.poitems": {
        handler(newdata, olddata) {
          this.form.productTotal = 0
          console.log(newdata)
          newdata.map((value) => {
            this.form.productTotal += value.itemPrice
          })
        },
        deep: true
      },
      "form.productTotal": {
        handler(newdata, olddata) {
          // console.log("采购总价变化", newdata)
          this.form.poTotal = Number(newdata) + Number(this.form.tipFee)
        },
        deep: true
      }

    },
    methods: {
      update_buylist(type) {
        let show_type = {
          type: type,
          page: this.page
        }
        this.$axios.post("/api/main/purchase/pomain/show", this.$qs.stringify(show_type)).then((resp) => {
          console.log(resp)
          this.tableData = resp.data.list
        })
      },
      sub_change_buylist() {
        this.$axios({
            url: "/api/main/purchase/pomain/update",
            method: "post",
            data: JSON.stringify(this.form),
            headers: {
              "Content-Type": "application/json"
            }
          }).then((resp) => {
          console.log(resp)
          if(resp.data.code==2){
            alert("修改成功")
            this.update_buylist(1)
          this.dialog_change_buylist = false
          }else if(resp.data.code==3||resp.data.code==4){
            alert(resp.data.message)
          }
          
        })
      },
      change_buylist() {
        this.dialog = true
      },
      show_queryItem(poId1) {
        this.$axios.post("/api/main/purchase/pomain/queryItem", this.$qs.stringify({
          poId: poId1
        })).then((resp) => {
          console.log(resp)
        })
      },
      push_poitem() {
        if (this.form.poId != "") {
          this.dialog_add = true
        } else {
          alert("请先输入采购单编号")
        }

      },
      sub_poitem() {
        if (this.poitem.productCode == "" || this.poitem.num == "" || this.poitem.unitPrice == "" || this.poitem
          .itemPrice == "") {
          alert("信息不能为空")
        } else {
          this.dialog_add = false
          this.form.poitems.push(this.poitem)
          this.poitem = {
              poId: "",
              productCode: "",
              unitPrice: "",
              num: "",
              unitName: "",
              itemPrice: "",
              name: ""
            },
            console.log("提交商品后的form", this.form)
        }

      },
      // 当新添明细打开时绑定poid的函数
      copy_poId() {
        this.poitem.poId = this.form.poId
      },
      // 当选择产品打开时获取商品数据
      get_product_list() {
        this.$axios.post("/api//main/sell/product/show").then((resp) => {
          console.log("商品信息", resp)
          this.product = resp.data.list
          this.product_pages = resp.data.pages
        })
      },
      // 选中商品时触发的函数
      choose_product(data1) {
        console.log(data1)
        this.poitem.productCode = data1.productCode
        this.poitem.unitName = data1.unitName
        this.poitem.name = data1.name

        this.dialog_choose_product = false
      },
      // 失去焦点时计算明细小计
      choose_product_on_blur() {
        this.poitem.itemPrice = Number(this.poitem.num) * Number(this.poitem.unitPrice)
        // console.log(this.poitem.num,Number(this.poitem.num))
      },
      // 选择商品页面的分页导航
      updata_product_page(page1) {
        this.$axios.post("/api/main/sell/product/show", this.$qs.stringify({
          page: page1
        })).then((resp) => {
          console.log(resp)
          this.product = resp.data.list

        })
      },
      // 删除已添加的明细
      del_poitem(index) {
        console.log(index)
        this.form.poitems.splice(index, 1)
        // console.log(this.form)
      },
      // 在打开新添加的折叠面板时把固定的数据添加进去
      when_add_new_butlist() {
        console.log(this.$Cookie.get("account"))
        this.form.account = this.$Cookie.get("account")
      },
      // 点击选择供应商的按钮的事件
      choose_supplier_btn() {
        // 1.打开窗口
        this.dialog_choose_supplier = true
        // 2.获取供应商列表
        this.$axios("/api/main/purchase/vender/show").then((resp) => {
          this.supplier_pages = resp.data.pages
          this.supplier = resp.data.list
        })
      },
      updata_supplier_page(page1) {
        this.$axios.post("/api/main/purchase/vender/show", this.$qs.stringify({
          page: page1
        })).then((resp) => {
          console.log(resp)
          this.supplier = resp.data.list

        })
      },
      choose_supplier(data1) {
        this.form.venderCode = data1.venderCode
        this.dialog_choose_supplier = false
      },
      // 提交表单
      sub_form() {
        if (!this.form.poId || !this.form.venderCode || !this.form.createTime || !this.form
          .productTotal || !this.form.payType) {
          alert("请确认信息填写完整")
        } else {
          // console.log(this.form.poId,!this.form.poId)
          this.$axios({
            url: "/api/main/purchase/pomain/add",
            method: "post",
            data: JSON.stringify(this.form),
            headers: {
              "Content-Type": "application/json"
            }
          }).then((resp) => {
            console.log(resp)
            if (resp.data.code == 2) {
              alert("添加成功")
              this.update_buylist(1)
            } else if (resp.data.code == 4) {
              alert(resp.data.message)
            }
          })
          // this.$axios.post("/api/main/purchase/pomain/add", this.$qs.stringify(this.form)).then((resp) => {
          //   console.log(resp)
          // })
        }
      },
      updata_page(pages) {
        // console.log(pages)
        this.$axios.post("/api/main/purchase/pomain/show", this.$qs.stringify({
          type: 1,
          page: pages
        })).then((resp) => {
          console.log(resp)
          this.tableData = resp.data.list
        })
      },
      change_buylist(data) {
        // console.log(this.tableData)
        // console.log(data)
        this.dialog_change_buylist = true
        this.form.poId = data.poId
        this.form.venderCode = data.venderCode
        this.form.account = data.account
        this.form.tipFee = data.tipFee
        this.form.productTotal = data.productTotal
        this.form.poTotal = data.poTotal
        this.form.payType = data.payType
        this.form.prePayFee = data.prePayFee
        this.form.status = data.status
        this.form.remark = data.remark
        this.form.createTime = data.createTime
        // 请求这个采购单的明细信息
        this.$axios.post("/api/main/purchase/pomain/queryItem", this.$qs.stringify({
          poId: data.poId
        })).then((resp) => {
          console.log(resp)

          resp.data.map(value => {
            this.form.poitems.push(value)
          })
        })
      },
      updata_change_product_page(data1) {
        // product_pages
        console.log(data1 )
      },
      // 删除采购单
      del_buylist(poId1){
        // console.log(poId1)
        this.$axios.post("/api/main/purchase/pomain/delete",this.$qs.stringify({poId:poId1})).then((resp)=>{
          console.log(resp)
          if(resp.data.code==2){
            alert(resp.data.message)
            this.update_buylist(1)
          }else if(resp.data.code==3||resp.data.code==4){
            alert(resp.data.message)
          }
        })
      }

     




    },
    created() {
      this.page = 1
      this.update_buylist(1)


      this.$axios.post("/api/main/purchase/pomain/show", this.$qs.stringify({
        type: 1
      })).then((resp) => {
        console.log("商品信息", resp)
        this.pages = resp.data.pages
        console.log(this.pages)
      })
    },
  }

</script>
<style scoped>
</style>
