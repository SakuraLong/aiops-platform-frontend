<template>
  <div>
    <!-- 类都在index.vue里面 因为week和day组件类共用 -->
    <table class="calendar-table">
      <thead>
        <tr>
          <td>
            <div>
              <div d-type="time">
                <div>周{{ table.week[table.D] }}</div>
                <div>{{ table.M }}:{{ table.d }}</div>
              </div>
              <div d-type="data">
                <div
                  v-for="typeData, ti in table.typeAmount"
                  :key="ti"
                  :color-type="typeData.type"
                  d-type="data-ele"
                >{{ typeData.amount }}</div>
              </div>
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="t, i in table.time"
          :key="i"
        >
          <td
            :data-time="i > 0 ? t : null"
            td-type="calendar"
          >
            <!--  -->
          </td>
        </tr>
      </tbody>
      <table class="calendar-data-table">
        <thead>
          <tr>
            <td />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <!--  -->
              <Card
                v-for="d in data"
                v-show="selectType === '全部' || selectType === d.data.failure_type"
                :key="d.drawId"
                :v-if="d.draw"
                :type="d.data.failure_type"
                :card-data="d"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        ref="timeline"
        class="calendar-time-line"
      >
        <div time-type="left" />
        <div time-type="time">
          <span ref="timelineHour" />:<span ref="timelineMinutes" />
        </div>
        <div time-type="right" />
      </div>
    </table>
  </div>
</template>

<script>
import CalendarDataManager from './data'
import Card from './card.vue'
export default {
  components: {
    Card
  },
  props: {
    selectType: {
      default: '全部',
      type: String
    }
  },
  data() {
    return {
      table: {
        week: ['日', '一', '二', '三', '四', '五', '六'],
        time: [],
        typeAmount: [],
        D: 0,
        d: '',
        M: ''
      },
      calendarDataManager: null,
      data: [],
      timer: null,
      faultAmount: 0
    }
  },
  watch: {
    selectType() {
      this.updateFaultAmount()
    }
  },
  mounted() {
    this.initTime()
    this.initTimeLine()
    /**
     * 借用window实现单例
     */
    if (!window.calendarDataManager) window.calendarDataManager = new CalendarDataManager()
    this.calendarDataManager = window.calendarDataManager
    this.calendarDataManager.setType('day')
    this.getData()
  },
  beforeUnmount() {
    if (this.timer) clearInterval(this.timer)
  },
  methods: {
    /**
     * 时间初始化
     */
    initTime() {
      for (let i = 0; i < 24; i++) {
        this.table.time.push((i < 10 ? '0' + i.toString() : i.toString()) + ':00')
      }
    },
    /**
     * 获取数据
     */
    async getData() {
      const tdata = await this.calendarDataManager.getDataSync()
      const data = tdata[0]
      if (!Array.isArray(data)) return
      const tday = this.calendarDataManager.getCalendarShowDate()
      const day = tday[0]
      this.data = data
      this.table.typeAmount = []
      this.faultAmount = 0
      data.forEach((err) => {
        const type = err.data.failure_type
        this.faultAmount++
        const ele = this.table.typeAmount.find((ele) => ele.type === type)
        if (ele === undefined) {
          this.table.typeAmount.push({
            type: type,
            amount: 1
          })
        } else {
          ele.amount++
        }
      })
      this.table.typeAmount.sort((a, b) => a.amount - b.amount)
      this.table.D = day.D
      this.table.d = day.d
      this.table.M = day.M
      this.$emit('setFaultAmount', this.faultAmount)
    },
    lastDay() {
      this.calendarDataManager.lastDay()
      this.getData()
    },
    nextDay() {
      this.calendarDataManager.nextDay()
      this.getData()
    },
    setDay(dayBegin) {
      this.calendarDataManager.setDay(dayBegin)
      this.getData()
    },
    initTimeLine() {
      const ele = this.$refs.timeline
      const hour = this.$refs.timelineHour
      const minutes = this.$refs.timelineMinutes
      const TOP = 50
      const s = new Date().getSeconds()
      const DAY = 1000 * 60 * 60 * 24
      const analyse = (timestamp) => {
        const now = new Date(timestamp)
        const nowM = now.getMinutes() < 10 ? '0' + now.getMinutes().toString() : now.getMinutes().toString()
        const nowH = now.getHours() < 10 ? '0' + now.getHours().toString() : now.getHours().toString()
        const nowTimestamp = timestamp - new Date().setHours(0, 0, 0, 0)
        ele.style.top = 'calc((100% - ' + TOP.toString() + 'px) * ' + (nowTimestamp / DAY).toString() + ' + ' + TOP.toString() + 'px)'
        hour.textContent = nowH
        minutes.textContent = nowM
      }
      analyse(new Date().getTime())
      setTimeout(() => {
        analyse(new Date().getTime())
        this.timer = setInterval(() => {
          analyse(new Date().getTime())
        }, 60 * 1000)
      }, 60 * 1000 - s * 1000)
    },
    updateFaultAmount() {
      this.table.typeAmount = []
      this.faultAmount = 0
      this.data.forEach((err) => {
        this.faultAmount++
        const type = err.data.failure_type
        if (this.selectType !== '全部' && this.selectType !== type) return
        const ele = this.table.typeAmount.find((ele) => ele.type === type)
        if (ele === undefined) {
          this.table.typeAmount.push({
            type: type,
            amount: 1
          })
        } else {
          ele.amount++
        }
      })
      this.table.typeAmount.sort((a, b) => a.amount - b.amount)
      this.$emit('setFaultAmount', this.faultAmount)
    }
  }
}
</script>

<style>

</style>
