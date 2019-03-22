<template>

  <div class="app-container calendar-list-container">

    <el-form :inline="true" :model="chargeForm" class="demo-form-inline">
      <el-form-item label="玩家主键" width="120">
        <el-input v-model="chargeForm.userId" placeholder="玩家id"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
      <br>
      <el-form-item label="房卡充值" width="120">
        <el-input v-model="chargeForm.num" placeholder=""></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">充值</el-button>
      </el-form-item>
      <br>
      <el-form-item label="金币充值" width="120">
        <el-input v-model="chargeForm.goal" placeholder=""></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit2">充币</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="tableData" width="500">

      <el-table-column align="center" prop="id" label="id" width="120"></el-table-column>

      <!--<el-table-column align="center" fixed prop="image" label="image" width="500">-->
      <!--<template scope="scope">-->
      <!--<img  :src="scope.row.image+'/96?'">-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column align="center" prop="username" label="用户名" width="200"></el-table-column>

      <el-table-column align="center" prop="account" label="账号" width="350"></el-table-column>

      <el-table-column align="center" prop="money" label="房卡" width="150"></el-table-column>

      <el-table-column align="center" prop="gold" label="金币" width="150"></el-table-column>


    </el-table>

  </div>

</template>


<script>
  import {charge, getList, fetchPlayer,upGoals, downGoals} from '@/api/player'

  export default {
    data() {
      return {
        listLoading: true,
        tableData: [],
        totalPage: 0,
        currentPage: 1,
        page_size: 20,
        page_sizes: [20, 50, 100, 200],

        dialogTableVisible: false,
        dialogFormVisible: false,
        chargeDialogFormVisible: false,
        chargeForm: {
          userId: '',
          username: '',
          goal: 0,
          num: 0
        },
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          id: '',
          sort: '+id'
        },
        formLabelWidth: '120px',


      }
    },

    methods: {

      created() {
        this.listLoading = false

      },

      onSubmit() {
        charge(this.chargeForm).then(response => {

          console.log(response)
          this.$message({
            message: '充值成功',
            type: 'success'
          });
        });
      },
      onSubmit2() {
        upGoals(this.chargeForm).then(response => {

          console.log(response)
          this.$message({
            message: '充值成功',
            type: 'success'
          });
        });
        // alert(this.chargeForm.goal)
        // if (this.chargeForm.goal > 0){
        //   upGoals(this.chargeForm).then(response => {
        //
        //     console.log(response)
        //     this.$message({
        //       message: '充值成功',
        //       type: 'success'
        //     });
        //   });
        // }else {
        //   downGoals(this.chargeForm).then(response => {
        //
        //     console.log(response)
        //     this.$message({
        //       message: '充值成功',
        //       type: 'success'
        //     });
        //   });
        // }
      },

      onSearch(){
        this.listQuery.page = 1
        this.listQuery.id = this.chargeForm.userId
        this.getFilterList()
      },
      getFilterList() {
        this.listLoading = true
        fetchPlayer(this.listQuery.id).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
          this.tableData = response.data.tableData
          this.totalPage = response.data.totalPage
          this.listLoading = false
        })
      }
    }
  }
</script>
