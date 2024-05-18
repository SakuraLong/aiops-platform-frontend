<template>
  <div class="week-picker">
    <!-- <img
      src="../../assets/images/主页/编组 8.png"
      draggable="false"
      @click="lastWeek"
    > -->
    <el-button size="small" @click="lastWeek">
      <template #icon>
        <el-icon>
          <ArrowLeft />
        </el-icon>
      </template>
    </el-button>
    <el-date-picker
      v-model="weekMonday"
      :clearable="false"
      type="week"
      format="YYYY 第 ww 周"
      placeholder="选择周"
      size="small"
      @change="setWeek"
    />
    <!-- <img
      src="../../assets/images/主页/编组 8备份.png"
      draggable="false"
      @click="nextWeek"
    > -->
    <el-button size="small" @click="lastWeek">
      <template #icon>
        <el-icon>
          <ArrowRight />
        </el-icon>
      </template>
    </el-button>
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

<style>
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
.week-picker > button {
  padding: 5px;
}
.week-picker > button:first-child {
  border-radius: 4px 0px 0px 4px;
}
.week-picker > button:last-child {
  border-radius: 0px 4px 4px 0px;
}
.week-picker > div {
  border-radius: 0px !important;
}
.week-picker > div .el-input__wrapper {
  width: 150px !important;
}
</style>
