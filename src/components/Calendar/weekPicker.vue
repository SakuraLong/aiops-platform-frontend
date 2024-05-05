<template>
  <div class="week-picker">
    <img
      src="../../assets/images/主页/编组 8.png"
      draggable="false"
      @click="lastWeek"
    >
    <el-date-picker
      v-model="weekMonday"
      :clearable="false"
      type="week"
      format="YYYY 第 ww 周"
      placeholder="选择周"
      size="small"
      @change="setWeek"
    />
    <img
      src="../../assets/images/主页/编组 8备份.png"
      draggable="false"
      @click="nextWeek"
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      weekMonday: new Date().setDate(new Date().getDate() - new Date().getDay() + 1)
    }
  },
  methods: {
    lastWeek() {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.weekMonday -= 1000 * 60 * 60 * 24 * 7
        this.$emit('lastWeek')
      }, 300)
    },
    nextWeek() {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.weekMonday += 1000 * 60 * 60 * 24 * 7
        this.$emit('nextWeek')
      }, 300)
    },
    setWeek() {
      this.weekMonday = new Date(this.weekMonday).getTime()
      this.$emit('setWeek', this.weekMonday)
    }
  }
}
</script>

<style scoped>
.week-picker {
  display: flex;
  text-align: center;
  margin: 5px;
}
.week-picker > img {
  cursor: pointer;
  user-select: none;
  width: 25px;
  height: 25px;
}
</style>
