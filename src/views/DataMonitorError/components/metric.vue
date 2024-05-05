<template>
  <div class="DME-metric">
    <div class="DME-metric__left">
      <header>
        <div class="DME-metric-l__header-select">
          <span>PodName:</span>
          <el-select
            v-model="selectedPodName"
            placeholder="Select"
            style="width: 120px"
            size="small"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-button
            size="small"
            title="对检索的时间区间包含的日志导出"
            @click="logDataExport"
          >
            <span O-R>导出</span>
            <template #icon>
              <Download />
            </template>
          </el-button>
        </div>
      </header>
      <CardTitle style="margin: 0;">
        指标列表
      </CardTitle>
      <main>
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox-group
          v-model="checkedCities"
          class="DME-metric__checkbox-group"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="city in cities"
            :key="city"
            :label="city"
            :value="city"
          >
            {{ city }}
          </el-checkbox>
        </el-checkbox-group>
      </main>
    </div>
    <div class="DME-metric__right">
      <MetricCard />
      <MetricCard />
      <MetricCard />
      <MetricCard />
      <MetricCard />
    </div>
  </div>
</template>

<script>
import CardTitle from '@/components/CardTitle'
import MetricCard from '@/components/MetricCard'
export default {
  components: {
    CardTitle,
    MetricCard
  },
  data() {
    return {
      selectedPodName: '全部',
      options: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: 'Option2',
          label: 'Option2'
        }
      ],
      checkAll: false,
      isIndeterminate: false,
      checkedCities: [],
      cities: new Array(20).fill(0).map((item, i) => i !== 15 ? i.toString() : 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  }
}
</script>

<style>
.DME-metric {
  position: relative;
  display: flex;
  height: 100%;
}
.DME-metric__left {
  position: relative;
  box-sizing: border-box;
  width: 300px;
  border-right: 1px solid #E9EBF2;
}
.DME-metric__right {
  position: relative;
  width: calc(100% - 300px);
}
.DME-metric__left > header {
  display: flex;
  box-sizing: border-box;
  height: 45px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E9EBF2;
}
.DME-metric__left > header > div {
  height: auto;
  display: flex;
  align-items: center;
  padding: 0px 5px;
}
.DME-metric-l__header-select > span {
  font-size: 12px;
  line-height: 20px;
  margin-right: 5px;
}
.DME-metric__left > main {
  height: calc(100% - 45px - 24px);
  overflow: auto;
}
.DME-metric__checkbox-group {
  display: flex;
  flex-direction: column;
}
.DME-metric__checkbox-group label {
  max-width: 100%;
  overflow: hidden;
  margin-right: 5px;
  border-radius: 4px;
}
.DME-metric__checkbox-group > .is-checked {
  background-color: #E5F5FF;
}
.DME-metric__checkbox-group label:hover {
  overflow: auto;
}
.DME-metric__right {
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
  overflow: auto;
}
</style>
