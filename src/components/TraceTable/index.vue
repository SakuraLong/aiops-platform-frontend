<template>
  <div class="trace-table">
    <el-table
      :data="renderData"
      style="width: 100%"
      height="100%"
    >
      <el-table-column
        label="Method"
        min-width="400"
      >
        <template #default="scope">
          <el-text truncated>
            {{ scope.row.operation_name }}
          </el-text>
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        width="200"
      />
      <el-table-column
        prop="duration"
        label="持续时间(ms)"
        width="100"
      />
      <el-table-column
        prop="cmdb_id"
        label="Service"
        min-width="180"
      />
    </el-table>
  </div>
</template>

<script>
import { deepClone } from '@/utils/utils'
export default {
  props: {
    data: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      renderData: []
    }
  },
  watch: {
    data() {
      this.initData()
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.renderData = this.data.map((item) => {
        const t = deepClone(item)
        t.startTime = new Date(t.timestamp).toLocaleString()
        t.duration /= 1000
        return t
      })
    }
  }
}
</script>

<style>
.trace-table {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
