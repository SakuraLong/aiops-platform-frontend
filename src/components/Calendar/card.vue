<template>
  <div
    ref="card"
    :color-type="type"
    :class="{'calendar-card--triangle': triangle && height <= triangleMaxHeight }"
    class="calendar-card"
  >
    <div>
      <div>{{ data.data.failure_type }}</div>
      <div>{{ str }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * 卡片类型
     */
    type: {
      default: 'undefined',
      type: String
    },
    /**
     * 1小时对应的高度
     */
    oneHourHeight: {
      default: 80,
      type: Number
    },
    /**
     * 数据
     */
    cardData: {
      default: () => {},
      type: Object
    },
    /**
     * 是否有三角形提示
     */
    triangle: {
      default: true,
      type: Boolean
    },
    /**
     * 是否有三角形提示
     */
    triangleMaxHeight: {
      default: 10,
      type: Number
    }
  },
  data() {
    return {
      data: this.cardData, // 卡片完整数据
      ans: this.cardData.ans, // 此列需要分割成多少列
      s: this.cardData.s, // 相对于当日的开始时间戳
      f: this.cardData.f, // 相对于当日的结束时间戳
      index: this.cardData.index, // left在第几子列
      width: this.cardData.width, // 占用多少个子列
      str: '', // 显示时间的字符串
      ONE_HOUR: 1000 * 60 * 60, // 单位：ms
      bh: null, // 开始时
      bm: null, // 开始分
      by: null, // 开始年
      bM: null, // 开始月
      bd: null, // 开始日
      eh: null, // 结束时
      em: null, // 结束分
      ey: null, // 结束年
      eM: null, // 结束月
      ed: null, // 结束日
      div: null, // 小卡片根div
      height: 0
    }
  },
  mounted() {
    // console.log(this.ONE_HOUR * 24, this.f)
    const beforeHour = parseInt(this.s / this.ONE_HOUR)
    const durationHour = parseInt((this.f - this.s) / this.ONE_HOUR)
    const top = this.s / this.ONE_HOUR * this.oneHourHeight + beforeHour * 0.8
    this.$refs.card.style.top = top.toString() + 'px'
    this.$refs.card.style.width = 'calc(' + (100 / this.ans * this.width).toString() + '% - 4px )'
    this.$refs.card.style.left = 'calc(' + (this.index * (100 / this.ans)).toString() + '% + 0px)'
    this.height = ((this.f - this.s) / this.ONE_HOUR * this.oneHourHeight + durationHour * 2)
    this.$refs.card.style.height = this.height.toString() + 'px'

    const begin = new Date(this.data.data.timestamp)
    const end = new Date(this.data.data.timestamp + this.data.data.duration * 1000)

    const bh = begin.getHours() < 10 ? '0' + begin.getHours().toString() : begin.getHours().toString()
    const bm = begin.getMinutes() < 10 ? '0' + begin.getMinutes().toString() : begin.getMinutes().toString()
    const by = begin.getFullYear() < 10 ? '0' + begin.getFullYear().toString() : begin.getFullYear().toString()
    const bM = begin.getMonth() + 1 < 10 ? '0' + (begin.getMonth() + 1).toString() : (begin.getMonth() + 1).toString()
    const bd = begin.getDate() < 10 ? '0' + begin.getDate().toString() : begin.getDate().toString()

    const eh = end.getHours() < 10 ? '0' + end.getHours().toString() : end.getHours().toString()
    const em = end.getMinutes() < 10 ? '0' + end.getMinutes().toString() : end.getMinutes().toString()
    const ey = end.getFullYear() < 10 ? '0' + end.getFullYear().toString() : end.getFullYear().toString()
    const eM = end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1).toString() : (end.getMonth() + 1).toString()
    const ed = end.getDate() < 10 ? '0' + end.getDate().toString() : end.getDate().toString()
    this.bh = bh
    this.bm = bm
    this.by = by
    this.bM = bM
    this.bd = bd
    this.eh = eh
    this.em = em
    this.ey = ey
    this.eM = eM
    this.ed = ed

    this.str = bh + ':' + bm + '~' + eh + ':' + em

    this.initLittleCard()

    this.$refs.card.addEventListener('mouseenter', this.mouseEnter)
    this.$refs.card.addEventListener('mouseleave', this.mouseLeave)
  },
  beforeUnmount() {
    this.$refs.card.removeEventListener('mouseenter', this.mouseEnter)
    this.$refs.card.removeEventListener('mouseleave', this.mouseLeave)
    this.$refs.card.removeEventListener('mousemove', this.mouseMove)
    try {
      document.body.removeChild(this.div)
    } catch (err) {
      //
    }
  },
  methods: {
    /**
     * 小卡片初始化
     * - 鼠标放到卡片上后显示的小卡片
     */
    initLittleCard() {
      const div = document.createElement('div')
      const divTitle = document.createElement('div')
      const divBody = document.createElement('div')
      const divType = document.createElement('div')
      const divTime = document.createElement('div')
      const divBeginTime = document.createElement('div')
      const divEndTime = document.createElement('div')
      const divStartTime = document.createElement('div')
      const divFinishTime = document.createElement('div')

      divTitle.textContent = '故障详情'
      divType.textContent = '故障类型：' + this.type
      divTime.textContent = '故障时间：' + this.bh + ':' + this.bm + '~' + this.eh + ':' + this.em
      divBeginTime.textContent = '故障起始年月日：' + this.by + '年' + this.bM + '月' + this.bd + '日'
      divEndTime.textContent = '故障结束年月日：' + this.ey + '年' + this.eM + '月' + this.ed + '日'
      divStartTime.textContent = 's:' + this.data.s.toString()
      divFinishTime.textContent = 'f:' + this.data.f.toString()

      div.classList.add('card-detail')

      divBody.appendChild(divType)
      divBody.appendChild(divTime)
      divBody.appendChild(divBeginTime)
      divBody.appendChild(divEndTime)
      divBody.appendChild(divStartTime)
      divBody.appendChild(divFinishTime)
      div.appendChild(divTitle)
      div.appendChild(divBody)
      this.div = div
    },
    mouseEnter(e) {
      this.$refs.card.addEventListener('mousemove', this.mouseMove)
      const x = e.clientX
      const y = e.clientY
      const useX = x + this.div.clientWidth + 15 >= window.innerWidth ? window.innerWidth - this.div.clientWidth - 15 : x
      const useY = y + this.div.clientHeight + 15 >= window.innerHeight ? window.innerHeight - this.div.clientHeight - 15 : y
      this.div.style.left = (useX + 10 + window.scrollX).toString() + 'px'
      this.div.style.top = (useY + 10 + window.scrollY).toString() + 'px'
      document.body.appendChild(this.div)
    },
    mouseLeave() {
      this.$refs.card.removeEventListener('mousemove', this.mouseMove)
      try {
        document.body.removeChild(this.div)
      } catch (err) {
        //
      }
    },
    mouseMove(e) {
      const x = e.clientX
      const y = e.clientY
      const useX = x + this.div.clientWidth + 15 >= window.innerWidth ? window.innerWidth - this.div.clientWidth - 15 : x
      const useY = y + this.div.clientHeight + 15 >= window.innerHeight ? window.innerHeight - this.div.clientHeight - 15 : y
      this.div.style.left = (useX + 10 + window.scrollX).toString() + 'px'
      this.div.style.top = (useY + 10 + window.scrollY).toString() + 'px'
    }
  }
}
</script>

