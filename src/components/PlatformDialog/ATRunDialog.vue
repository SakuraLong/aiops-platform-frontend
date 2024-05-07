<template>
  <el-dialog
    v-model="dialogVisible"
    title="执行"
    width="600"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    align-center
  >
    <div class="AT-run-dialog__main">
      <span style="font-weight: bold;">配置执行情况</span>
      <div class="AT-run-dialog__main__item">
        <div f><span>任务名称：</span></div>
        <div l>
          <el-input
            v-model="runTemplateData.name"
            placeholder="Please input"
          />
        </div>
      </div>
      <div class="AT-run-dialog__main__item">
        <div f><span>数据时间选择：</span></div>
        <div l>
          <el-date-picker
            v-model="runTemplateData.dataUseDuration"
            :teleported="false"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :disabled-date="judge"
          />
        </div>
      </div>
      <!-- <div class="AT-run-dialog__main__item">
        <div f><span>执行模式：</span></div>
        <div l>
          <el-radio-group v-model="runTemplateData.mode">
            <el-radio value="now">立即</el-radio>
            <el-radio value="timing">定时</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="AT-run-dialog__main__item">
        <div f><span>定时时间：</span></div>
        <div l>
          <el-date-picker
            v-model="runTemplateData.timing"
            type="datetime"
            placeholder="Select date and time"
            :disabled="runTemplateData.mode !== 'timing'"
          />
        </div>
      </div> -->
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelFunc">取消</el-button>
        <el-button
          type="primary"
          @click="runFunc"
        >
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    data: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      runTemplateData: {
        name: '',
        dataUseDuration: null,
        mode: 'now',
        timing: null,
        data: {}
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
        this.$emit('changeVisible', val)
      }
    }
  },
  watch: {
    data() {
      this.runTemplateData.dataUseDuration = null
      this.runTemplateData.name = ''
      this.runTemplateData.data = this.data
    }
  },
  mounted() {
    this.runTemplateData.data = this.data
  },
  methods: {
    judge(date) {
      return date.getTime() >= Date.now()
    },
    cancelFunc() {
      this.dialogVisible = false
      this.$emit('cancel')
    },
    runFunc() {
      if (!this.check()) return
      this.dialogVisible = false
      this.$emit('run', this.runTemplateData)
    },
    check() {
      if (this.runTemplateData.name === '') return false
      if (this.runTemplateData.dataUseDuration === '' || this.runTemplateData.dataUseDuration === null) return false
      if (this.runTemplateData.mode === 'timing' && this.runTemplateData.timing === null) return false
      return true
    }
  }
}
</script>

<style>
.AT-run-dialog__main {
  display: flex;
  flex-direction: column;
}
.AT-run-dialog__main__item {
  display: flex;
  margin: 5px 0;
}
.AT-run-dialog__main__item > div[f] {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.AT-run-dialog__main__item > div[l] {
  width: calc(100% - 100px);
  text-align: left;
}
</style>
