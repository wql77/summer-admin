<template>
  <div class="content">
    <div class="content_top">
      <div class="flex" style="box-sizing: border-box">
        <div class="tab_1 color_2 cursor-p" style="margin:5px 10px" @click="addGood">添加商品</div>
        <div v-show="show_delete" class="tab_1 color_1 cursor-p" @click="dels">一键删除</div>
      </div>
    </div>
    <div class="app-container calendar-list-container">

      <!--表格-->
      <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="给我一点时间" stripe border fit
                highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column align="center"  label="商品图片" width="160">
          <template scope="scope">
            <img :src="scope.row.logo" alt="" class="imgs">
          </template>
        </el-table-column>

        <el-table-column align="center" prop="name" label="商品名称" width="160"></el-table-column>

        <el-table-column align="center" prop="price" label="价格" width="160"></el-table-column>

        <el-table-column align="center" prop="gift_voucher" label="商品礼券" width="160"></el-table-column>

        <el-table-column align="center" prop="goods_category.name" label="商品分组" width="160"></el-table-column>
        <el-table-column align="center" prop="create_date" label="创建时间" width="200"></el-table-column>

        <el-table-column align="center" label="操作" min-width="220">
          <template scope="scope">
            <el-button @click='changeGood(scope.row.id)' size="small"
                       icon="edit">编辑
            </el-button>
            <!--<el-button @click="handleClick" type="primary" size="small">编辑</el-button>-->
            <el-button @click="deleteGoods(scope.row.id)" type="danger" size="small">删除</el-button>
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

  </div>
</template>
<script>
  import {getDeleteBatch, getDeleteGoods, getGoodsList} from '@/api/agent'

  export default {
    name: 'goodList',
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
        console.log(`每页 ${val} 条`);
        this.page_size = val;
        this.onload()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.onload()

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        if (val.length === 0) {
          this.show_delete = 0;
        } else {
          this.show_delete = 1;
        }
      },
      dels() {
        getDeleteBatch(this.multipleSelection)
          .then((response) => {
            if (response.code === 20000) {
              this.onload();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                message: 'error', type: 'warning', duration: '1000'
              });
            }
          }).catch(err => {
          this.$message({
            message: 'error', type: 'warning', duration: '1000'
          });
        })
      },
      deleteGoods(id) {
        let that = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getDeleteGoods(id)
            .then((response) => {
              if (response.code === 20000) {
                that.onload();
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message({
                  message: 'error', type: 'warning', duration: '1000'
                });
              }
            }).catch(err => {
            this.$message({
              message: 'error', type: 'warning', duration: '1000'
            });
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      onload() {
        getGoodsList(this.currentPage, this.page_size).then(response => {
          if (response.code === 20000) {
            let ary = response.data;
            for (var i in ary) {
              try {
                let newAry = ary[i].create_date.split('T');
                ary[i].create_date = newAry[0] + ' ' + newAry[1]
              } catch (e) {
              }
            }
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
      add0(m) {
        return m < 10 ? '0' + m : m
      },
      currentChange(events) {
        console.log(events);
        this.currentPage = events;
        this.onload()
      },
      addGood() {
        this.$router.push({
          path: 'AddGoods'
        })
      },
      changeGood(id) {
        this.$router.push({
          path: 'AddGoods',
          query: {goodsId: id}
        })
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
    margin: 5px 0;
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

  .imgs {
    width: 80px;
    height: 80px;
  }
</style>
