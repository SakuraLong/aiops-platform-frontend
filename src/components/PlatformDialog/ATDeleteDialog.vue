<template>
  <el-dialog
    v-model="dialogVisible"
    title="警告"
    width="500"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    align-center
  >
    <div class="AT-delete-dialog__main">
      <span style="font-weight: bold;">即将删除算法模板</span>
      <span>模板名称：{{ data.templateName }}</span>
      <span>创建者：{{ data.creator }}</span>
      <span>创建时间：{{ data.creationTime }}</span>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelFunc">取消</el-button>
        <el-button
          type="danger"
          @click="deleteFunc"
        >
          删除
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
    deleteFunc() {
      this.dialogVisible = false
      this.$emit('delete', this.data)
    }
  }
}
</script>

<style>
.AT-delete-dialog__main {
  display: flex;
  flex-direction: column;
}
</style>
