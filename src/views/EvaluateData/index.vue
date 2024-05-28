<template>
  <structure3>
    <template #card-r-1>
      <div class="ED-container">
        <header>
          <!-- <span
            class="blue-button ED-header__button"
            @click="newDialogVisible = true"
          >
            新增算法模板
          </span> -->
        </header>
        <main>
          <el-table
            :data="showData"
            stripe
            style="width: 100%"
            height="100%"
            :default-sort="{ prop: 'createTimeStr', order: 'descending' }"
            @sort-change="sortChange"
            @selection-change="selectionChange"
          >
            <el-table-column type="selection" width="55" :selectable="selectable" />
            <el-table-column
              prop="createTimeStr"
              label="创建时间"
              sortable="custom"
              :sort-orders="['ascending', 'descending']"
            />
            <el-table-column
              prop="name"
              label="任务名称"
              min-width="100"
            >
              <template #header>
                <div style="display: flex;">
                  <span style="width: 100px;">任务名称</span>
                  <el-input
                    v-model="filterName"
                    size="small"
                    placeholder="筛选任务名称"
                    style="max-width: 240px;"
                  />
                </div>
              </template>
              <template #default="scope">
                <span v-html="replace(scope.row.name)" />
              </template>
            </el-table-column>
            <el-table-column
              prop="algorithm.name"
              label="算法名称"
            >
              <template #header>
                <div style="display: flex;">
                  <span style="width: 100px;">算法名称</span>
                  <el-select
                    v-model="selectAlgorithmName"
                    placeholder="筛选算法名称"
                    size="small"
                    style="max-width: 240px;"
                  >
                    <el-option
                      v-for="item in algorithmNameOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="ID"
              sortable="custom"
              :sort-orders="['ascending', 'descending']"
            />
            <el-table-column
              prop="create_user"
              label="创建者"
            >
              <template #header>
                <div style="display: flex;">
                  <span style="width: 75px;">创建者</span>
                  <el-select
                    v-model="selectCreateUser"
                    placeholder="筛选创建者"
                    size="small"
                    style="max-width: 240px;"
                  >
                    <el-option
                      v-for="item in createUserOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template #header>
                <div style="display: flex;">
                  <span style="width: 50px;">状态</span>
                  <el-select
                    v-model="selectStatus"
                    placeholder="筛选状态"
                    size="small"
                    style="max-width: 240px;"
                  >
                    <el-option
                      v-for="item in selectStatusOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </div>
              </template>
              <template #default="scope">
                <el-text :type="scope.row.type" tag="b">
                  {{ scope.row.statusStr }}
                </el-text>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="180">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <el-button
                    :disabled="scope.row.status !== 2 && scope.row.status !== 4"
                    link
                    type="primary"
                    O-B
                    @click="showDetail(scope.row)"
                  >
                    详情
                  </el-button>
                  <el-button
                    :disabled="scope.row.status !== 0 && scope.row.status !== 1"
                    link
                    type="primary"
                    O-B
                    @click="interruptAlgo(scope.row)"
                  >
                    中断
                  </el-button>
                  <el-button
                    :disabled="scope.row.status === 0 || scope.row.status === 1"
                    link
                    O-B
                    type="primary"
                    @click="algoRunAgain(scope.row)"
                  >
                    再次执行
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </main>
        <footer>
          <span>
            <el-button
              type="danger"
              :disabled="selectionList.length === 0"
              plain
              @click="deleteData"
            >
              删除选中
            </el-button>
            <el-button
              type="primary"
              plain
              @click="queryAlgo"
            >
              <template #icon>
                <el-icon>
                  <Refresh />
                </el-icon>
              </template>
              刷新
            </el-button>
          </span>
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </footer>
      </div>
    </template>
    <template #shadow>
      <el-dialog
        v-model="dialogVisible"
        title="是否中断"
        width="500"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        align-center
      >
        <span>是否中断任务：{{ interruptData.name }}</span>
        <div>创建者：{{ interruptData.create_user }}</div>
        <div>创建时间：{{ interruptData.createTimeStr }}</div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="interruptAlgoConfirm"
            >
              中断
            </el-button>
          </div>
        </template>
      </el-dialog>
    </template>
  </structure3>
</template>

