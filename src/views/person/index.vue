<template>
  <div>


    <!--充值-->
    <el-dialog class="app-edit" title="修改密码" :visible.sync="chargeDialogFormVisible" size="small">

      <el-form :model="chargeForm">
        <el-form-item label="输入密码" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="chargeForm.pwd1"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input :disabled="false" v-model="chargeForm.pwd2"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doCharge">修 改</el-button>
      </div>

    </el-dialog>
    <!--提现 弹框-->
    <el-dialog class="app-edit" title="提现" :visible.sync="dialogFormVisibleMoney" :before-close="handleClose">
      <el-form :model="formMoney" :rules="rulesMoney" ref="formMoney">
        <el-form-item label="支付方式" :label-width="formLabelWidth" prop="region">
          <el-select v-model="formMoney.type" placeholder="请选择支付方式">
            <el-option label="银行账号" value="0"></el-option>
            <el-option label="支付宝账号" value="1"></el-option>
            <el-option label="微信号" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开户银行" :label-width="formLabelWidth" prop="content" v-show="this.formMoney.type==='0'">
          <el-input type="input" v-model="formMoney.name"></el-input>
        </el-form-item>
        <el-form-item label="对应的账号" :label-width="formLabelWidth" prop="content">
          <el-input type="input" v-model="formMoney.number"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth" prop="content">
          <el-input type="input" v-model="formMoney.phone"></el-input>
        </el-form-item>
        <el-form-item label="提现金额" :label-width="formLabelWidth" prop="content">
          <el-input type="input" v-model="formMoney.money"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleMoney = false">取 消</el-button>
        <el-button type="primary" @click="doMoney('formMoney')">确 定</el-button>
      </div>
    </el-dialog>
    <!--搜索框 + 表格-->
    <div class="app-container calendar-list-container">

      <!--表格-->
      <el-table :data="tableData" v-loading.body="listLoading" element-loading-text="给我一点时间" stripe border fit
                highlight-current-row style="width: 100%">

        <el-table-column align="center" fixed prop="id" label="id" width="120"></el-table-column>

        <el-table-column align="center" fixed prop="username" label="用户名" width="120"></el-table-column>
        <el-table-column align="center" fixed prop="gold" label="金币" width="120"></el-table-column>
        <!--<el-table-column align="center" label="密码" width="120">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.password"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.password }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" label="真实姓名" width="120">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.realName"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.realName }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" label="邀请码" width="120">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.invite_code"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.invite_code }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" prop="level" label="代理级别" min-width="120">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.level"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.level }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" prop="parentId" label="上级代理" width="120">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.parentId"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.parentId }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column align="center" prop="gold" label="金币" width="120">-->
        <el-table-column align="center" prop="money" label="房卡" width="120">


          <template scope="scope">
            <el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.money"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.money }}</span>
          </template>
        </el-table-column>

        <!--<el-table-column align="center" prop="gold" label="点券" width="120">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.gold"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.gold }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" prop="cell" label="电话" width="145">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.cell"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.cell }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" label="邮箱" width="200">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.email"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.email }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" label="身份证" width="205">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.idCard"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.idCard }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" label="支付提成" width="120">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.payDeduct"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.payDeduct }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" label="分享提成" width="120">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.shareDeduct"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.shareDeduct }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" label="上级支付提成" width="120">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small"-->
                      <!--v-model="scope.row.parentPayDeduct"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.parentPayDeduct }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" label="上级分享提成" width="70">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small"-->
                      <!--v-model="scope.row.parentShareDeduct"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.parentShareDeduct }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" label="所属区域" width="150">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.area"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.area }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column align="center" prop="address" label="地址" width="150">-->
          <!--<template scope="scope">-->
            <!--<el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.address"></el-input>-->
            <!--<span v-show="!scope.row.edit">{{ scope.row.address }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column align="center" prop="invite_code" label="邀请码" width="120">
          <template scope="scope">
            <el-input type="textarea" v-show="scope.row.edit" size="small" v-model="scope.row.invite_code"></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.invite_code }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" min-width="220">
          <template scope="scope">
            <!--<el-button :type="scope.row.edit?'success':'primary'" @click='handleEditClick(scope)' size="small"-->
            <!--icon="edit">{{scope.row.edit ? '完成' : '编辑'}}-->
            <!--</el-button>-->
            <!--<el-button @click="handleClick" type="primary" size="small">编辑</el-button>-->
            <el-button @click="handleChargeClick(scope)" type="primary" size="small">修改密码</el-button>
            <el-button @click="handleIn(scope)" type="danger" size="small" v-for='role in roles' v-if="role==='delegate'" :key="role">提现</el-button>
            <!--<el-button @click="handleClick" type="danger" size="small">删除</el-button>-->
          </template>
        </el-table-column>

      </el-table>
    </div>

    <!--<div class="block">-->
      <!--<span class="demonstration"></span>-->
      <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="currentPage"-->
        <!--:page-sizes="page_sizes"-->
        <!--:page-size="page_size"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="totalPage">-->
      <!--</el-pagination>-->
    <!--</div>-->

    <br>

  </div>
