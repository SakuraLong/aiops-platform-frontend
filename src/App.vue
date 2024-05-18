<template>
  <div class="main">
    <PageHeader />
    <div class="page">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {
    PageHeader: Header
  },
  mounted() {
  }
}
</script>

<style>
.main {
  position: relative;
  width: 100%;
  height: 100%;
}
.page {
  position: relative;
  height: calc(100% - 50px);
}
</style>
