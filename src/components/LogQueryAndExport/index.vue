<template>
  <div class="logQAE-container">
    <header>
      <el-date-picker
        v-model="duration"
        type="datetimerange"
        start-placeholder="Start date"
        end-placeholder="End date"
        format="YYYY-MM-DD HH:mm:ss"
        date-format="YYYY-MM-DD ddd"
        time-format="A hh:mm:ss"
        :disabled-date="judge"
      />
      <el-button @click="logDataQuery">
        <span O-R>搜索</span>
        <template #icon>
          <Search />
        </template>
      </el-button>
      <el-input
        v-model="search"
        style="width: 140px"
        placeholder="对结果检索"
      />
      <el-select
        v-model="selectedPodName"
        placeholder="Select"
        style="width: 140px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        style="float: right; margin: 0;"
        title="对检索的时间区间包含的日志导出"
        @click="logDataExport"
      >
        <span O-R>导出</span>
        <template #icon>
          <Download />
        </template>
      </el-button>
    </header>
    <main>
      <el-table
        :data="tableData"
        height="100%"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="180"
        />
        <el-table-column
          prop="podName"
          label="PodName"
          width="180"
        />
        <el-table-column
          prop="time"
          label="时间"
          width="180"
        />
        <el-table-column label="信息">
          <template #default="scope">
            <el-tooltip
              placement="top"
              effect="light"
            >
              <template #content>
                <span class="LogQAE__popper">
                  {{ JSON.stringify(scope.row.message) }}
                </span>
              </template>
              <el-text truncated>
                {{ JSON.stringify(scope.row.message) }}
              </el-text>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
        >
          <template #default="scope">
            <el-button
              text
              type="primary"
              @click="showLogDetail(scope.row)"
            >查看message</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <footer>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </footer>
    <PlatformDrawer
      v-model:visible="showDetail"
      :body="true"
      title="日志预览"
      size="700px"
    >
      <JsonViewer
        :value="logData"
        theme="my-json-theme"
        copyable
        boxed
      />
    </PlatformDrawer>
  </div>
</template>

<script>
import PlatformDrawer from '@/components/PlatformDrawer'
import JsonViewer from 'vue-json-viewer'
export default {
  components: {
    PlatformDrawer,
    JsonViewer
  },
  data() {
    return {
      duration: '',
      search: '',
      currentPage: 1,
      pageSize: 10,
      small: false,
      background: false,
      disabled: false,
      showDetail: false,
      logData: {
        a: 123,
        asc: [123, 324]
      },
      logList: [
        {
          id: 'ascasc',
          podName: 'ascascasc',
          time: 'asassasaas',
          message: {
            a: 1222222222222222222222222222222222223,
            b: 'ascascascccccccccccccccccpppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppascascascccccccccccccccccppppppppppppppppppppppppppp',
            asc: [123, 324]
          }
        }
      ],
      selectedPodName: '全部',
      options: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ]
    }
  },
  computed: {
    tableData() {
      let showData = []
      if (this.selectedPodName === '全部') showData =  this.logList
      else showData = this.logList.filter((item) => item.podName === this.selectedPodName)
      if (this.search !== '') showData = showData.filter((item) => JSON.stringify(item.message).indexOf(this.search) !== -1)
      return showData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    total() {
      const showData = this.logList.filter((item) => this.selectedPodName === '全部' ? true : item.podName === this.selectedPodName)
      if (this.search === '') return showData.length
      else return showData.filter((item) => JSON.stringify(item.message).indexOf(this.search) !== -1).length
    }
  },
  methods: {
    judge(date) {
      return date.getTime() >= Date.now()
    },
    showLogDetail(row) {
      this.logData = row.message
      this.showDetail = true
    },
    logDataExport() {
      // 日志数据导出
    },
    logDataQuery() {
      // 日志数据查询
    }
  }
}
</script>

<style>
.logQAE-container {
  position: relative;
  height: 100%;
}
.logQAE-container > header {
  text-align: left;
  padding: 5px 10px;
  height: 42px;
  box-sizing: border-box;
}
.logQAE-container > header > * {
  margin-right: 10px;
}
.logQAE-container > footer {
  display: flex;
  justify-content: flex-end;
  padding: 5px 10px;
  height: 42px;
  box-sizing: border-box;
}
.logQAE-container > main {
  display: block;
  height: calc(100% - 42px * 2);
}
.LogQAE__popper {
  display: inline-block;
  max-width: 300px !important;
  max-height: 200px !important;
  overflow: auto;
}
</style>
