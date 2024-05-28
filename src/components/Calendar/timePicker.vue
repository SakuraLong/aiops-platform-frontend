<template>
  <div class="calendar-time-picker">
    <el-button size="small" @click="lastUse">
      <template #icon>
        <el-icon>
          <ArrowLeft />
        </el-icon>
      </template>
    </el-button>
    <el-date-picker
      v-model="time"
      :clearable="false"
      :type="type"
      :format="type === 'week' ? 'YYYY 第 ww 周' : 'YYYY/MM/DD'"
      :placeholder="type === 'week' ? '选择周' : '选择天'"
      size="small"
      @change="setTime"
    />
    <el-button size="small" @click="nextUse">
      <template #icon>
        <el-icon>
          <ArrowRight />
        </el-icon>
      </template>
    </el-button>
  </div>
</template>

<script>
import { debounce } from '@/utils/utils'
export default {
  props: {
    type: {
      default: 'week',
      type: String
    }
  },
  data() {
    return {
      DAY: 1000 * 60 * 60 * 24,
      WEEK: 1000 * 60 * 60 * 24 * 7,
      lastUse: null,
      nextUse: null,
      time: new Date(new Date().setHours(0, 0, 0, 0))
    }
  },
  beforeMount() {
    this.lastUse = debounce(this.last)
    this.nextUse = debounce(this.next)
  },
  mounted() {
    //
  },
  methods: {
    last() {
      const tTime = this.type === 'week' ? this.time.getTime() - this.WEEK : this.time.getTime() - this.DAY
      this.time = new Date(tTime)
      this.emitChange('last')
    },
    next() {
      const tTime = this.type === 'week' ? this.time.getTime() + this.WEEK : this.time.getTime() + this.DAY
      this.time = new Date(tTime)
      this.emitChange('next')
    },
    setTime() {
      this.emitChange('set')
    },
    emitChange(type = 'set') {
      this.time = new Date(this.time)
      const res = new Date(this.time)
      if (this.type === 'week') {
        res.setDate(res.getDate() - res.getDay()) // to Sunday
      }
      this.$emit('timePickerChange', res, res.getTime(), type)
    },
    getTime() {
      const res = new Date(this.time)
      if (this.type === 'week') {
        res.setDate(res.getDate() - res.getDay()) // to Sunday
      }
      return res.getTime()
    }
  }
}
</script>

<style>
.calendar-time-picker {
  display: flex;
  text-align: center;
  margin: 5px;
}
.calendar-time-picker > img {
  cursor: pointer;
  user-select: none;
  width: 25px;
  height: 25px;
}
.calendar-time-picker > button {
  padding: 5px;
}
.calendar-time-picker > button:first-child {
  border-radius: 4px 0px 0px 4px;
}
.calendar-time-picker > button:last-child {
  border-radius: 0px 4px 4px 0px;
}
.calendar-time-picker > div {
  border-radius: 0px !important;
}
.calendar-time-picker > div .el-input__wrapper {
  width: 150px !important;
}
</style>