<script>
import store from '@/store'
import structure3 from '@/components/Structure/structure3.vue'
import { message } from '@/utils/utils'
import { algorithmResultQuery, algorithmInterrupt, algorithmResultDelete, algorithmRun } from '@/api/algorithm'
export default {
  components: {
    structure3
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 100,
      small: false,
      background: false,
      disabled: false,
      tableData: [],
      dialogVisible: false,
      interruptData: null,
      selectionList: [],
      filterName: '',
      selectAlgorithmName: '全部',
      algorithmNameOptions: ['全部'],
      selectCreateUser: '全部',
      createUserOptions: ['全部'],
      selectStatus: '全部',
      selectStatusOptions: ['全部', '队列中', '运行中', '已完成', '已中断', '运行失败']
    }
  },
  computed: {
    useData() {
      const t1 = this.filterName === '' ? this.tableData : this.tableData.filter((item) => item.name.indexOf(this.filterName) !== -1)
      const t2 = this.selectAlgorithmName === '全部' ? t1 : t1.filter((item) => item.algorithm.name === this.selectAlgorithmName)
      const t3 = this.selectStatus === '全部' ? t2 : t2.filter((item) => item.statusStr === this.selectStatus)
      const t4 = this.selectCreateUser === '全部' ? t3 : t3.filter((item) => item.create_user === this.selectCreateUser)
      return t4
    },
    showData() {
      return this.useData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    total() {
      return this.useData.length
    }
  },
  mounted() {
    this.queryAlgo()
  },
  methods: {
    sortChange(data) {
      const column = data.column
      const prop = data.prop
      const order = data.order
      console.log(column, prop, order)
      this.tableData.sort((a, b) => {
        switch (prop) {
          case 'id':
            if (order === 'ascending') return a.id - b.id
            else return b.id - a.id
          case 'createTimeStr':
            if (order === 'ascending') return a.create_time - b.create_time
            else return b.create_time - a.create_time
          default:
            return 1
        }
      })
    },
    handleSizeChange(size) {
      // console.log(size)
    },
    handleCurrentChange(number) {
      // console.log(number)
    },
    showDetail(row) {
      store.state.algorithmDetail = row
      this.$router.push({
        path: '/algorithmDetail',
        query: {
          id: row.id
        }
      })
    },
    queryAlgo() {
      message('查询中', 'success')
      algorithmResultQuery().then((res) => {
        const dict = ['队列中', '运行中', '已完成', '已中断', '运行失败']
        const typeDict = [null, 'primary', 'success', 'warning', 'danger']
        const list = res.list
        const algorithmNameOptionsSet = new Set()
        const createUserOptionsSet = new Set()
        list.sort((a, b) => {
          return b.create_time - a.create_time
        })
        list.forEach((item) => {
          algorithmNameOptionsSet.add(item.algorithm.name)
          createUserOptionsSet.add(item.create_user)
          item.status = parseInt(item.status)
          item.id = parseInt(item.id)
          item.createTimeStr = new Date(item.create_time * 1000).toLocaleString()
          item.statusStr = dict[item.status]
          item.type = typeDict[item.status]
        })
        this.algorithmNameOptions = ['全部', ...Array.from(algorithmNameOptionsSet)]
        this.createUserOptions = ['全部', ...Array.from(createUserOptionsSet)]
        this.tableData = list
        message('查询完成', 'success')
      }).catch((err) => {
        message('查询失败：' + err.message)
      })
    },
    interruptAlgo(row) {
      this.interruptData = row
      this.dialogVisible = true
    },
    interruptAlgoConfirm() {
      this.dialogVisible = false
      algorithmInterrupt({
        id: this.interruptData.id
      }).then(() => {
        message('中断成功', 'success')
        this.queryAlgo()
      }).catch((err) => {
        message('中断失败：' + err.message)
      })
    },
    selectionChange(selectionList) {
      this.selectionList = selectionList
    },
    deleteData() {
      const deleteList = this.selectionList.map((item) => item.id)
      algorithmResultDelete({
        id_list: deleteList
      }).then((res) => {
        message('删除成功', 'success')
        this.queryAlgo()
      }).catch((err) => {
        message('删除失败：' + err.response.data.message)
      })
    },
    algoRunAgain(row) {
      const data = row
      algorithmRun({
        id: data.algorithm.id,
        name: data.name,
        start_time: data.algorithm.start_time,
        end_time: data.algorithm.end_time
      }).then(() => {
        message('运行成功', 'success')
        this.queryAlgo()
      }).catch((err) => {
        message(err.message)
      })
    },
    selectable(row) {
      return [0, 1].indexOf(row.status) === -1
    },
    replace(str) {
      // 大小写不敏感匹配时，保留原有数据
      let lowerStr = str.toLowerCase()
      const lowerSearch = this.filterName.toLowerCase()
      if (!lowerSearch) return str
      const before = '<span search-results>'
      const after = '</span>'
      let startPos = 0
      while (startPos < lowerStr.length) {
        const index = lowerStr.indexOf(lowerSearch, startPos)
        if (index === -1) break
        const target = str.slice(index, index + lowerSearch.length)
        str = str.slice(0, index) + before + target + after + str.slice(index + lowerSearch.length)
        lowerStr = lowerStr.slice(0, index) + before + target + after + lowerStr.slice(index + lowerSearch.length)
        startPos = index + before.length + lowerSearch.length + after.length
      }
      return str
    }
  }

}
</script>

<style>
.ED-container {
  height: 100%;
}
.ED-container > header {
  height: 40px;
  text-align: left;
}
.ED-container > footer {
  height: 40px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ED-container > main {
  height: calc(100% - 40px * 2);
}
.ED-header__button {
  display: inline-block;
  padding: 8px;
  border-radius: 12px;
}
.ED-drawer {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  text-align: left;
}
.ED-drawer__item {
  display: grid;
  grid-template-columns: 35% 65%;
}
</style>
