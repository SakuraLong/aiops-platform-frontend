<template>
  <div class="data-export-table">
    <el-table :data="showData" style="width: 100%" height="100%">
      <el-table-column prop="dateStr" label="日期" width="250" />
      <el-table-column prop="type" label="类型" width="140" />
      <el-table-column prop="statusStr" label="状态" width="180" />
      <el-table-column label="进度">
        <template #default="scope">
          <el-progress
            :percentage="100"
            :status="scope.row.progressStatus"
            :indeterminate="scope.row.progressIndeterminates"
            :format="(p) => ''"
            :duration="1"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-button
              v-if="scope.row.status === 1 || scope.row.status === 2"
              link
              O-B
              type="primary"
              @click="download(scope.row)"
            >
              下载
            </el-button>
            <el-button
              link
              O-B
              type="danger"
              @click="deleteItem(scope.row)"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ExportManager from './exportManager'
export default {
  data() {
    return {
      type: 'all',
      tableData: [],
      exportManager: null
    }
  },
  computed: {
    showData() {
      return this.tableData.filter((item) => this.type === 'all' ? true : item.type === this.type)
    }
  },
  watch: {
    '$route.params.type'() {
      this.type = this.$route.params.type || 'all'
    }
  },
  mounted() {
    if (!window.exportManager) window.exportManager = new ExportManager()
    this.exportManager = window.exportManager
    this.exportManager.addEventListener('update', this.update.bind(this))
    this.exportManager.update()
    this.type = this.$route.params.type || 'all'
  },
  beforeUnmount() {
    this.exportManager.removeEventListener('update', this.update.bind(this))
  },
  methods: {
    update(data) {
      this.tableData = data.exportList
    },
    download(data) {
      this.exportManager.download(data.id)
    },
    deleteItem(data) {
      this.exportManager.delete(data.id)
    }
  }
}
</script>

<style>
.data-export-table {
  position: relative;
  height: 100%;
}
</style>
