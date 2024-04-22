<!-- 主页-->
<template>
  <structure1>
    <template #card-l-1>
      <CardTitle>查看日期</CardTitle>
      <LittleCalendar />
    </template>
    <template #card-l-2>
      <CardTitle>最近历史记录</CardTitle>
      <DataShower />
    </template>
    <template #card-r-1>
      <Calendar />
    </template>
  </structure1>
</template>

<script>
import structure1 from '@/components/Structure/structure1.vue'
import Calendar from '@/components/Calendar/index.vue'
import LittleCalendar from '@/components/LittleCalendar/index.vue'
import DataShower from '@/components/DataShower/index.vue'
import CardTitle from '@/components/CardTitle'
export default {
  name: 'HomePage',
  components: {
    structure1,
    Calendar,
    LittleCalendar,
    DataShower,
    CardTitle
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }

}
</script>

<style scoped>
</style>
