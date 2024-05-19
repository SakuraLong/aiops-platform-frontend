<template>
  <div class="log-amount-shower">
    <div ref="chart" />
  </div>
</template>

<script>
import { getLogNum } from '@/api/log'
import { message } from '@/utils/utils'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      logNum: [],
      chart: null
    }
  },
  mounted() {
    this.initLogNum()
    window.addEventListener('resize', this.resize)
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    initLogNum() {
      if (window.logNum) {
        this.logNum = window.logNum
        this.drawChart()
      } else {
        getLogNum().then((res) => {
          window.logNum = res
          this.logNum = res
          this.drawChart()
        }).catch((err) => {
          this.logNum = []
          message(err.message)
        })
      }
    },
    drawChart() {
      if (!this.$refs.chart) return
      const data = this.logNum
      const chart = echarts.init(this.$refs.chart)

      const x_data = data.map((item) => item.date)
      const y_data = data.map((item) => item.log_count)

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          containLabel: true
        },

        xAxis: {
          type: 'category',
          data: x_data,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Count',
            data: y_data,
            type: 'bar',
            itemStyle: {
              color: '#1E90FF'
            }
          }
        ]
      }
      chart.setOption(option)
      this.chart = chart
    },
    resize() {
      if (this.chart) {
        this.chart.resize()
      }
    }
  }
}
</script>

<style>
.log-amount-shower,
.log-amount-shower > div {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
