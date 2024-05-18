<template>
  <div>
    <el-header height="32px" style="margin: 16px 0">
      <el-input v-model="prompt" style="margin-right: 16px; width: 200px" placeholder="请输入要搜索的角色名" suffix-icon="Edit" clearable @keyup.enter="handleSearch" @clear="handleSearch" />
      <el-button type="primary" icon="Search" @click="handleSearch">搜索</el-button>
      <el-button type="primary" icon="Plus" @click="handleCreate">创建</el-button>
    </el-header>
    <el-divider />
    <el-main>
      <el-table :data="filterData" style="width: 100%">
        <el-table-column label="角色等级" width="100">
          <template #default="scope">
            <b style="padding-left: 2em">{{ scope.row.level }}</b>
          </template>
        </el-table-column>
        <el-table-column label="角色名称">
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色编码">
          <template #default="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色描述">
          <template #default="scope">
            <span>{{ scope.row.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="210">
          <template #default="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后一次修改时间" width="210">
          <template #default="scope">
            <span>{{ scope.row.lastEditTime }}</span>
          </template>
        </el-table-column>
        <el-table-column width="180" label="操作">
          <template #default="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button :disabled="code === scope.row.code" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog v-model="dialog.isShow" :title="isEditState ? '修改角色' : '创建角色'" width="30%" :before-close="handleClose">
      <el-form label-width="100px">
        <el-form-item label="角色名称*">
          <el-input v-model="item.name" clearable required />
        </el-form-item>
        <el-form-item v-if="!isEditState" label="角色编码*">
          <el-input v-model="item.code" clearable required />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="item.desc" type="textarea" clearable required />
        </el-form-item>
        <el-table v-if="code !== item.code" ref="multipleTable" :data="headers" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column label="权限选择">
            <template #default="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <template #footer>
        <el-button @click="dialog.isShow = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
/**
 * headers and handleCreate need editing when modify the edge authority
 */
import { message } from '@/utils/utils'
import { getRoleList, addRole, updateRole, deleteRole } from '@/api/systemManagement'
export default {
  data() {
    return {
      prompt: '', // 搜索提示
      dialog: {
        isShow: false // 是否显示对话框
      },
      headers: [
        // 故障注入授权
        {
          label: 'Fault-injection',
          name: '故障注入'
        },
        // 运维数据监控授权
        {
          label: 'DataMonitor',
          name: '数据监控'
        },
        // 故障检测授权
        {
          label: 'Detection',
          name: '多模态异常检测'
        },
        // 故障诊断授权
        {
          label: 'Diagnosis',
          name: '多模态故障诊断'
        },
        // 系统日志
        {
          label: 'RecordShow',
          name: '实验记录'
        },
        // 系统管理
        {
          label: 'Manage',
          name: '系统管理'
        }
      ],
      tableData: [], // 原始数据
      filterData: [], // 过滤数据
      item: {},
      isEditState: false, // edit state
      isSelectionInitialized: false
    }
  },
  computed: {
    code() {
      const ownRoles = this.$store.getters.ownRoles
      return ownRoles.length !== 0 ? ownRoles[0] : ''
    }
  },
  mounted() {
    this.fetchRoles()
  },
  methods: {
    initializeSelectionTable() {
      this.isSelectionInitialized = true
      this.$nextTick(() => {
        this.headers.forEach((item) => {
          this.$refs.multipleTable.toggleRowSelection(item, false)
          if (this.item.authorityListDict[item.label]) {
            this.$refs.multipleTable.toggleRowSelection(item, true)
          }
        })
        this.isSelectionInitialized = false
      })
    },
    filterTableData() {
      if (this.prompt === '') {
        this.filterData = this.tableData
      } else {
        this.filterData = this.tableData.filter((item) => item.code.includes(this.prompt))
      }
    },
    fetchRoles() {
      // fetch
      getRoleList().then((data) => {
        this.tableData = data
        this.filterTableData()
      }).catch((err) => {
        message(err.message)
      })
    },
    handleCreate() {
      // create template
      this.item = {
        level: 2,
        name: '',
        code: '',
        desc: '',
        createTime: Date.now(),
        lastEditTime: Date.now(),
        authorityListDict: {
          // 故障注入授权
          'Fault-injection': true,
          // 运维数据监控授权
          DataMonitor: true,
          // 故障检测授权
          Detection: true,
          // 故障诊断授权
          Diagnosis: true,
          // 系统管理
          Manage: false,
          // 实验记录
          RecordShow: true
        }
      }
      // show dialog
      this.dialog.isShow = true

      // initialize for authority
      this.initializeSelectionTable()
      // set state to no edit
      this.isEditState = false
    },
    handleChange() {
      if (this.item.name === '') {
        // 不可为空
        this.$alert('角色名称不能为空')
        return
      }
      if (this.item.code === '') {
        this.$alert('角色编码不能为空')
        return
      }
      // update
      if (this.isEditState) {
        // transiform time (string) to (int 11)
        this.item.createTime = Date.parse(this.item.createTime)
        this.item.lastEditTime = Date.now()
        updateRole(this.item).then(() => {
          // fetch
          this.fetchRoles()
        }).catch((err) => {
          message(err.message)
        })
      } else {
        addRole(this.item).then(() => {
          // fetch
          this.fetchRoles()
          // test
        }).catch((err) => {
          message(err.message)
        })
      }
      this.dialog.isShow = false
    },
    handleEdit(index, row) {
      this.isEditState = true
      this.item = {
        ...row
      }
      // show dialog
      this.dialog.isShow = true
      // update

      // initialize for authority
      if (this.code !== this.item.code) {
        this.initializeSelectionTable()
      }
    },
    handleDelete(index, row) {
      this.$confirm('确认删除角色名为' + row.name + '的角色？')
        .then(() => {
          deleteRole(row).then(() => {
            // fetch
            this.fetchRoles()
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
    handleSelectionChange(valueList) {
      if (this.isSelectionInitialized) {
        return
      }
      // reset authority
      this.headers.forEach((item) => {
        this.item.authorityListDict[item.label] = false
      })
      // grant authority
      valueList.forEach((item) => {
        this.item.authorityListDict[item.label] = true
      })
    }
  }
}
</script>
