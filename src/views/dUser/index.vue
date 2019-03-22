<template>
  <div>
    <div>
      <br>
      <el-input v-model="input" placeholder="请输入用户ID" style="width: 200px; margin-left: 20px; margin-right: 5px"></el-input>
      <el-button size="medium" round>查 询</el-button>
    </div>

    <br>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户信息</span>
          <el-button style="float: right; padding: 3px 0" type="text">点击查看代理关系图</el-button>
        </div>
        <!--<div v-for="o in 4" :key="o" class="text item">-->
          <!--{{'列表内容 ' + o }}-->
        <!--</div>-->
        <div>
          <span class="normal">用户账号:</span>
          <span class="normal">乔峰</span>
          <br>
          <br>
        </div>

        <div>
          <span class="normal">游戏标识:</span>
          <span class="normal"></span>
          <br>
          <br>
        </div>

        <div>
          <span class="normal">用户账号:</span>
          <span class="normal">zbb</span>
          <br>
          <br>
        </div>

      </el-card>
    </div>
  </div>
</template>

<script>
    // export default {
    //     name: "z"
    // }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .normal{
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 95%;
  }
</style>
