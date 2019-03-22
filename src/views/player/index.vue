<template>
  <div>

    <!--充值-->
    <el-dialog class="app-edit" title="修改绑定代理ID" :visible.sync="chargeDialogFormVisible" size="small">

      <el-form :model="chargeForm">
        <el-form-item label="输入代理ID" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="chargeForm.agent_id"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doCharge">修 改</el-button>
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

        <br>
        <br>


        <div v-if="ifShow">
          &nbsp;   &nbsp;    &nbsp;
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="邀请码"
                    v-model="listQuery.referee">
          </el-input>

          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter2">搜索</el-button>
        </div>

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

        <el-table-column align="center" prop="account" label="账号" width="350"></el-table-column>

        <el-table-column align="center" prop="password" label="密码" width="100"></el-table-column>

        <el-table-column align="center" prop="sex" label="性别" width="100">
          <template scope="scope">
            <span>{{scope.row.sex == 1 ? '男' : '女'}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="money" label="房卡" width="150"></el-table-column>

        <el-table-column align="center" prop="gold" label="金币" width="150"></el-table-column>

        <el-table-column align="center" prop="referee" label="代理" width="150"></el-table-column>

        <!--<el-table-column align="center" prop="email" label="邮箱" width="150"></el-table-column>-->

        <!--<el-table-column align="center" label="操作" width="200">-->
        <!--<template scope="scope">-->
        <!--<el-button @click="handleChargeClick(scope)" type="primary" size="small">充值</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->



       <div v-if="ifShow">
         <el-table-column align="center" fixed="right" label="操作" min-width="150">
           <template scope="scope">
             <el-button :type="scope.row.edit?'success':'primary'" @click='handleEditClick(scope)' size="small"
                        icon="edit">{{scope.row.edit ? '完成' : '代理ID'}}
             </el-button>

           </template>
         </el-table-column>
       </div>

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
  import {getList, fetchList, fetchListWithReferee} from '@/api/player'
  import {charge, changeUserDelegate} from '@/api/player'
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

      handleFilter2(){
        this.listQuery.page = 1
        console.log(this.listQuery)
        this.getFilterList2()
      },

      getFilterList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
          this.tableData = response.data.tableData
          this.totalPage = response.data.totalPage
          this.listLoading = false
        })
      },

      getFilterList2() {
        this.listLoading = true
        fetchListWithReferee(this.listQuery).then(response => {
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
      handleChargeClick(scope) {
        this.chargeDialogFormVisible = true;
        this.chargeForm.id = scope.row.id;
        this.chargeForm.username = scope.row.id;
        this.chargeForm.num = 0;
      },
      doCharge() {
        changeUserDelegate(this.chargeForm).then(response => {
          this.tableData.forEach(td => {
            if (td.id == this.chargeForm.id) {
              td.referee = response.data;
            }
            this.$message({
              message: '修改绑定代理成功',
              type: 'success'
            });
          })
        })
        this.chargeDialogFormVisible = false
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
      handleEditClick(val) {
        this.chargeDialogFormVisible = true
        this.chargeForm.id = val.row.id;

      },
      handleEditClick2(val) {
        this.chargeForm.id = val.row.id;
        window.open('http://47.92.130.164:8000/user/showimg?uid=' + this.chargeForm.id)
      },
      fetchData() {
        this.listLoading = true;
        getList(this.currentPage, this.page_size).then(response => {
          this.tableData = response.data.tableData;
          this.totalPage = response.data.totalPage;
          this.ifShow = response.data.show
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
        ifShow: false,
        tableData: [],
        totalPage: 0,
        currentPage: 1,
        page_size: 20,
        page_sizes: [20, 50, 100, 200],

        dialogTableVisible: false,
        dialogFormVisible: false,
        chargeDialogFormVisible: false,
        chargeForm: {
          id: '',
          username: '',
          num: 0,
          agent_id: 0
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
