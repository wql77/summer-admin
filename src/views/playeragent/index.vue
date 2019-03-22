<template>
  <div>


    <!--充值-->
    <el-dialog class="app-edit" title="上分" :visible.sync="chargeDialogFormVisible" size="small">

      <el-form :model="chargeForm">

        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="chargeForm.id"></el-input>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="chargeForm.username"></el-input>
        </el-form-item>

        <el-form-item label="上分" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="chargeForm.goal"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = true">取 消</el-button>
        <el-button type="primary" @click="opGoal">修 改</el-button>
      </div>

    </el-dialog>


    <el-dialog class="app-edit" title="下分" :visible.sync="chargeDownDialogFormVisible" size="small">

      <el-form :model="chargeForm">

        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="chargeForm.id"></el-input>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="chargeForm.username"></el-input>
        </el-form-item>

        <el-form-item label="下分" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="chargeForm.goal"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = true">取 消</el-button>
        <el-button type="primary" @click="opdownGoal">修 改</el-button>
      </div>

    </el-dialog>

    <!--搜索框 + 表格-->
    <div class="app-container calendar-list-container">

      <div class="filter-container">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名"
                  v-model="listQuery.title">
        </el-input>
        <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      </div>
      <br/>

      <!--表格-->
      <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="给我一点时间" stripe border fit
                highlight-current-row style="width: 100%">

        <el-table-column align="center" prop="id" label="id" width="120"></el-table-column>

        <!--<el-table-column align="center" fixed prop="image" label="image" width="500">-->
        <!--<template scope="scope">-->
        <!--<img  :src="scope.row.image+'/96?'">-->
        <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column align="center" prop="username" label="用户名" width="200"></el-table-column>

        <el-table-column align="center" prop="account" label="账号" width="200"></el-table-column>

        <el-table-column align="center" prop="password" label="密码" width="100"></el-table-column>

        <!--<el-table-column align="center" prop="sex" label="性别" width="100">-->
        <!--<template scope="scope">-->
        <!--<span>{{scope.row.sex == 1 ? '男' : '女'}}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column align="center" prop="money" label="房卡" width="150"></el-table-column>

        <el-table-column align="center" prop="gold" label="积分" width="150"></el-table-column>


        <!--<el-table-column align="center" fixed="right" label="操作" min-width="220">-->
        <!--<template scope="scope">-->
        <!--&lt;!&ndash;<el-button :type="scope.row.edit?'success':'primary'" @click='handleEditClick(scope)' size="small"&ndash;&gt;-->
        <!--&lt;!&ndash;icon="edit">{{scope.row.edit ? '完成' : '编辑'}}&ndash;&gt;-->
        <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
        <!--<el-button @click="handleClick1" type="primary" size="small">上分</el-button>-->
        <!--<el-button @click="handleClick2" type="danger" size="small">下分</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column align="center" fixed="right" label="操作" min-width="220">
          <template scope="scope">
            <el-button @click="handleUpClick(scope)" type="primary" size="small">上分</el-button>
            <el-button @click="handleDownClick(scope)" type="danger" size="small">下分</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

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

    <br>


  </div>
</template>

<script>
  import {getListVip, fetchListVip} from '@/api/player'
  import {charge, upGoals, downGoals} from '@/api/player'
  import waves from '@/directive/waves.js'// 水波纹指令

  export default {
    directives: {
      waves
    },
    methods: {

      handleFilter(){
        this.listQuery.page = 1
        console.log(this.listQuery)
        this.getFilterList()
      },

      getFilterList() {
        this.listLoading = true
        fetchListVip(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
          this.tableData = response.data.tableData
          this.totalPage = response.data.totalPage
          this.listLoading = false
        })
      },
      handleClick() {
        this.dialogFormVisible = true;
      },
      handleClick1(scope){
        this.chargeDialogFormVisible = true;
        this.chargeForm.up = 1;
//        this.chargeForm.id = scope.row.id;
//        this.chargeForm.username = scope.row.id;
      },
      handleClick2(scope){
        this.chargeDialogFormVisible = true;
//        this.chargeForm.id = scope.row.id;
//        this.chargeForm.username = scope.row.id;
      },
      handleUpClick(scope) {
        this.chargeDialogFormVisible = true;
        this.chargeForm.id = scope.row.id;
        this.chargeForm.username = scope.row.id;
        this.chargeForm.num = 0;
      },
      handleDownClick(scope) {
        this.chargeDownDialogFormVisible = true;
        this.chargeForm.id = scope.row.id;
        this.chargeForm.username = scope.row.id;
        this.chargeForm.num = 0;
      },
      doCharge() {
        charge(this.chargeForm).then(response => {
          this.tableData.forEach(td => {
            if (td.id == this.chargeForm.id) {
              td.money = response.data;
            }
            this.$message({
              message: '充值成功',
              type: 'success'
            });
          })
        })
        this.chargeDialogFormVisible = false
      },
      opGoal() {
        this.chargeDialogFormVisible = false
        upGoals(this.chargeForm).then(response => {
          this.tableData.forEach(td => {
            if (td.id == this.chargeForm.id) {
              td.gold = response.data;
            }
            this.$message({
              message: '上分成功',
              type: 'success'
            })
          })

        })
        this.chargeDialogFormVisible = false
      },

      opdownGoal() {
        this.chargeDownDialogFormVisible = false
        downGoals(this.chargeForm).then(response => {
          this.tableData.forEach(td => {
            if (td.id == this.chargeForm.id) {
              td.gold = response.data;
            }
            this.$message({
              message: '下分成功',
              type: 'success'
            })
          })
        })
        this.chargeDownDialogFormVisible = false
      },


      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.page_size = val;
        this.fetchData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val;
        this.fetchData()

      },
      fetchData() {
        this.listLoading = true;
        getListVip(this.currentPage, this.page_size).then(response => {
          this.tableData = response.data.tableData;
          this.totalPage = response.data.totalPage;
          this.listLoading = false;
        });

      },


    },

    created() {
      this.fetchData()
    },
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
        chargeDownDialogFormVisible: false,
        chargeForm: {
          id: '',
          username: '',
          num: 0,
          up: 0,
          goal: 0
        },
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        formLabelWidth: '120px',


      }
    }
  }
</script>
