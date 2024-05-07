<template>
  <div class="DME-metric">
    <div class="DME-metric__left">
      <header>
        <div class="DME-metric-l__header-select">
          <span>PodName:</span>
          <el-select
            v-model="selectedPodname"
            placeholder="Select"
            style="width: 120px"
            size="small"
          >
            <el-option
              v-for="item in podnameOptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-button
            size="small"
            title="对检索的时间区间包含的指标导出"
            @click="metricDataExport"
          >
            <span O-R>导出</span>
            <template #icon>
              <Download />
            </template>
          </el-button>
        </div>
      </header>
      <CardTitle style="margin: 0;">
        指标列表
      </CardTitle>
      <main>
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox-group
          v-model="selectedNames"
          class="DME-metric__checkbox-group"
          @change="handleCheckedNameChange"
        >
          <el-checkbox
            v-for="name in metricsNames"
            :key="name"
            :label="name"
            :value="name"
          >
            {{ name }}
          </el-checkbox>
        </el-checkbox-group>
      </main>
    </div>
    <div class="DME-metric__right">
      <MetricCard
        v-for="card in metricChartsShow"
        :key="card"
        ref="metricCard"
        :name="card.name"
        :pod="selectedPodname"
        :style="{ '--name': card.name }"
        class="DME-metric-chart"
        @syncTime="syncTime"
        @hideCard="hideCard"
      />
    </div>
  </div>
</template>

<script>
import CardTitle from '@/components/CardTitle'
import MetricCard from '@/components/MetricCard'
import { metricPodnameOptions, metricMetricsNames, metricMetricCharts } from '@/utils/staticData'
export default {
  components: {
    CardTitle,
    MetricCard
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      podnameOptions: metricPodnameOptions,
      selectedPodname: 'checkoutservice',
      metricsNames: metricMetricsNames,
      selectedNames: [
        'container_cpu_cfs_periods_total',
        'container_cpu_cfs_throttled_seconds_total',
        'container_cpu_load_average_10s',
        'container_cpu_system_seconds_total',
        'container_threads'
      ],
      metricCharts: metricMetricCharts,
      metricChartsShow: []
    }
  },
  mounted() {
    this.showCharts()
  },
  methods: {
    handleCheckAllChange(val) {
      this.selectedNames = val ? this.metricsNames : []
      this.isIndeterminate = false
      this.showCharts()
    },
    handleCheckedNameChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.metricsNames.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.metricsNames.length
      this.showCharts()
    },
    showCharts() {
      const pushCharts = () => {
        this.selectedNames.forEach((select) => {
          if (this.metricChartsShow.find(item => item.name === select) === undefined) {
            this.metricChartsShow.unshift(this.metricCharts.find(item => item.name === select))
          }
        }) // 加入
        this.metricChartsShow = this.metricChartsShow.filter((item) => this.selectedNames.indexOf(item.name) !== -1)
        // 删除
      }
      pushCharts()
      // 目前页面结构使用视图变换会出现渲染顺序不正确
      // 视图变换强制在最顶层
      // if (document.startViewTransition) { // 如果支持就视图变换
      //   document.startViewTransition(() => { // 开始视图变换
      //     pushCharts()
      //   })
      // } else { // 不支持就执行原来的逻辑
      //   pushCharts()
      // }
    },
    metricDataExport() {
      //
    },
    syncTime(time) {
      const metricCards = this.$refs.metricCard
      for (const metricCard of metricCards) {
        metricCard.receiveTime(time)
      }
    },
    hideCard(name) {
      this.selectedNames = this.selectedNames.filter((item) => item !== name)
      this.showCharts()
    }
  }
}
</script>

<style>
.DME-metric {
  position: relative;
  display: flex;
  height: 100%;
}
.DME-metric__left {
  position: relative;
  box-sizing: border-box;
  width: 300px;
  border-right: 1px solid #E9EBF2;
}
.DME-metric__right {
  position: relative;
  width: calc(100% - 300px);
}
.DME-metric__left > header {
  display: flex;
  box-sizing: border-box;
  height: 45px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E9EBF2;
}
.DME-metric__left > header > div {
  height: auto;
  display: flex;
  align-items: center;
  padding: 0px 5px;
}
.DME-metric-l__header-select > span {
  font-size: 12px;
  line-height: 20px;
  margin-right: 5px;
}
.DME-metric__left > main {
  height: calc(100% - 45px - 24px);
  overflow: auto;
}
.DME-metric__checkbox-group {
  display: flex;
  flex-direction: column;
}
.DME-metric__checkbox-group label {
  max-width: 100%;
  overflow: hidden;
  margin-right: 5px;
  border-radius: 4px;
}
.DME-metric__checkbox-group > .is-checked {
  background-color: #E5F5FF;
}
.DME-metric__checkbox-group label:hover {
  overflow: auto;
}
.DME-metric__right {
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
  overflow: auto;
}
.DME-metric-chart {
  view-transition-name: var(--name);
}
::view-transition-old(root) {
    /* z-index: -1; */
    /* animation: none; */
}

::view-transition-new(root) {
    /* z-index: -1;
  mix-blend-mode: normal; */
    /* animation: clip 50s ease-in; */
    /* transition: all 50s linear; */
}
</style>
