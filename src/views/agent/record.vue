
<template>
  <div>
    <br/>
    <!--搜索框 + 表格-->
    <div class="app-container calendar-list-container">

      <!--表格-->
      <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="给我一点时间" stripe border fit
                highlight-current-row style="width: 100%">

        <el-table-column align="center"  prop="date" label="清返利时间" width="160"></el-table-column>

        <el-table-column align="center" prop="first" label="一级" width="160"></el-table-column>

        <el-table-column align="center" prop="second" label="二级" width="160"></el-table-column>

        <el-table-column align="center" prop="total" label="返利总金额" width="160"></el-table-column>

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
  import { getList, fetchList, fetchRecordList } from '@/api/agentcharge'
  import { charge } from '@/api/player'
  import waves from '@/directive/waves.js'// 水波纹指令

  export default {
    directives: {
      waves
    },
    methods: {

      handleClick() {
        this.dialogFormVisible = true
      },

      handleFilter() {
        this.listQuery.page = 1
        console.log(this.listQuery)
        this.getFilterList()
      },

      getFilterList() {
        this.listLoading = true
        fetchRecordList(this.listQuery).then(response => {
          this.listLoading = false
          this.tableData = response.data.clearingRecord
          this.totalPage = response.data.size
        })
      },

      handleChargeClick(scope) {
        this.chargeDialogFormVisible = true;
        this.chargeForm.id = scope.row.id;
        this.chargeForm.username = scope.row.id;
        this.chargeForm.num = 0;
      },
      doCharge() {
        charge(this.chargeForm).then(response => {
          this.tableData.forEach(td => {
            if (td.id === this.chargeForm.id) {
              td.money = response.data
            }
            this.$message({
              message: '充值成功',
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
      fetchData() {
        this.listLoading = true;
        fetchRecordList(this.listQuery).then(response => {
          this.listLoading = false
          this.tableData = response.data.clearingRecord
          this.totalPage = response.data.size
          // this.totalPage = response.data.total
        })
      },
    },

    created() {
      // <!--var li = this.$route.params.userId-->
      var li = this.$route.params.userId
      // this.chargeForm.id = li
      this.listQuery.id = li
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
        chargeForm: {
          id: '',
          username: '',
          num: 0
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


