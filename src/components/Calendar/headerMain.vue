<template>
  <div>
    <div class="calendar-header__left">
      <timePicker ref="timePicker" :type="weekShow ? 'week' : 'date'" @timePickerChange="timePickerChange" />
      <span>检索到<span style="color: #00A0FF;">{{ faultAmount }}</span>条数据</span>
    </div>
    <div class="calendar-header__right">
      <div class="header__controller">
        <span>故障类型：</span>
        <el-select
          v-model="_selectFault"
          style="width: 80px;"
          size="small"
          placeholder="请选择"
        >
          <el-option
            v-for="item in selectFaultOptions"
            :key="item"
            :value="item"
          />
        </el-select>
        <div class="controller__weekday">
          <span
            :class="{'controller__weekday--selected': !_weekShow}"
            @click="_weekShow = false"
          >
            日
          </span>
          <span
            :class="{'controller__weekday--selected': _weekShow}"
            @click="_weekShow = true"
          >
            周
          </span>
        </div>
      </div>
      <div class="data__controller">
        <router-link
          class="blue-button link data__controller__link"
          to="/dataMonitor"
        >
          数据监控
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import timePicker from './timePicker.vue'
export default {
  components: {
    timePicker
  },
  props: {
    faultAmount: {
      default: 0,
      type: Number
    },
    selectFault: {
      default: '全部',
      type: String
    },
    selectFaultOptions: {
      default: () => [],
      type: Array
    },
    weekShow: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    _selectFault: {
      get() {
        return this.selectFault
      },
      set(val) {
        this.$emit('update:selectFault', val)
      }
    },
    _weekShow: {
      get() {
        return this.weekShow
      },
      set(val) {
        this.$emit('update:weekShow', val)
      }
    }
  },
  methods: {
    toDataMonitor() {
      this.$router.push({
        path: '/dataMonitor'
      })
    },
    timePickerChange(date, timestamp, type) {
      this.$emit('change', 'timePicker', {
        date,
        timestamp,
        type
      })
    },
    getTime() {
      return this.$refs.timePicker.getTime()
    }
  }
}
</script>

<style>

</style>
