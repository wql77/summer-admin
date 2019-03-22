<template>
  <div>
    <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="给我一点时间" stripe border fit
              highlight-current-row style="width: 100%">

      <el-table-column align="center" prop="agent_user_id"  label="代理ID" width="160">
      </el-table-column>
      <el-table-column align="center"  label="提现方式" width="160" >
        <template scope="scope" >
          <span v-if="scope.row.type===0">银行卡</span>
          <span v-if="scope.row.type===1">支付宝</span>
          <span v-if="scope.row.type===2">微信</span>
        </template>

      </el-table-column>
      <el-table-column align="center" prop="name" label="开户行" width="160"></el-table-column>
      <el-table-column align="center" prop="number" label="账号" width="160"></el-table-column>

      <el-table-column align="center" prop="created_date" label="日期" width="200"></el-table-column>

      <!--<el-table-column align="center" prop="charge_type" label="充值类型" width="160"></el-table-column>-->

      <el-table-column align="center" prop="money" label="价格" width="160"></el-table-column>


      <el-table-column align="center" prop="phone" label="手机号" width="160"></el-table-column>
      <el-table-column align="center" prop="enabled" label="状态" width="160">
        <template scope="scope">
          <span v-if="scope.row.enabled===1">已提现</span>
          <span v-else-if="scope.row.enabled===0">
            <el-button type="primary" size="small" @click="withdrawConfirm(scope.row.id)">未提现</el-button>
          </span>
          <span v-else>--</span>
        </template>
      </el-table-column>

      <!--<el-table-column align="center"  label="操作" min-width="220">-->
        <!--<template scope="scope">-->
          <!--<el-button @click='changeGood(scope.row.id)' size="small"-->
                     <!--icon="edit">编辑-->
          <!--</el-button>-->
          <!--&lt;!&ndash;<el-button @click="handleClick" type="primary" size="small">编辑</el-button>&ndash;&gt;-->
          <!--<el-button @click="deleteGoods(scope.row.id)" type="danger" size="small">删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->

    </el-table>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="page_sizes"
        :page-size="page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import {getWithdraw,withdrawConfirm} from '@/api/agent'
    export default {
        name: "withdraw",
      data(){
          return{
            tableData:[],
            totalPage: 0,
            currentPage: 1,
            page_size: 8,
            page_sizes: [8, 10, 20],
            listLoading:false
          }
      },
     created() {
       this.onload()
     },
      methods:{
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.page_size = val;
          this.onload()
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage = val;
          this.onload()
        },
        onload(){
          let data={
            page:this.currentPage,
            size:this.page_size,
          };
          getWithdraw(data).then(res=>{
            console.log(res);
            if(res.code===20000){
              this.tableData=res.data;
            }
          })
        },
        withdrawConfirm(id){
          let params={
            "id":id
          };
          this.$confirm('确认未提现, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            withdrawConfirm(params)
              .then((response) => {
                if (response.code === 20000) {
                  this.onload();
                  this.$message({
                    type: 'success',
                    message: '操作成功!'
                  });
                } else {
                  this.$message({
                    message: '操作失败', type: 'warning', duration: '1000'
                  });
                }
              }).catch(err => {
              this.$message({
                message: '操作失败', type: 'warning', duration: '1000'
              });
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
      }
    }
</script>

<style scoped>

</style>
