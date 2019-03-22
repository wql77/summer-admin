<template>
  <div>

    <!--添加代理-->
    <el-dialog class="app-edit" title="添加代理" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="agentForm" :rules="rules" ref="agentForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="agentForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="agentForm.password"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPassword">
          <el-input type="password" v-model="agentForm.checkPassword"></el-input>
        </el-form-item>

        <!--数字类型加上number修饰符-->

        <!--<<el-form-item label="邀请码" :label-width="formLabelWidth" prop="invite_code">-->
          <!--<el-input v-model.number="agentForm.invite_code"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="代理级别" :label-width="formLabelWidth" prop="level">-->
          <!--<el-input v-model="agentForm.level"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="上级代理" :label-width="formLabelWidth" prop="parentId">-->
        <!--<el-input v-model="agentForm.parentId"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realName">
          <el-input v-model="agentForm.realName"></el-input>
        </el-form-item>

        <!--<el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">-->
          <!--<el-input v-model="agentForm.email"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="身份证" :label-width="formLabelWidth" prop="idCard">-->
          <!--<el-input v-model="agentForm.idCard"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="电话" :label-width="formLabelWidth" prop="cell">-->
          <!--<el-input v-model="agentForm.cell"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item label="区域" :label-width="formLabelWidth" prop="area">
          <el-input v-model="agentForm.area"></el-input>
        </el-form-item>

        <el-form-item label="代理类型" :label-width="formLabelWidth" prop="agent_type">
          <el-select v-model="agentForm.agent_type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


        <!--<el-form-item label="地址" :label-width="formLabelWidth">-->
          <!--<el-input v-model="agentForm.address"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="支付提成" :label-width="formLabelWidth" prop="payDeduct">-->
          <!--<el-input v-model="agentForm.payDeduct"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="分享提成" :label-width="formLabelWidth" prop="shareDeduct">-->
          <!--<el-input v-model="agentForm.shareDeduct"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="上级支付提成" :label-width="formLabelWidth" prop="parentPayDeduct">-->
          <!--<el-input v-model="agentForm.parentPayDeduct"></el-input>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="上级分享提成" :label-width="formLabelWidth" prop="parentShareDeduct">-->
          <!--<el-input v-model="agentForm.parentShareDeduct"></el-input>-->
        <!--</el-form-item>-->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddAgent('agentForm')">确 定</el-button>
      </div>

    </el-dialog>

    <!--充值-->
    <el-dialog class="app-edit" title="充值" :visible.sync="chargeDialogFormVisible" size="small" align="center">

      <template>
        <el-radio v-model="radio" label="1">房卡充值</el-radio>
        <el-radio v-model="radio" label="2">金币充值</el-radio>
      </template>

      <br>
      <br>
      <br>
      <el-form :model="chargeForm">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="chargeForm.id"></el-input>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="chargeForm.username"></el-input>
        </el-form-item>

        <el-form-item label="充值" :label-width="formLabelWidth">
          <div class="block">
            <el-input v-model="chargeForm.num" placeholder="充值"></el-input>
          </div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="doCharge">充 值</el-button>
      </div>

    </el-dialog>

    <!-- 打款-->
    <el-dialog class="app-edit" title="确认打款?" :visible.sync="chargeDialogFormVisible2" size="small" align="center">

      <el-form :model="chargeForm">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="chargeForm.id"></el-input>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="chargeForm.username"></el-input>
        </el-form-item>

        <el-form-item label="金额" :label-width="formLabelWidth">
          <div class="block">
            <el-input :disabled="true" v-model="chargeForm.earnings" placeholder="金额"></el-input>
          </div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel2">取 消</el-button>
        <el-button type="primary" @click="doCharge2">打 款</el-button>
      </div>

    </el-dialog>




    <!--删除-->
    <el-dialog class="app-edit" title="删除代理" :visible.sync="deleteFormVisible" size="small">

      <br>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </div>

    </el-dialog>


    <!--搜索框 + 表格-->
    <div class="app-container calendar-list-container">

      <div class="filter-container">
        <!--<el-input @keyup.enter.native="handleClick" style="width: 150px;" class="filter-item"-->
        <!--placeholder="用户名"></el-input>-->

        <!--<el-button class="filter-item" type="primary" v-waves icon="search" @click="handleClick">搜索</el-button>-->

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="代理用户名" v-model="listQuery.title">
        </el-input>
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="代理区域" v-model="listQuery.area">
        </el-input>
        <el-select v-model="listQuery.agent_type" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" @click="handleClick" type="primary" icon="plus">添加代理
        </el-button>


      </div>
      <br/>

      <!--表格-->
      <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="给我一点时间" stripe border fit
                highlight-current-row style="width: 100%">

        <el-table-column align="center" fixed prop="id" label="id" width="120"></el-table-column>

        <el-table-column align="center" fixed prop="username" label="用户名" width="120"></el-table-column>

        <el-table-column align="center" label="密码" width="120">
          <template scope="scope">
            <el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.password"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.password }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="area" label="区域" width="120"></el-table-column>
        <el-table-column align="center" label="邀请码" width="120">
        <template scope="scope">
        <el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.invite_code"></el-input>
        <span v-show="!scope.row.edit">{{ scope.row.invite_code }}</span>
        </template>
        </el-table-column>

        <el-table-column align="center" prop="money" label="房卡" width="120">
          <template scope="scope">
            <el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.money"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.money }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="gold" label="金币" width="120">
        <template scope="scope">
        <el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.gold"></el-input>
        <span v-show="!scope.row.edit">{{ scope.row.gold }}</span>
        </template>
        </el-table-column>

        <el-table-column align="center" prop="total2" label="累计收入" width="120">
        </el-table-column>

        <el-table-column align="center" prop="total1" label="当前总收入" width="120">
        </el-table-column>

        <el-table-column align="center" prop="firstLevel1" label="玩家收入" width="120">
        </el-table-column>
        <el-table-column align="center" prop="secondLevel1" label="代理收入" width="120">
        </el-table-column>
        <el-table-column align="center" prop="agent_type" label="代理类型" width="120">
          <template scope="scope">
            <span v-if="scope.row.agent_type===0">打折代理</span>
            <span v-else-if="scope.row.agent_type===1">返利代理</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" min-width="320">
          <template scope="scope">
            <el-button @click="handleChargeClick2(scope)" type="primary" v-if="ifShow" size="small">清返利</el-button>
            <el-button @click="handleChargeClick(scope)" type="primary" size="small">充值</el-button>
            &nbsp;

            <!--<router-link :to="'/agent/record'+scope.row.id">-->
            <!--<router-link :to="'/agent/record'">-->
              <!--<el-button type="primary" size="small">结算记录</el-button>-->
            <!--</router-link>-->
            <el-button type="primary" size="small" @click="goToNext3Level(scope)">返利记录</el-button>

            &nbsp;
            <el-button @click="handleDelete(scope)" type="danger" size="small">删除</el-button>
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
  import {getList, fetchList,deleteAgent} from '@/api/agent'
  import {charge, chargeGold, clearRebate} from '@/api/agent'
  import {agent} from '@/api/agent'
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
      goToNext3Level(scope) {
        console.log(scope.row.id)
        // this.$router.push({
        //   path: '/agent/record',
        //   params: {
        //     list: 1
        //   }
        // })

        this.$router.push({ path: '/agent/record', name: 'record', params: { userId: scope.row.id }})
      },

      getFilterList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
          this.tableData = response.data.tableData
          this.ifShow = response.data.ifShow
          this.totalPage = response.data.totalPage
          this.listLoading = false
        })
      },

      handleEditClick(scope){
        console.log("======000")
        scope.row.edit = !scope.row.edit
        //完成后修改
        if (!scope.row.edit) {
          console.log("完成--")
        }
      },
      handleClick() {
        this.dialogFormVisible = true;
      },
      handleDelete(scope) {
        this.deleteAgentId = scope.row.id;
        this.deleteFormVisible = true;
      },
      confirmDelete(){
        deleteAgent(this.deleteAgentId).then(response=>{
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.deleteFormVisible = false;
          this.fetchData();
        })
      },
      handleChargeClick(scope){
        this.chargeDialogFormVisible = true;
        this.chargeForm.id = scope.row.id;
        this.chargeForm.username = scope.row.username;
        this.chargeForm.num = 0;
      },
      handleChargeClick2(scope){
        this.chargeDialogFormVisible2 = true;
        this.chargeForm.id = scope.row.id;
        this.chargeForm.username = scope.row.username;
        // this.chargeForm.num = 0;
        this.chargeForm.earnings = scope.row.total1
      },

      cancel() {
        this.chargeDialogFormVisible = false
      },
      cancel2() {
        this.chargeDialogFormVisible2 = false
      },

      doCharge(){
        if (this.radio === '1'){
          charge(this.chargeForm).then(response => {
            this.tableData.forEach(td => {
              if (td.id === this.chargeForm.id) {
                td.money = response.data;
              }
              this.$message({
                message: '充值成功',
                type: 'success'
              })
            })
          })
        }else {
          this.chargeForm.gold_num = this.chargeForm.num;
          // alert(this.chargeForm.gold_num)
          chargeGold(this.chargeForm).then(response => {
            this.tableData.forEach(td => {
              if (td.id == this.chargeForm.id) {
                td.gold = response.data;
              }
              this.$message({
                message: '充值成功',
                type: 'success'
              })
            })
          })
        }
        this.chargeDialogFormVisible = false
      },

      doCharge2(){
        clearRebate(this.chargeForm).then(response => {
          this.tableData.forEach(td => {
            this.fetchData()
            this.$message({
              message: '打款成功',
              type: 'success'
            })
          })
        })
        this.chargeDialogFormVisible2 = false
      },
      doAddAgent(formName){
        console.log(this.$refs)
        console.log(this.agentForm);
        this.$refs[formName].validate((valid) => {
          //本地验证
          if (valid) {
            agent(this.agentForm, 'POST').then(response => {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.dialogFormVisible = false;
              //重新获取数据
              this.fetchData()
            })
          } else {
            console.log('提交失败');
            return false;
          }
        });

      },
      doDeleteAgent(){
        agent(this.agentForm, 'DELETE').then(response => {

        })
      },
      doUpdateAgent(){
        agent(this.agentForm, 'PUT').then(response => {

        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.page_size = val;
        this.fetchData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.fetchData()
      },
      fetchData() {
        this.listLoading = true;
        getList(this.currentPage, this.page_size).then(response => {
          this.tableData = response.data.tableData;
          this.ifShow = response.data.ifShow
          this.totalPage = response.data.totalPage;
          this.tableData = response.data.tableData.map(v => {
            this.$set(v, 'edit', false)
            return v
          })
          this.listLoading = false;
        });

      },
      handleClose(done){
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      checkIsNumber(rule, value, callback){
        if (isNaN(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      },
      checkPassword(rule, value, callback){
        if (this.agentForm.password != this.agentForm.checkPassword) {
          callback(new Error('两次输入密码不同'));
        } else {
          callback();
        }
      },
    },

    created() {
      this.fetchData()
      console.log(this.agentForm);
    },
    data() {
      return {
        listLoading: true,
        ifShow: false,
        radio:'1',
        tableData: [],
        totalPage: 0,
        currentPage: 1,
        page_size: 20,
        page_sizes: [20, 50, 100, 200],

        dialogTableVisible: false,
        dialogFormVisible: false,
        chargeDialogFormVisible: false,
        chargeDialogFormVisible2: false,
        deleteFormVisible:false,
        deleteAgentId:0,
        selectType:'',
        agentForm: {
          earnings: '',
          id: 0,
          username: '',
          password: '',
          checkPassword: '',
          invite_code: '',
          realName: '',
          level: '',
          parentId: '',
          email: '',
          idCard: '',
          cell: '',
          area: '',
          agent_type: '',
          address: '',
          money: 0,
          gold: 0,
          payDeduct: '',
          shareDeduct: '',
          parentPayDeduct: '',
          parentShareDeduct: '',
        },
        chargeForm: {
          id: '',
          username: '',
          gold_num: 0,
          num: 0
        },
        options: [{
          value: '0',
          label: '打折代理'
        }, {
          value: '1',
          label: '返利代理'
        }],
        options2: [
          {
            value: '',
            label: '全部'
          },{
          value: '0',
          label: '打折代理'
        }, {
          value: '1',
          label: '返利代理'
        }],
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id',
          agent_type:'',
          area:''
        },
        formLabelWidth: '120px',
        rules: {
          username: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],

          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {min: 6, max: 18, message: '长度在6 到 18位', trigger: 'blur'}
          ],
          checkPassword: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
            {validator: this.checkPassword, trigger: 'blur'}
          ],

          invite_code: [
            {required: true, message: '邀请码不能为空'},
            {type: 'number', message: '邀请码必须为数字值'}
          ],
          idCard: [
            {required: true, message: '身份证不能为空'},
            {min: 18, max: 18, message: '身份证格式不正确', trigger: 'blur'}
          ],

          level: [
            {required: true, message: '代理等级不能为空'},
            {validator: this.checkIsNumber},
          ],

          realName: [
            {required: true, message: '真实姓名不能为空'},
          ],

          email: [
            {required: true, message: '邮箱不能为空'},
            {type: 'email', message: '请输入正确的邮箱地址'}

          ],
          area: [
            {required: true, message: '区域不能为空',trigger: 'blur'},
          ],
          agent_type: [
            {required: true, message: '代理类型不能为空',trigger: 'blur'},
          ],
          parentId: [
            {required: true, message: '上级代理不能为空'},
//            {type: 'number', message: '代理等级必须为数字值'}
          ],

          cell: [
            {required: true, message: '手机不能为空'},
            {validator: this.checkIsNumber},
            {min: 11, max: 11, message: '手机格式不正确', trigger: 'blur'}
          ],
          payDeduct: [
            {required: true, message: '不能为空'},
            {validator: this.checkIsNumber},

          ],
          shareDeduct: [
            {required: true, message: '不能为空'},
            {validator: this.checkIsNumber},
          ],
          parentPayDeduct: [
            {required: true, message: '不能为空'},
            {validator: this.checkIsNumber},
          ],
          parentShareDeduct: [
            {required: true, message: '不能为空'},
            {validator: this.checkIsNumber},
          ],

        }

      }
    }
  }
</script>
