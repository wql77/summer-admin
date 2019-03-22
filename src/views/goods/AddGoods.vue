<template>
  <div class="content">
    <div class="add-goods">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="兑换所需礼券数" prop="giftVoucher">
          <el-input v-model="ruleForm.giftVoucher" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品种类" class="goodsCategory-form">
          <el-select v-model="ruleForm.goodsCategory" placeholder="请选择商品种类">
            <el-option v-for="item in goodsCategoryId" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品logo" prop="logo">
          <el-upload
            class="upload-poster"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-change="imgPreview"
            :auto-upload="false">
            <img v-if="ruleForm.logo" :src="ruleForm.logo" class="upload-img"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!--<el-input v-model="ruleForm.logo" autocomplete="off"></el-input>-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getAddGoods, getGoodsCategoryList, getGoodsDetail} from '@/api/agent'

  export default {
    name: 'addGoods',
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品名称不能为空'));
        } else {
          callback();
        }
      };
      var checkPrice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品价格不能为空'));
        } else {
          callback();
        }
      };
      var validateGiftVoucher = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('兑换所需礼券数不能为空'));
        } else {
          callback();
        }
      };
      var validateGoodsCategory = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('商品种类不能为空'));
        } else {
          callback();
        }
      };
      var validateGoodsLogo = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('商品Logo不能为空'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name: '',
          price: '',
          giftVoucher: '',
          goodsCategory: 1,
          logo: ''
        },
        rules: {
          name: [
            {validator: checkName, trigger: 'blur'}
          ],
          price: [
            {validator: checkPrice, trigger: 'blur'}
          ],
          giftVoucher: [
            {validator: validateGiftVoucher, trigger: 'blur'}
          ],
          goodsCategory: [
            {validator: validateGoodsCategory, trigger: 'blur'}
          ],
          logo: [
            {validator: validateGoodsLogo, trigger: 'blur'}
          ]
        },
        goodsCategoryId: [],
        logoList: [],
        formMovie: {
          posterURL: ''
        }

      };
    },
    created() {
    },
    mounted() {
      this.getGoodsCategoryList();
      if (this.$route.query.goodsId) {
        this.goodsDetail();
      }
    },
    components: {},
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getAddGoods();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getAddGoods() {
        let params;
        let params1 = {
          "name": this.ruleForm.name,
          "price": this.ruleForm.price,
          "logo": this.ruleForm.logo,
          "gift_voucher": this.ruleForm.giftVoucher,
          "goods_category_id": this.ruleForm.goodsCategory,
        };
        let params2 = {
          "id": this.$route.query.goodsId,
          "name": this.ruleForm.name,
          "price": this.ruleForm.price,
          "logo": this.ruleForm.logo,
          "gift_voucher": this.ruleForm.giftVoucher,
          "goods_category_id": this.ruleForm.goodsCategory,
        };
        if (this.$route.query.goodsId) {
          params = params2
        } else {
          params = params1
        }
        getAddGoods(params)
          .then((response) => {
            if (response.code === 20000) {
              this.$router.push({
                path: 'GoodList'
              });
              this.$message({
                message: '操作成功', type: 'success', duration: '1000'
              });
            } else {
              this.$message({
                message: '操作失败，请稍后再试', type: 'warning', duration: '1000'
              });
            }
          }).catch(err => {
          this.$message({
            message: '操作失败，请稍后再试', type: 'warning', duration: '1000'
          });
        })
      },
      getGoodsCategoryList() {
        getGoodsCategoryList(this.ruleForm.name, this.ruleForm.price, this.ruleForm.giftVouche, this.ruleForm.goodsCategory)
          .then((response) => {
            if (response.code === 20000) {
              this.goodsCategoryId = response.data;
            } else {
              this.$message({
                message: '操作失败，请稍后再试', type: 'warning', duration: '1000'
              });
            }
          }).catch(err => {
          this.$message({
            message: '操作失败，请稍后再试', type: 'warning', duration: '1000'
          });
        })
      },
      imgPreview(file, fileList) {
        let fileName = file.name;
        let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test(fileName.toLowerCase())) {
          this.ruleForm.logo = file.url;
          console.log(file)
        } else {
          this.$message.error('请选择图片文件');
        }
      },
      goodsDetail() {
        getGoodsDetail(this.$route.query.goodsId)
          .then((response) => {
            if (response.code === 20000) {
              this.ruleForm.name = response.data.name;
              this.ruleForm.price = response.data.price;
              this.ruleForm.giftVoucher = response.data.gift_voucher;
              this.ruleForm.goodsCategory = response.data.goods_category_id;
              this.ruleForm.logo = response.data.logo;
            } else {
              this.$message({
                message: '操作失败，请稍后再试', type: 'warning', duration: '1000'
              });
            }
          }).catch(err => {
          this.$message({
            message: '操作失败，请稍后再试', type: 'warning', duration: '1000'
          });
        })
      }
    }
  }
</script>

<style lang="less">
  /*@import "./../assets/css/style";*/
  .content {
    .add-goods {
      text-align: center;
      margin-top: 5%;

      .el-form {
        width: 50%;

        .goodsCategory-form {
          text-align: left;
        }

        .el-form-item {
          text-align: left;

          .upload-img {
            width: 100px;
            height: 100px;
          }
        }
      }
    }
  }
</style>
