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
import { getGroundTruth } from '@/api/fault-list'
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
  },
  mounted() {
    const now = Date.now()
    const week = 1000 * 60 * 60 * 24 * 7
    getGroundTruth({
      start_time: now,
      end_time: now - week
    }).then((res) => {
      const list = []
      const faultList = res.ground_truth
      faultList.forEach((fault) => {
        const timestamp = fault.timestamp * 1000
        const time = new Date(timestamp)
        const str = (time.getMonth() + 1).toString().padStart(2, '0') +  time.getDate().toString().padStart(2, '0')
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
        this.data = faultList
      })
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style>
</style>
