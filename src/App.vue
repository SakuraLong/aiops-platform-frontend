<template>
  <div class="main">
    <PageHeader />
    <div class="page">
      <router-view />
    </div>
  </div>
</template>

<script>
import { test } from '@/api/test'
import Header from '@/components/Header'
export default {
  components: {
    PageHeader: Header
  },
  mounted() {
    // 用来测试和服务器是否连上
    // test({
    //   data: 'ascasc'
    // }).then((res) => {
    //   console.log(res)
    // }).catch((err) => {
    //   console.log(err)
    // })
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
