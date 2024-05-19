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
        time-format="HH:mm:ss"
        :disabled-date="judge"
      />
      <el-button
        :disabled="!duration"
        @click="logDataQuery"
      >
        <span O-R>搜索</span>
        <template #icon>
          <Search />
        </template>
      </el-button>
      <el-input
        v-model="search"
        style="width: 140px"
        placeholder="对信息检索"
        :disabled="!duration"
        @input="searchChange"
      />
      <el-select
        v-model="selectedPodName"
        placeholder="Select"
        style="width: 140px"
        title="对PodName分类"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.value"
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
          width="250"
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
            <article class="LQAE-article">
              <el-tooltip
                placement="top"
                effect="light"
              >
                <template #content>
                  <span
                    class="LogQAE__popper"
                    v-html="scope.row.showMessage"
                  />
                </template>
                <el-text
                  truncated
                >
                  <span v-html="scope.row.showMessage" />
                </el-text>
              </el-tooltip>
            </article>
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
            >查看详情</el-button>
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
        class="platform-json-viewer"
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
import { getLog } from '@/api/log'
import { judgeDuration, message } from '@/utils/utils'
export default {
  components: {
    PlatformDrawer,
    JsonViewer
  },
  data() {
    return {
      duration: null,
      search: '',
      currentPage: 1,
      pageSize: 10,
      small: false,
      background: false,
      disabled: false,
      showDetail: false,
      logData: {},
      logList: [],
      selectedPodName: '全部',
      options: [
        { value: '全部' },
        { value: 'cartservice' },
        { value: 'checkoutservice' },
        { value: 'currencyservice' },
        { value: 'emailservice' },
        { value: 'frontend' },
        { value: 'paymentservice' },
        { value: 'productcatalogservice' },
        { value: 'recommendationservice' },
        { value: 'redis' },
        { value: 'shippingservice' }
      ]
    }
  },
  computed: {
    tableData() {
      let showData = []
      if (this.selectedPodName === '全部') showData =  this.logList
      else showData = this.logList.filter((item) => item.podName === this.selectedPodName)
      if (this.search !== '') showData = showData.filter((item) => item.message.toLowerCase().indexOf(this.search.toLowerCase()) !== -1)
      showData.forEach((data) => {
        data.showMessage = this.replace(data.message)
      })
      return showData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    total() {
      const showData = this.logList.filter((item) => this.selectedPodName === '全部' ? true : item.podName === this.selectedPodName)
      if (this.search === '') return showData.length
      else return showData.filter((item) => item.message.toLowerCase().indexOf(this.search.toLowerCase()) !== -1).length
    }
  },
  methods: {
    judge(date) {
      return date.getTime() >= Date.now()
    },
    handleSizeChange() {
      //
    },
    handleCurrentChange() {
      //
    },
    replace(str) {
      // 大小写不敏感匹配时，保留原有数据
      let lowerStr = str.toLowerCase()
      const lowerSearch = this.search.toLowerCase()
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
    },
    showLogDetail(row) {
      this.logData = row.detail
      this.showDetail = true
    },
    logDataExport() {
      this.$router.push({
        name: 'DataExport',
        query: {
          type: 'log',
          s: this.duration ? this.duration[0].getTime() : undefined,
          f: this.duration ? this.duration[1].getTime() : undefined
        }
      })
    },
    logDataQuery() {
      // 日志数据查询
      if (!this.duration) return
      const startTime = this.duration[0].getTime()
      const endTime = this.duration[1].getTime()
      if (judgeDuration(startTime, endTime, 15)) {
        this.search = ''
        this.selectedPodName = '全部'
        message('开始搜索', 'success')
        getLog({
          node: 'minikube',
          start_time: startTime / 1000,
          end_time: endTime / 1000
        }).then((res) => {
          this.logList = this.initLogData(res)
        }).catch((err) => {
          this.logList = this.initLogData([])
          message(err.message)
        })
      }
    },
    initLogData(data) {
      return data.map((item) => {
        return {
          id: item._id,
          podName: item._source.kubernetes.labels.app,
          time: new Date(item._source['@timestamp']).toLocaleString(),
          message: item._source.message,
          showMessage: item._source.message,
          detail: item
        }
      })
    },
    searchChange() {
      if (!CSS.highlights) {
        message('CSS Custom Highlight API not supported.')
        return
      }
      CSS.highlights.clear()
      const str = this.search.toLowerCase()
      if (!str) return
      this.$nextTick(() => {
        const articles = document.getElementsByClassName('LQAE-article')
        if (!articles) return
        const allTextNodes = []
        for (const article of articles) {
          const treeWalker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT)
          let currentNode = treeWalker.nextNode()
          while (currentNode) {
            allTextNodes.push(currentNode)
            currentNode = treeWalker.nextNode()
          }
        }
        const ranges = allTextNodes
          .map((el) => {
            return { el, text: el.textContent.toLowerCase() }
          })
          .map(({ text, el }) => {
            const indices = []
            let startPos = 0
            while (startPos < text.length) {
              const index = text.indexOf(str, startPos)
              if (index === -1) break
              indices.push(index)
              startPos = index + str.length
            }

            // Create a range object for each instance of
            // str we found in the text node.
            return indices.map((index) => {
              const range = new Range()
              range.setStart(el, index)
              range.setEnd(el, index + str.length)
              return range
            })
          })

        // Create a Highlight object for the ranges.
        const searchResultsHighlight = new Highlight(...ranges.flat())

        // Register the Highlight object in the registry.
        CSS.highlights.set('search-results', searchResultsHighlight)
      })
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
