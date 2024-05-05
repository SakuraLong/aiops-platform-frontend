<template>
  <el-card
    style="width: 480px; margin: 10px;"
    shadow="hover"
  >
    <template #header>
      <div class="MC__header">
        <h3 style="margin-block: 0em; text-align: left">{{ name }}</h3>
        <div>
          <el-button
            circle
            title="同步"
            @click="syncTime"
          >
            <template #icon>
              <UploadFilled />
            </template>
          </el-button>
          <el-button
            type="danger"
            circle
            title="删除"
          >
            <template #icon>
              <DeleteFilled />
            </template>
          </el-button>
        </div>
      </div>
    </template>
    <div class="MC__container">
      <div class="MC__controller">
        <el-button-group size="small">
          <el-button
            type="primary"
            :icon="ArrowLeft"
            :disabled="timeListIndex === 0"
            @click="changeTLI(-1)"
          >
            <template #icon>
              <Minus />
            </template>
          </el-button>
          <el-button
            disabled
            style="width: 40px;"
          >
            {{ timeList[timeListIndex][0] }}
          </el-button>
          <el-button
            type="primary"
            :icon="ArrowLeft"
            :disabled="timeListIndex === timeList.length - 1"
            @click="changeTLI(1)"
          >
            <template #icon>
              <Plus />
            </template>
          </el-button>
        </el-button-group>
        <el-date-picker
          v-model="datetime"
          size="small"
          type="datetime"
          placeholder="Select date and time"
          :disabled-date="judge"
        />
      </div>
      <main>
        <div
          ref="chart"
          class="line-chart"
        />
      </main>
    </div>
  </el-card>
</template>

<script>// UploadFilled DeleteFilled
import * as echarts from 'echarts'
export default {
  props: {
    name: {
      type: String,
      default: 'ascascascascascascascasc'
    },
    pod: {
      type: String,
      default: 'ascascvvvv'
    }
  },
  data() {
    return {
      chart: null,
      datetime: Date.now(),
      timeList: [
        ['1s', 1000 * 1],
        ['10s', 1000 * 10],
        ['1m', 1000 * 60],
        ['5m', 1000 * 60 * 5],
        ['15m', 1000 * 60 * 15],
        ['30m', 1000 * 60 * 30],
        ['1h', 1000 * 60 * 60],
        ['2h', 1000 * 60 * 60 * 2],
        ['6h', 1000 * 60 * 60 * 6],
        ['12h', 1000 * 60 * 60 * 12],
        ['1d', 1000 * 60 * 60 * 24],
        ['2d', 1000 * 60 * 60 * 24 * 2]
      ],
      timeListIndex: 4,
      chartPod: this.pod,
      timer: null, // 节流计时器
      control: false,
      picherOptions: {
        disabledDate(date) {
          // disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return (
            date.getTime() > Date.now()
          )
        }
      }
    }
  },
  methods: {
    judge(date) {
      return date.getTime() >= Date.now()
    },
    changeTLI(step) {
      this.timeListIndex += step
    },
    syncTime() {
      // 同步时间
    },
    receiveTime(time) {
      // 接收时间
    }
  }
}
</script>

<style>
.MC__header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.MC__header > div {
  width: 100px;
  display: flex;
  justify-content: flex-end;
}
.MC__header > h3 {
  width: calc(100% - 100px);
  max-width: 100%;
  overflow: hidden;
}
.MC__header > h3:hover {
  overflow: auto;
}
.MC__header-close {
  cursor: pointer;
  position: absolute;
  font-size: 22px;
  top: -15px;
  right: -15px;
}
.MC__controller {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.line-chart {
  width: 100%;
  height: 400px;
}
</style>
