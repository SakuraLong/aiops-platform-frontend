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
          :data="c"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import card from './card.vue'
import { getGroundTruth } from '@/api/faultList'
import { message } from '@/utils/utils'
export default {
  components: {
    card
  },
  data() {
    return {
      activeNames: [],
      data: []
    }
  },
  mounted() {
    const now = Date.now()
    const week = 1000 * 60 * 60 * 24 * 7
    getGroundTruth({
      start_time: parseInt((now - week) / 1000),
      end_time: parseInt(now / 1000)
    }).then((res) => {
      // console.log(res)
      const list = []
      const faultList = res.ground_truth
      faultList.sort((a, b) => b.timestamp - a.timestamp)
      faultList.forEach((fault) => {
        const timestamp = fault.timestamp * 1000
        const time = new Date(timestamp)
        const str = (time.getMonth() + 1).toString().padStart(2, '0') + '-' + time.getDate().toString().padStart(2, '0')
        if (list.length > 0) {
          if (list.at(-1).date === str) {
            list.at(-1).data.push(fault)
            return
          }
        }
        list.push({
          date: str,
          data: [fault]
        })
        this.data = list
      })
    }).catch((err) => {
      message(err.message)
    })
  }
}
</script>

<style>
</style>
