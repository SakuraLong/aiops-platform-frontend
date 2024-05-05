<template>
  <structure3>
    <template #card-r-1>
      <el-tabs v-model="activeName" type="border-card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane name="userManagement">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><calendar /></el-icon>
              <span>用户管理</span>
            </span>
          </template>
        </el-tab-pane>
        <el-tab-pane name="roleManagement">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><calendar /></el-icon>
              <span>角色管理</span>
            </span>
          </template>
        </el-tab-pane>
        <router-view />
      </el-tabs>
    </template>
  </structure3>
</template>

<script>
import structure3 from '@/components/Structure/structure3.vue'
export default {
  components: {
    structure3
  },
  data() {
    return {
      activeName: 'userManagement'
    }
  },
  mounted() {
    this.$router.push({
      name: this.activeName
    })
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.props.name
      this.$router.push({
        name: tab.props.name
      })
    }
  }
}
</script>

<style></style>
