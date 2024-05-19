<template>
  <div class="DME-trace">
    <div class="DME-trace__left">
      <header O-R>
        <div>
          <el-date-picker
            v-model="duration"
            size="small"
            type="datetimerange"
            start-placeholder="Start date"
            end-placeholder="End date"
            :disabled-date="judge"
            style="width: 200px; margin-right: 5px"
          />
          <el-button
            size="small"
            :disabled="!duration"
            @click="searchTraceList"
          >
            <template #icon>
              <Search />
            </template>
            搜索
          </el-button>
        </div>
        <div>
          <el-button size="small" @click="traceDataExport">
            <template #icon>
              <Download />
            </template>
            导出
          </el-button>
        </div>
      </header>
      <main>
        <TraceCard
          v-for="trace, i in traceList.slice((currentPage - 1) * 10, currentPage * 10)"
          :key="i"
          :data="trace"
          :active="(currentPage - 1) * 10 + i === activeTraceCard"
          @click="clickTraceCard((currentPage - 1) * 10 + i)"
        />
      </main>
      <footer>
        <el-pagination
          v-model:current-page="currentPage"
          small
          layout="prev, pager, next"
          :total="total"
          :page-size="10"
        />
      </footer>
    </div>
    <div class="DME-trace__right">
      <header v-show="traceGraph.length > 0">
        <div class="DME-trace__detail">
          <div O-B>
            <span>{{ traceGraph[0] && traceGraph[0].operation_name }}</span>
          </div>
          <div O-R>
            <div class="DME-trace__detail__little">
              <span>起始点</span>
              <span>{{ traceGraph[0] && new Date(traceGraph[0].timestamp / 1000).toLocaleString() }}</span>
            </div>
            <div class="DME-trace__detail__little">
              <span>持续时间</span>
              <span>{{ traceGraph[0] && traceGraph[0].duration / 1000 }}ms</span>
            </div>
            <span class="DME-trace__detail-id">{{ traceGraph[0] && traceGraph[0].span_id }}</span>
          </div>
        </div>
        <div>
          <el-radio-group v-model="showType">
            <el-radio-button
              label="图表"
              value="1"
            />
            <el-radio-button
              label="表格"
              value="2"
            />
          </el-radio-group>
        </div>
      </header>
      <main>
        <TraceGraph
          v-if="showType === '1'"
          :data="traceGraph"
        />
        <TraceTable
          v-else-if="showType === '2'"
          :data="traceGraph"
        />
      </main>
    </div>
  </div>
</template>

<script>
import TraceCard from '@/components/TraceCard'
import TraceGraph from '@/components/TraceGraph'
import TraceTable from '@/components/TraceTable'
import { getTraceList, getTrace } from '@/api/trace'
import { judgeDuration, message, deepClone } from '@/utils/utils'
export default {
  components: {
    TraceCard,
    TraceGraph,
    TraceTable
  },
  data() {
    return {
      showGraph: true,
      duration: null,
      traceGraph: [],
      traceList: [],
      currentPage: 1,
      showType: '1',
      activeTraceCard: -1,
      traceMap: new Map() // 减少调用接口次数
    }
  },
  computed: {
    total() {
      return this.traceList.length
    }
  },
  methods: {
    judge(date) {
      return date.getTime() >= Date.now()
    },
    clickTraceCard(i) {
      this.activeTraceCard = i
      const searchId = this.traceList[i].trace_id
      if (this.traceMap.has(searchId)) {
        this.traceGraph = deepClone(this.traceMap.get(searchId))
      } else {
        this.traceGraph = []
        getTrace({
          trace_id: searchId
        }).then((res) => {
          const traceGraph = res
          this.traceMap.set(searchId, deepClone(traceGraph))
          this.traceGraph = traceGraph
        }).catch((err) => {
          message(err.message)
          this.traceGraph = []
        })
      }
    },
    searchTraceList() {
      if (!this.duration) return
      const startTime = this.duration[0].getTime()
      const endTime = this.duration[1].getTime()
      if (judgeDuration(startTime, endTime, 15)) {
        message('开始搜索', 'success')
        getTraceList({
          start_time: startTime / 1000,
          end_time: endTime / 1000
        }).then((res) => {
          this.currentPage = 1
          this.activeTraceCard = -1
          this.traceList = res
          this.clickTraceCard(0)
        }).catch((err) => {
          message(err.message)
        })
      }
    },
    traceDataExport() {
      this.$router.push({
        name: 'DataExport',
        query: {
          type: 'trace',
          s: this.duration ? this.duration[0].getTime() : undefined,
          f: this.duration ? this.duration[1].getTime() : undefined
        }
      })
    }
  }
}
</script>

<style>
.DME-trace {
  position: relative;
  display: flex;
  height: 100%;
}
.DME-trace__left {
  position: relative;
  box-sizing: border-box;
  width: 380px;
  border-right: 1px solid #E9EBF2;
}
.DME-trace__right {
  position: relative;
  width: calc(100% - 380px);
}
.DME-trace__left > header {
  display: flex;
  box-sizing: border-box;
  height: 45px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E9EBF2;
}
.DME-trace__left > header > div {
  height: auto;
  display: flex;
  align-items: center;
  padding: 0px 5px;
}
.DME-trace__left > main {
  height: calc(100% - 45px * 2);
  padding: 0px 10px;
  overflow: auto;
}
.DME-trace__left > footer {
  display: flex;
  box-sizing: border-box;
  height: 45px;
  border-top: 1px solid #E9EBF2;
  justify-content: center;
  align-items: center;
}
.DME-trace__right > header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.DME-trace__right > main {
  height: calc(100% - 60px);
}
.DME-trace__detail > div:nth-child(1) {
  font-size: 18px;
}
.DME-trace__detail > div:nth-child(2) {
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.DME-trace__detail__little {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
}
.DME-trace__detail__little > span:nth-child(1) {
  padding: 0px 6px;
  background-color: #748C9A;
  border-radius: 8px;
  color: white;
}
.DME-trace__detail__little > span:nth-child(2) {
  margin: 0px 5px;
  font-size: 13px;
}
.DME-trace__detail-id {
  color: #748C9A;
  font-size: 12px;
  margin-left: 5px;
}
</style>
