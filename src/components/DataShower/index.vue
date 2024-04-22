<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="item, i in data"
        :key="i"
        :title="item.date + ' ' + item.data.length + '条记录'"
        :name="i"
      >
        <card
          v-for="c, j in item.data"
          :key="j"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import card from './card.vue'
export default {
  components: {
    card
  },
  data() {
    return {
      activeNames: [],
      data: [
        {
          date: '03-12',
          data: [1, 2, 3, 4]
        },
        {
          date: '03-12',
          data: [1, 2, 3, 4]
        },
        {
          date: '03-12',
          data: [1, 2, 3, 4]
        },
        {
          date: '03-12',
          data: [1, 2, 3, 4]
        }
      ]
    }
  }
}
</script>

<style>
</style>
