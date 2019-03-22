<template>
  <el-form ref="form" :model="form" label-width="160px">
    <el-form-item label="分享是否获得货币">
      <el-switch v-model="form.get_money_enabled"></el-switch>
    </el-form-item>
    <el-form-item label="分享好友货币数" v-show="form.get_money_enabled">
      <el-input v-model="form.get_money_friend"></el-input>
    </el-form-item>
    <el-form-item label="分享朋友圈货币数"  v-show="form.get_money_enabled">
      <el-input v-model="form.get_money_moments"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {addShare,getShare} from '@/api/agent'
    export default {
        name: "share",
      data(){
          return{
            form: {
              get_money_enabled: false,
              get_money_friend: 0,
              get_money_moments: 0
            }
          }
      },
      created(){
        getShare().then(res=>{
          console.log(res);
          this.form=res.data;
        })
      },
      methods: {

        onSubmit(formData) {
          let that=this;
          let data=that.form;
          data.get_money_friend=data.get_money_friend*1;
          data.get_money_moments=data.get_money_moments*1;
          console.log(data);
          addShare(data).then(res =>{
            if(res.code===20000){
              this.$alert('分享设置成功！', '提示', {
                confirmButtonText: '确定',
                callback: action => {

                }
              });
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
