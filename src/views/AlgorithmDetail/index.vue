<template>
  <structure3>
    <template #card-r-1>
      <div class="AD-container">
        <header>
          <CardTitle>
            算法：{{ detail.algorithm ? detail.algorithm.name : '' }}
          </CardTitle>
          <div class="AD-header-back">
            <el-button size="small" type="primary" plain @click="back">
              <template #icon>
                <el-icon>
                  <Back />
                </el-icon>
              </template>
              返回
            </el-button>
          </div>
          <el-table :data="[detail]" style="width: 100%" show-overflow-tooltip>
            <el-table-column prop="createTimeStr" label="创建时间" width="250" />
            <el-table-column prop="create_user" label="创建者" width="180" />
            <el-table-column prop="name" label="任务名称" />
            <el-table-column prop="id" label="任务ID" />
          </el-table>
          <el-table :data="metric" style="width: 100%" show-overflow-tooltip>
            <el-table-column prop="precision" label="precision" />
            <el-table-column prop="recall" label="recall" />
            <el-table-column prop="f1score" label="f1score" />
          </el-table>
        </header>
        <main>
          <CardTitle v-if="failureRes">
            <span style="color: #f56c6c;">运行失败</span>
          </CardTitle>
          <div v-if="failureRes">
            <span>失败原因：{{ failureRes }}</span>
          </div>
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
      metric: [],
      failureRes: ''
    }
  },
  mounted() {
    if (Object.keys(this.detail).length === 0 || this.detail.id.toString() !== this.$route.query.id.toString()) {
      this.$router.push({
        name: 'EvaluateData'
      })
      return
    }
    const id = this.$route.query.id
    if (id) {
      algorithmResultDetail({
        id
      }).then((res) => {
        res = res.result
        if (typeof res === 'string') {
          this.failureRes = res
        } else {
          this.metric = [{
            precision: res.metric[0],
            recall: res.metric[1],
            f1score: res.metric[2]
          }]
          this.draw(res.predict)
        }
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
        predictData.push([item[1], item[2]])
        labelData.push([item[0], item[3]])
        labelData.push([item[1], item[3]])
      })
      const predictOption = {
        xAxis: {
          min: predictData[0][0] - 10
        },
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
        xAxis: {
          min: labelData[0][0] - 10
        },
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
      if (predictDom && labelDom) {
        const predictChart = echarts.init(predictDom)
        const labelChart = echarts.init(labelDom)
        predictChart.setOption(predictOption)
        labelChart.setOption(labelOption)
        this.predictChart = predictChart
        this.labelChart = labelChart
      }
    },
    resize() {
      if (this.predictChart) {
        this.predictChart.resize()
      }
      if (this.labelChart) {
        this.labelChart.resize()
      }
    },
    back() {
      this.$router.back()
    }
  }

}
</script>

<style>
.AD-container {
  position: relative;
}
.AD-header-back {
  position: absolute;
  right: 0;
  top: 0;
}
.AD-chart-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.AD-chart {
  width: 100%;
  position: relative;
  height: 300px;
}
.AD-chart--empty {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
