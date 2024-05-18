<template>
  <structure6>
    <template #card-r-1>
      <div class="DE-card-r-1">
        <div>
          <router-link
            v-for="route, i in routeList"
            :key="i"
            class="link DE-card-r-1__link"
            :class="{'DE-card-r-1__link--selected': $route.params.type === undefined ? route.routeName === 'all' : $route.params.type === route.routeName}"
            :to="route.path"
            O-B
          >
            <span>{{ route.name }}</span>
          </router-link>
        </div>
      </div>
    </template>
    <template #card-r-2>
      <div class="DE-card-r-2">
        <header>
          <div>
            <el-select
              v-show="!$route.params.type"
              v-model="selectedExportType"
              placeholder="选择导出类型"
              style="width: 140px"
              title="选择导出类型"
            >
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-date-picker
              v-model="duration"
              type="datetimerange"
              start-placeholder="Start date"
              end-placeholder="End date"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="YYYY-MM-DD"
              time-format="HH:mm:ss"
              :disabled-date="judge"
            />
            <el-button
              :disabled="!duration"
              title="导出"
              @click="dataExport"
            >
              <span O-R>导出</span>
              <template #icon>
                <Download />
              </template>
            </el-button>
          </div>
        </header>
        <main>
          <DataExportTable />
        </main>
      </div>
    </template>
  </structure6>
</template>

<script>
import structure6 from '@/components/Structure/structure6.vue'
import DataExportTable from '@/components/DataExportTable'
import ExportManager from '@/components/DataExportTable/exportManager'
export default {
  components: {
    structure6,
    DataExportTable
  },
  data() {
    return {
      routeList: [
        {
          name: '全部',
          path: '/dataExport',
          routeName: 'all'
        },
        {
          name: '日志',
          path: '/dataExport/log',
          routeName: 'log'
        },
        {
          name: '指标',
          path: '/dataExport/metric',
          routeName: 'metric'
        },
        {
          name: '调用链',
          path: '/dataExport/trace',
          routeName: 'trace'
        }
      ],
      options: ['log', 'metric', 'trace'],
      selectedExportType: 'log',
      duration: null,
      exportManager: null
    }
  },
  computed: {
    exportType() {
      return this.$route.params.type || this.selectedExportType
    }
  },
  mounted() {
    if (!window.exportManager) window.exportManager = new ExportManager()
    if (this.$route.query) {
      this.selectedExportType = this.$route.query.type || 'log'
      const s = parseInt(this.$route.query.s)
      const f = parseInt(this.$route.query.f)
      if (s && f) {
        this.duration = [new Date(s), new Date(f)]
      }
    }
    if (['log', 'metric', 'trace'].indexOf(this.selectedExportType) === -1) this.selectedExportType = 'log'
    this.exportManager = window.exportManager
  },
  methods: {
    judge(date) {
      return date.getTime() >= Date.now()
    },
    dataExport() {
      if (this.duration) {
        const startTime = this.duration[0].getTime()
        const endTime = this.duration[1].getTime()
        this.exportManager.createDownload(this.exportType, {
          start_time: Math.floor(startTime / 1000),
          end_time: Math.floor(endTime / 1000)
        })
      }
    }
  }
}
</script>

<style>

.DE-card-r-1 {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.DE-card-r-1 > div {
  display: flex;
}
.DE-card-r-1__link {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 10px;
  padding: 0 10px;
  color: #A5B7C1;
  transition: .3s;
}
.DE-card-r-1__link::after {
  position: absolute;
  width: calc(100% - 10px * 2);
  height: 2px;
  content: ' ';
  background-color: #00a2ff00;
  bottom: 0;
  transform: translateY(5px);
  border-radius: 4px;
  transition: .3s;
}
.DE-card-r-1__link:hover,
.DE-card-r-1__link--selected {
  color: black;
  transition: .3s;
}
/* .DE-card-r-1__link:hover::after, */
.DE-card-r-1__link--selected::after {
  transition: .3s;
  background-color: #00A0FF;
}
.DE-card-r-2 {
  position: relative;
  width: 100%;
  height: 100%;
}
.DE-card-r-2 > header {
  height: 35px;
  display: flex;
  align-items: center;
  justify-items: flex-start;
}
.DE-card-r-2 > header > div > * {
  margin: 0px 5px;
}
.DE-card-r-2 > main {
  height: calc(100% - 35px);
  overflow: auto;
  width: 100%;
  position: relative;
}
</style>
