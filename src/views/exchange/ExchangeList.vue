<template>
  <div class="content">
    <div class="content_top">
      <div class="flex" style="box-sizing: border-box">
        <!--<div v-show="show_delete" class="tab_1 color_1 cursor-p" @click="dels">一键删除</div>-->
      </div>
    </div>
    <div class="app-container calendar-list-container">

      <!--表格-->
      <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="给我一点时间" stripe border fit
                highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column align="center"  label="商品图片" width="160">
          <template scope="scope">
            <img :src="scope.row.goods.logo" alt="" class="imgs">
          </template>
        </el-table-column>

        <el-table-column align="center" prop="goods.name" label="商品名称" width="160"></el-table-column>

        <el-table-column align="center" prop="users.username" label="兑换人" width="160"></el-table-column>
        <el-table-column align="center" prop="id_card" label="身份证" width="160"></el-table-column>
        <el-table-column align="center" prop="location" label="地区" width="160"></el-table-column>
        <el-table-column align="center" prop="phone" label="手机号" width="160"></el-table-column>

        <!--<el-table-column align="center" prop="charge_type" label="充值类型" width="160"></el-table-column>-->

        <el-table-column align="center" prop="goods.price" label="兑换价格" width="160"></el-table-column>

        <el-table-column align="center" prop="created_date" label="兑换日期" width="200"></el-table-column>

        <!--<el-table-column align="center" prop="goods_category.name" label="商品分组" width="160"></el-table-column>-->

        <el-table-column align="center"  label="操作" min-width="220">
          <!--<template scope="scope">-->
            <!--<el-button @click="deleteGoods(scope.row.id)" type="danger" size="small">删除</el-button>-->
          <!--</template>-->
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

  </div>
</template>
<script>
  import {getChangeList, getDeleteGoods, getDeleteBatch} from '@/api/agent'

  export default {
    name: 'exchangeList',
    data() {
      return {
        listLoading: false,
        totalAll: 0,
        tableData: [],
        totalPage: 0,
        currentPage: 1,
        page_size: 8,
        page_sizes: [8, 10, 20],
        multipleSelection: [],
        show_delete: 0,
        loading: true,
        scope: {
          row: {
            logo: ''
          }
        }
      };
    },
    created() {
    },
    mounted() {
      this.onload()
    },
    components: {},
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.page_size = val;
        this.onload()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val;
        this.onload()

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;

      },

      onload() {
        getChangeList(this.currentPage,this.page_size).then(response => {
          console.log(response);
          if (response.code === 20000) {
            let ary=response.data;
            this.loading = false;
            this.tableData = ary;
            this.totalPage = response.total_elements;
          }
        }).catch(err => {
          this.loading = false;
          this.$message({
            message: 'error', type: 'warning', duration: '1000'
          });
        })
      },
      currentChange(events) {
        console.log(events);
        this.currentPage = events;
        this.onload()
      }

    }
  }
</script>
<style lang="less">
  /*@import "../assets/css/base.less";*/
  .tab_1 {
    width: 80px;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    margin: 5px 20px;
  }

  .tab_1:hover {
    opacity: 0.5;
  }

  .color_1 {
    background: rgb(253, 91, 45);
  }

  .color_2 {
    background-color: rgb(64, 158, 255);
  }

  .flex {
    display: flex;
    align-items: center;
  }

  .userlist {
    border-top: solid 1px #e6e6e6;
    background-color: #fff;
  }

  .content_top {
    width: 100%;
    padding-top: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
  }
  .imgs{
    width: 80px;
    height: 80px;
  }
</style>