<style>

.calendar-card {
  user-select: none;
  position: absolute;
  border-radius: 4px;
  background-color: var(--light-color);
  overflow: visible;
  cursor: pointer;
  /* cursor: default; */
  transition: 0.3s all ease;
  border-left: 4px solid var(--base-color);
  z-index: 1;
}
.calendar-card:hover {
  z-index: 900;
  color: white;
  transition: 0.3s all ease;
  background-color: var(--base-color);
  box-shadow: 0px 4px 16px 0px var(--shadow-color);
}
.calendar-card > div {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.calendar-card > div > div {
  white-space: nowrap; /* 确保文本在一行内显示 */
  overflow: hidden; /* 超出容器部分隐藏 */
  text-overflow: ellipsis; /* 使用省略号表示被截断的文本 */
}

.card-detail {
  text-align: left;
  user-select: none;
  pointer-events: none;
  position: absolute;
  z-index: 9999;
  background-color: #ffffff;
  left: 0px;
  top: 0px;
  padding: 4px;
  border-radius: 4px;
  box-shadow: 0px 4px 12px 0px rgba(165,183,193,0.3);
}
.calendar-card--triangle::after {
  position: absolute;
  z-index: 10;
  content: " ";
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-left: 6px solid var(--base-color);
}

</style>
