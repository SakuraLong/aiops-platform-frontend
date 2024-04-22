<template>
  <structure4>
    <!-- 这里使用了router-link实现页面的跳转 ， 并且为了样式修改使用了没有触发事件的el-button -->
    <template #card-l-1>
      <div class="DMT-card-l-1">
        <router-link
          v-for="route, i in leftRouteList"
          :key="i"
          class="link DMT-card-l-1__link"
          :class="{'DMT-card-l-1__link--selected': $route.meta.DMETLName === route.routeName}"
          :to="route.path"
          O-R
        >
          {{ route.name }}
        </router-link>
      </div>
    </template>

    <template #card-r-1>
      sss
    </template>
  </structure4>
</template>

<script>
import structure4 from '@/components/Structure/structure4.vue'
export default {
  components: {
    structure4
  },
  data() {
    return {
      leftRouteList: [
        {
          name: '拓扑',
          path: '/dataMonitor/topology',
          routeName: 'topology'
        },
        {
          name: '故障数据',
          path: '/dataMonitor/error',
          routeName: 'error'
        }
      ]
    }
  }
}
</script>
<style>
.DMT-card-l-1__link {
  position: relative;
  text-align: left;
  display: block;
  color: #374E5C;
  padding: 2px 5px;
  font-size: 14px;
  transition: .3s;
  z-index: 1;
}
.DMT-card-l-1__link::after {
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(-5px);
  width: calc(100% + 5px * 2);
  height: 100%;
  content: ' ';
  background: #e5f5ff00;
  z-index: -1;
  transition: .3s;
}
.DMT-card-l-1__link:hover,
.DMT-card-l-1__link--selected {
  transition: .3s;
  color: #00A0FF;
}
.DMT-card-l-1__link:hover::after,
.DMT-card-l-1__link--selected::after {
  transition: .3s;
  background: #E5F5FF;
}
</style>