</template>

<script>
  import { fetchList} from '@/api/agent'
  import { getList, changePwd,getMoney} from '@/api/person'
  import {charge} from '@/api/agent'
  import {agent} from '@/api/agent'
  import waves from '@/directive/waves.js'// 水波纹指令
  import { mapGetters } from 'vuex'
  export default {
    directives: {
      waves
    },
    computed: {
      ...mapGetters([
        'name',
        'roles',
      ])
    },
    methods: {

      handleFilter(){
        this.listQuery.page = 1;
        console.log(this.listQuery);
        this.getFilterList()
      },

      getFilterList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.list = response.data.items;
          this.total = response.data.total;
          this.listLoading = false;
          this.tableData = response.data.tableData;
          this.totalPage = response.data.totalPage;
          this.listLoading = false
        })
      },
      handleIn(scope){
        this.dialogFormVisibleMoney = true;
        this.agentUserId = scope.row.id;
        console.log(scope.row.id)
      },
      handleEditClick(scope){
        console.log("======000");
        scope.row.edit = !scope.row.edit;
        //完成后修改
        if (!scope.row.edit) {
          console.log("完成--")
        }
      },
      handleClick() {
        this.dialogFormVisible = true;
      },
      handleChargeClick(scope){
        this.chargeDialogFormVisible = true;
//        this.chargeForm.id = scope.row.id;
//        this.chargeForm.username = scope.row.id;
      },
      doCharge(){
        if (this.chargeForm.pwd1 !== this.chargeForm.pwd2){
            alert("两次输入密码不一致");
            return
        }
        if (this.chargeForm.pwd1.length < 6 || this.chargeForm.pwd1.length > 18){
            alert("请输入6到18位密码");
            return
        }
        changePwd(this.chargeForm.pwd1).then(response => {
          this.chargeForm.pwd1 = null;
          this.chargeForm.pwd2 = null;
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        });
        this.chargeDialogFormVisible = false
      },
      doAddAgent(formName){
        console.log(this.$refs);
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
      doMoney(formName){
        let params={
          "money": this.formMoney.money,
           "name": this.formMoney.name,
           "number": this.formMoney.number,
           "phone": this.formMoney.phone,
           "type": this.formMoney.type,
           "agent_user_id": this.agentUserId
        };
        //console.log(this.params);
        this.$refs[formName].validate((valid) => {
          //本地验证
          if (valid) {
            getMoney(params).then(response => {
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.dialogFormVisibleMoney = false;
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
        console.log(`每页 ${val} 条`);
        this.page_size = val;
        this.fetchData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.fetchData()
      },
      fetchData() {
        this.listLoading = true;
        getList(this.currentPage, this.page_size).then(response => {
          this.tableData = response.data.tableData;
          this.totalPage = response.data.totalPage;
          this.tableData = response.data.tableData.map(v => {
            this.$set(v, 'edit', false);
            return v
          });
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
        if (this.agentForm.password !== this.agentForm.checkPassword) {
          callback(new Error('两次输入密码不同'));
        } else {
          callback();
        }
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
        agentForm: {
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
          address: '',
          money: 0,
          gold: 0,
          payDeduct: '',
          shareDeduct: '',
          parentPayDeduct: '',
          parentShareDeduct: '',
        },
        chargeForm: {
          pwd1: '',
          pwd2: '',
        },

        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          referee: undefined,
          type: undefined,
          sort: '+id'
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

        },
        dialogFormVisibleMoney:false,
        agentUserId:'',
        formMoney:{
          money: 0,
          name: "",
          number: "",
          phone: "",
          type: "0"
        },
        rulesMoney:{
          money: [
            {required: true, message: '请输入金额', trigger: 'blur'},
            {type: 'number', message: '必须为数字值'}
          ],
          name: [
            {required: true, message: '请输入开户行', trigger: 'blur'},
          ],
          number: [
            {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
        }
      }
    }
  }
</script>
