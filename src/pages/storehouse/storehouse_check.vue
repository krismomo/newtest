<template>
  <div>
    <!-- <span>库存盘点</span> -->
    <el-card class="box-card" width>
      <div style="width:400px;margin: 20px 313px">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-form-item label="产品编号" prop="productCode">
            <el-input v-model="form.productCode"></el-input>
          </el-form-item>
          <el-form-item label="产品原始数量" prop="originNum">
            <el-input v-model="form.originNum"></el-input>
          </el-form-item>
          <el-form-item label="变化数量" prop="num">
            <el-input v-model="form.num"></el-input>
          </el-form-item>
          <el-form-item label="变化类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择" style="width:300px">
              <el-option label="损耗" value="损耗"></el-option>
              <el-option label="盘余" value="盘余"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="变化原因" prop="description">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="sub_form">提交</el-button>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          productCode: "",
          originNum: "",
          num: "",
          type: "",
          description: ""
        },
        rules: {
          productCode: [{
            required: true,
            message: '请输入产品编号',
            trigger: 'blur'
          }],
          originNum: [{
            required: true,
            message: '请输入产品原始数量',
            trigger: 'blur'
          }],
          num: [{
            required: true,
            message: '请输入变化数量',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请输入变化类型',
            trigger: 'blur'
          }],
          description: [{
            required: true,
            message: '请输入变化原因',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      sub_form() {
        if (this.form.productCode == "" || this.form.originNum == "" || this.form.num == "" || this.form.type == "" || this.form.description ==
          "") {
          alert("请检查输入信息是否完整")
        } else {
          this.$axios.post("/api/main/stock/checkstock", this.$qs.stringify(this.form)).then((resp) => {
            console.log(resp)
            if (resp.data.code == 2) {
              alert(resp.data.message)
              this.form = {
                productCode: "",
                originNum: "",
                num: "",
                type: "",
                description: ""
              }
            } else {
              alert(resp.data.message)
            }
          })
        }
      }
    },
  }

</script>
<style scoped>
</style>
