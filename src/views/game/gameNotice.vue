<template>
  <div>

    <!--添加公告-->
    <el-dialog class="app-edit" title="添加公告" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="公告内容" :label-width="formLabelWidth" prop="content">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAdd('form')">确 定</el-button>
      </div>
    </el-dialog>

    <!--搜索框 + 表格-->
    <div class="app-container calendar-list-container">
      <div class="filter-container">
        <el-button class="filter-item" style="margin-left: 10px;" @click="handleClick" type="primary" icon="plus">添加游戏公告
        </el-button>
      </div>
      <br/>
      <!--表格-->
      <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="给我一点时间" stripe border fit
                highlight-current-row style="width: 100%">
        <el-table-column align="center" prop="id" label="id"></el-table-column>
        <el-table-column align="center" prop="content" label="公告内容"></el-table-column>
        <el-table-column align="center" prop="created_date" label="创建时间"></el-table-column>
        <el-table-column align="center" label="操作" max-width="320">
          <template scope="scope">
            <el-button @click="handleEdit(scope.row.id)" type="primary" size="small">编辑</el-button>
            <el-button @click="handleDelete(scope.row.id)" type="danger" size="small">删除</el-button>
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
  import {gameNoticeList,gameNoticeDetail,addGameNotice,deleteGameNotice} from '@/api/agent'

  export default {
    data() {
      return {
        listLoading: true,
        tableData: [],
        totalPage: 0,
        currentPage: 1,
        page_size: 20,
        page_sizes: [20, 50, 100, 200],
        pageNumber:1,
        dialogFormVisible: false,
        form:{
          content:'',
        },
        formLabelWidth: '120px',
        rules: {
          content: [
            {required: true, message: '请输入公告内容', trigger: 'blur'},
          ],
        },
        editFlg:false,
        noticeId:''
      }
    },
    created() {
      this.getGameNoticeList()
    },
    methods: {
      //获取列表
      getGameNoticeList() {
        this.listLoading = true;
        gameNoticeList(this.pageNumber,this.page_size).then(response => {
          this.total = response.total_elements;
          this.listLoading = false;
          this.tableData = response.data;
          this.totalPage = response.total_pages;
        }).catch(err =>{

        })
      },
      //编辑
      handleEdit(id) {
        this.dialogFormVisible = true;
        this.editFlg = true;
        gameNoticeDetail(id).then(response => {
           if(response.code===20000){
             this.form.content=response.data.content;
             this.noticeId=id;
           }
        }).catch(err =>{
          this.$message({
            message: '操作失败', type: 'warning', duration: '1000'
          });
        })
      },
      //删除
      handleDelete(id){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params={
            id: id
          };
          deleteGameNotice(params)
            .then((response) => {
              if (response.code === 20000) {
                this.getGameNoticeList();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
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
            message: '已取消删除'
          });
        });
      },
      handleClick(){
        this.dialogFormVisible = true;
        this.editFlg = false;
      },
      doAdd(formName){
        let params;
        if(this.editFlg){
          params={
            "content":this.form.content,
            "id":this.noticeId
          }
        }else{
          params={
            "content":this.form.content
          }
        }
        this.$refs[formName].validate((valid) => {
          //本地验证
          if (valid) {
            addGameNotice(params, 'POST').then(response => {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.form.content='';
              //重新获取数据
              this.getGameNoticeList()
            })
          } else {
            console.log('提交失败');
            return false;
          }
        });

      },
      handleSizeChange(val) {
        this.page_size = val;
        this.getGameNoticeList()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getGameNoticeList()
      },
      handleClose(done){
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
    },
  }
</script>
