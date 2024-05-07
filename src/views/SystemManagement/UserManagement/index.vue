<template>
  <div>
    <el-header height="32px" style="margin: 16px 0">
      <el-input v-model="prompt" style="margin-right: 16px; width: 200px" placeholder="请输入要搜索的用户名" suffix-icon="Edit" clearable @keyup.enter="handleSearch" @clear="handleSearch" />
      <el-button type="primary" icon="Search" @click="handleSearch">搜索</el-button>
      <el-button :disabled="batchItems.length !== 0" type="primary" icon="Plus" @click="handleCreate">创建</el-button>
      <el-button :disabled="batchItems.length === 0" type="danger" icon="Minus" @click="handleBatchDelete">删除</el-button>
    </el-header>
    <el-divider />
    <el-main>
      <el-table :data="filterData" style="width: 100%" @selection-change="handleBatchSelection">
        <el-table-column type="selection" width="55" />
        <el-table-column label="用户编号" width="80">
          <template #default="scope">
            <b style="padding-left: 2em">{{ scope.row.id }}</b>
          </template>
        </el-table-column>
        <el-table-column label="用户名">
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template #default="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱">
          <template #default="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="部门">
          <template #default="scope">
            <span>{{ scope.row.department }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template #default="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上次修改时间" width="140">
          <template #default="scope">
            <span>{{ scope.row.lastEditTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已授予角色">
          <template #default="scope">
            <el-tag v-for="role in scope.row.ownRoles" :key="role" style="margin-right: 5px" type="success">{{ role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="180" label="操作">
          <template #default="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog v-model="dialog.isShow" :title="isEditState ? '修改用户信息' : '创建用户'" width="30%" :before-close="handleClose">
      <el-form label-width="100px">
        <el-form-item v-if="!isEditState" label="用户名*">
          <el-input v-model="item.name" clearable required />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="item.phone" clearable />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="item.email" clearable />
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="item.department" clearable />
        </el-form-item>
        <el-form-item v-if="isEditState && !isSetPassword">
          <el-button type="danger" @click="isSetPassword = true">修改密码</el-button>
        </el-form-item>
        <el-form-item v-else label="密码*">
          <el-input v-model="item.password" clearable required />
        </el-form-item>
        <el-form-item label="授权角色">
          <el-select v-model="item.ownRoles" multiple placeholder="请选择">
            <el-option v-for="role in roleTypes" :key="role" :label="role" :value="role" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialog.isShow = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { message } from '@/utils/utils'
import CryptoJS from 'crypto-js'
import { getRoleTypes, getUserList, addUser, updateUser, deleteUser, deleteBatchUser } from '@/api/system-management'
export default {
  data() {
    return {
      prompt: '', // 搜索提示
      dialog: {
        isShow: false // 是否显示对话框
      },
      headers: ['lastEditTime', 'ownRoles'],
      /** sample
       *{
        id: 0,
        name: '张三',
        phone: '13478414545',
        email: '',
        department: '管理部门',
        createTime: '2023-9-6 12:59:59',
        lastEditTime: '2016-8-9 14:59:55',
        ownRoles: ['user']
      },
       */
      tableData: [], // 原始数据
      filterData: [], // 过滤数据
      batchItems: [],
      roleTypes: [],
      item: {},
      isEditState: false, // edit state
      isSetPassword: false // 是否修改密码
    }
  },
  mounted() {
    this.fetchRoleTypes()
    this.fetchUsers()
  },
  methods: {
    /**
     * @description 根据搜索条件过滤列表
     */
    filterTableData() {
      if (this.prompt === '') {
        // 空，全放行
        this.filterData = this.tableData
      } else {
        // 条件过滤
        this.filterData = this.tableData.filter((item) => item.name.includes(this.prompt))
      }
    },
    fetchRoleTypes() {
      getRoleTypes().then((data) => {
        this.roleTypes = data
      }).catch((err) => {
        message(err)
      })
    },
    fetchUsers() {
      // fetch
      getUserList().then((data) => {
        this.tableData = data
        this.filterTableData()
      }).catch((err) => {
        message(err)
      })
    },
    handleCreate() {
      // create template
      this.item = {
        id: '',
        name: '',
        phone: '',
        email: '',
        department: '',
        description: '',
        password: 'nkcs@aiops',
        createTime: Date.now(),
        lastEditTime: Date.now(),
        ownRoles: []
      }
      // show dialog
      this.dialog.isShow = true

      // set state to no edit
      this.isEditState = false
    },
    handleChange() {
      if (this.item.name === '') {
        // 不可为空
        this.$alert('用户名不能为空')
        return
      }
      if (this.item.password === '') {
        // 不可为空
        this.$alert('密码不能为空')
        return
      }
      this.item.password = CryptoJS.AES.encrypt(this.item.password, CryptoJS.enc.Utf8.parse('nkcs@@@@aiops@!3'), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.ZeroPadding
      }).toString()
      // update
      if (this.isEditState) {
        this.item.createTime = Date.parse(this.item.createTime)
        this.item.lastEditTime = Date.now()
        if (!this.isSetPassword) {
          // 约定不修改密码
          this.item.password = ''
        }
        updateUser(this.item).then(() => {
          // fetch
          this.fetchRoleTypes()
          this.fetchUsers()
        }).catch((err) => {
          message(err)
        })
      } else {
        addUser(this.item).then(() => {
          // fetch
          this.fetchRoleTypes()
          this.fetchUsers()
          // test
        }).catch((err) => {
          message(err)
        })
      }
      this.dialog.isShow = false
    },
    handleEdit(index, row) {
      this.isSetPassword = false
      this.isEditState = true
      this.item = {
        ...row
      }
      // show dialog
      this.dialog.isShow = true
      // update
    },
    handleDelete(index, row) {
      this.$confirm('确认删除用户名为' + row.name + '的用户？')
        .then(() => {
          deleteUser({
            id: row.id
          }).then(() => {
            this.fetchRoleTypes()
            this.fetchUsers()
          })
        }).catch((err) => {
          message(err)
        })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        }).catch((err) => {
          message(err)
        })
    },
    handleSearch() {
      this.filterTableData()
    },
    handleBatchSelection(value) {
      this.batchItems = value
    },
    handleBatchDelete() {
      const params = this.batchItems.map((item) => item.id)
      this.$confirm('确认批量删除id为' + params.join(',') + '的用户？')
        .then(() => {
          deleteBatchUser(params).then(() => {
            this.fetchRoleTypes()
            this.fetchUsers()
          })
        }).catch((err) => {
          message(err)
        })
    }
  }
}
</script>
