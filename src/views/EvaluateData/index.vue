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
            :data="tableData"
            stripe
            style="width: 100%"
            height="100%"
          >
            <el-table-column
              prop="create_time"
              label="创建时间"
            />
            <el-table-column
              prop="name"
              label="任务名称"
            />
            <el-table-column
              prop="create_user"
              label="创建者"
            />
            <el-table-column
              prop="state"
              label="状态"
            />
            <el-table-column label="操作">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <el-button
                    link
                    type="primary"
                    O-B
                    @click="showDetail(scope.row)"
                  >
                    详情
                  </el-button>
                  <el-button
                    link
                    type="primary"
                    O-B
                    @click="interruptAlgo(scope.row)"
                  >
                    中断
                  </el-button>
                  <el-button
                    link
                    O-B
                    type="primary"
                    @click="showDetail(scope.row)"
                  >
                    再次执行
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </main>
        <footer>
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
        <div>创建者：{{ interruptData.user }}</div>
        <div>创建时间：{{ interruptData.time }}</div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="interruptAlgo"
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
import structure3 from '@/components/Structure/structure3.vue'
import { message } from '@/utils/utils'
import { algorithmResultQuery, algorithmInterrupt } from '@/api/algorithm'
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
      interruptData: null
    }
  },
  computed: {
    total() {
      return this.tableData.length
    }
  },
  mounted() {
    algorithmResultQuery().then((res) => {
      const dict = ['队列中', '运行中', '已完成', '已中断']
      const list = res.list
      list.sort((a, b) => {
        return b.create_time - a.create_time
      })
      list.forEach((item) => {
        item.create_time = new Date(item.create_time * 1000).toLocaleString()
        item.state = dict[parseInt(item.state)]
      })
      this.tableData = list
    }).catch((err) => {
      message(err.message)
    })
  },
  methods: {
    handleSizeChange(size) {
      console.log(size)
    },
    handleCurrentChange(number) {
      console.log(number)
    },
    showDetail(row) {
      this.$router.push({
        path: '/algorithmDetail',
        query: {
          id: row.id
        }
      })
    },
    interruptAlgo(row) {
      this.interruptData = row
      this.dialogVisible = true
    },
    interruptAlgoConfirm() {
      algorithmInterrupt({
        id: this.interruptData.id
      }).then(() => {
        // success
      }).catch((err) => {
        message(err.message)
      })
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
  justify-content: flex-end;
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
