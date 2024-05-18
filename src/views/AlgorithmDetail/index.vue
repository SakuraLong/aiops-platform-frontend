<template>
  <structure3>
    <template #card-r-1>
      <div>
        <header>
          <CardTitle>
            算法：{{ detail.algorithm_name }}
          </CardTitle>
          <el-table :data="[detail]" style="width: 100%">
            <el-table-column prop="createTimeStr" label="创建时间" width="250" />
            <el-table-column prop="create_user" label="创建者" width="180" />
            <el-table-column prop="name" label="任务名称" />
            <el-table-column prop="id" label="任务ID" />
          </el-table>
          <el-table :data="metric" style="width: 100%">
            <el-table-column prop="precision" label="precision" />
            <el-table-column prop="recall" label="recall" />
            <el-table-column prop="f1score" label="f1score" />
          </el-table>
        </header>
        <main>
          <CardTitle>实际值</CardTitle>
          <div class="AD-chart-container">
            <el-empty v-show="!labelChart" class="AD-chart AD-chart--empty" description="暂无数据" />
            <div ref="label" class="AD-chart" />
          </div>
          <CardTitle>预测值</CardTitle>
          <div class="AD-chart-container">
            <el-empty v-show="!predictChart" class="AD-chart AD-chart--empty" description="暂无数据" />
            <div ref="predict" class="AD-chart" />
          </div>
        </main>
      </div>
    </template>
  </structure3>
</template>

<script>
import * as echarts from 'echarts'
import store from '@/store'
import CardTitle from '@/components/CardTitle'
import structure3 from '@/components/Structure/structure3.vue'
import { algorithmResultDetail } from '@/api/algorithm'
import { message } from '@/utils/utils'
export default {
  components: {
    structure3,
    CardTitle
  },
  data() {
    return {
      detail: store.state.algorithmDetail,
      predictChart: null,
      labelChart: null,
      metric: []
    }
  },
  mounted() {
    if (Object.keys(this.detail).length === 0) {
      this.$router.push({
        name: 'EvaluateData'
      })
    }
    console.log(this.detail)
    const id = this.$route.query.id
    if (id) {
      algorithmResultDetail({
        id
      }).then((res) => {
        this.metric = [{
          precision: res.metric[0],
          recall: res.metric[1],
          f1score: res.metric[2]
        }]
        this.draw(res.result)
      }).catch((err) => {
        message('数据获取失败：' + err.message)
      })
    }
    window.addEventListener('resize', this.resize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    draw(data) {
      const predictData = []
      const labelData = []
      data.forEach((item) => {
        predictData.push([item[0], item[2]])
        labelData.push([item[0], item[3]])
      })
      predictData.push([data.at(-1)[1], data.at(-1)[2]])
      labelData.push([data.at(-1)[1], data.at(-1)[3]])
      const predictOption = {
        xAxis: {},
        yAxis: {},
        tooltip: {
          trigger: 'axis'
        },
        series: [
          {
            data: predictData,
            type: 'line'
          }
        ]
      }
      const labelOption = {
        xAxis: {},
        yAxis: {},
        tooltip: {
          trigger: 'axis'
        },
        series: [
          {
            data: labelData,
            type: 'line'
          }
        ]
      }
      const predictDom = this.$refs.predict
      const labelDom = this.$refs.label
      const predictChart = echarts.init(predictDom)
      const labelChart = echarts.init(labelDom)
      predictChart.setOption(predictOption)
      labelChart.setOption(labelOption)
      this.predictChart = predictChart
      this.labelChart = labelChart
    },
    resize() {
      if (this.predictChart) {
        this.predictChart.resize()
      }
      if (this.labelChart) {
        this.labelChart.resize()
      }
    }
  }

}
</script>

<style>
.AD-chart-container {
  position: relative;
}
.AD-chart {
  width: 100%;
  position: relative;
  height: 200px;
}
.AD-chart--empty {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
