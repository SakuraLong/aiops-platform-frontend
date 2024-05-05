<template>
  <el-dialog
    v-model="dialogVisible"
    title="新增算法模板"
    width="600"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    align-center
  >
    <div class="AT-new-dialog__main">
      <div class="AT-new-dialog__main__item">
        <div f><span>模板名称：</span></div>
        <div l>
          <el-input
            v-model="newTemplateData.name"
            placeholder="Please input"
          />
        </div>
      </div>
      <div class="AT-new-dialog__main__item">
        <div f><span>算法类型：</span></div>
        <div l>
          <el-select
            v-model="newTemplateData.type"
            placeholder="Select"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="AT-new-dialog__main__item">
        <div f><span>算法：</span></div>
        <div l>
          <el-select
            v-model="newTemplateData.algorithm"
            placeholder="Select"
          >
            <el-option
              v-for="item in algorithmOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="AT-new-dialog__main__item">
        <div f><span>评估指标：</span></div>
        <div l>
          <el-select
            v-model="newTemplateData.evaluation"
            placeholder="Select"
          >
            <el-option
              v-for="item in evaluationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelFunc">取消</el-button>
        <el-button
          type="primary"
          @click="confirmFunc"
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
      newTemplateData: {
        name: '',
        type: '',
        algorithm: '',
        evaluation: ''
      },
      typeOptions: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        }
      ],
      algorithmOptions: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        }
      ],
      evaluationOptions: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        }
      ]
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('changeVisible', val)
      }
    }
  },
  methods: {
    cancelFunc() {
      this.dialogVisible = false
      this.$emit('cancel')
    },
    confirmFunc() {
      if (!this.check()) return
      this.dialogVisible = false
      this.$emit('confirm', this.newTemplateData)
    },
    check() {
      if (this.newTemplateData.name === '') return false
      if (this.newTemplateData.type === '') return false
      if (this.newTemplateData.algorithm === '') return false
      if (this.newTemplateData.evaluation === '') return false
      return true
    }
  }
}
</script>

<style>
.AT-new-dialog__main {
  display: flex;
  flex-direction: column;
}
.AT-new-dialog__main__item {
  display: flex;
  margin: 5px 0;
}
.AT-new-dialog__main__item > div[f] {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.AT-new-dialog__main__item > div[l] {
  width: calc(100% - 100px);
  text-align: left;
}
</style>
