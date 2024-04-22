<template>
  <structure2>
    <template #card-l-1>
      <div class="DME-card-l-1">
        <router-link
          v-for="route, i in leftRouteList"
          :key="i"
          class="link DME-card-l-1__link"
          :class="{'DME-card-l-1__link--selected': $route.meta.DMETLName === route.routeName}"
          :to="route.path"
          O-R
        >
          {{ route.name }}
        </router-link>
      </div>
    </template>
    <template #card-r-1>
      <div class="DME-card-r-1">
        <div>
          <router-link
            v-for="route, i in routeList"
            :key="i"
            class="link DME-card-r-1__link"
            :class="{'DME-card-r-1__link--selected': $route.meta.DMEName === route.routeName}"
            :to="route.path"
            O-B
          >
            <span>{{ route.name }}</span>
          </router-link>
        </div>
        <div>asc</div>
      </div>
    </template>
    <template #card-r-2>
      <router-view />
    </template>
  </structure2>
</template>

<script>
import structure2 from '@/components/Structure/structure2.vue'
export default {
  components: {
    structure2
  },
  data() {
    return {
      routeList: [
        {
          name: '故障',
          path: '/dataMonitor/error/fault',
          routeName: 'fault'
        },
        {
          name: '日志',
          path: '/dataMonitor/error/log',
          routeName: 'log'
        },
        {
          name: '指标',
          path: '/dataMonitor/error/metric',
          routeName: 'metric'
        },
        {
          name: '调用链',
          path: '/dataMonitor/error/trace',
          routeName: 'trace'
        }
      ],
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
  },
  mounted() {
    console.log(this.$route.meta.DMELName)
  }
}
</script>

<style>
.DME-card-l-1__link {
  position: relative;
  text-align: left;
  display: block;
  color: #374E5C;
  padding: 2px 5px;
  font-size: 14px;
  transition: .3s;
  z-index: 1;
}
.DME-card-l-1__link::after {
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
/* .DME-card-l-1__link:hover, */
.DME-card-l-1__link--selected {
  transition: .3s;
  color: #00A0FF;
}
.DME-card-l-1__link:hover::after,
.DME-card-l-1__link--selected::after {
  transition: .3s;
  background: #E5F5FF;
}

.DME-card-r-1 {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.DME-card-r-1 > div {
  display: flex;
}
.DME-card-r-1__link {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 10px;
  padding: 0 10px;
  color: #A5B7C1;
  transition: .3s;
}
.DME-card-r-1__link::after {
  position: absolute;
  width: calc(100% - 10px * 2);
  height: 2px;
  content: ' ';
  background-color: #00a2ff00;
  bottom: 0;
  transform: translateY(5px);
  border-radius: 4px;
  transition: .3s;
}
.DME-card-r-1__link:hover,
.DME-card-r-1__link--selected {
  color: black;
  transition: .3s;
}
/* .DME-card-r-1__link:hover::after, */
.DME-card-r-1__link--selected::after {
  transition: .3s;
  background-color: #00A0FF;
}
</style>
