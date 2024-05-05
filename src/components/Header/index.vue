<template>
  <div class="header">
    <div class="header-left">
      <img
        class="header-logo"
        src="../../assets/images/主页/logo.png"
        alt=""
        draggable="false"
      >
    </div>
    <div class="header-center">
      <component
        :is="route.a ? 'a' : 'router-link'"
        v-for="route, i in routeList"
        :key="i"
        class="link blue-button"
        :class="{'blue-button--selected': $route.meta.header !== undefined && $route.meta.header === route.routeName}"
        :to="route.path"
        :href="route.path"
        :target="route.target ? route.target : ''"
      >{{ route.name }}</component>
    </div>
    <div class="header-right">
      <router-link to="/client/login">登出</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeList: [
        {
          name: '主页',
          routeName: 'home',
          path: '/'
        },
        {
          name: '故障注入',
          path: 'http://10.10.1.202:2333',
          target: '_blank',
          a: true
        },
        {
          name: '数据监控',
          routeName: 'dataMonitor',
          path: '/dataMonitor'
        },
        // {
        //   name: '算法管理',
        //   routeName: 'algorithmManagement',
        //   path: '/algorithmManagement'
        // },
        {
          name: '算法模板',
          routeName: 'algorithmTemplate',
          path: '/algorithmTemplate'
        },
        {
          name: '评估数据',
          routeName: 'evaluateData',
          path: '/evaluateData'
        },
        {
          name: '用户管理',
          routeName: 'userManagement',
          path: '/userManagement'
        }
      ]
    }
  }
}
</script>

<style>
.header {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: white;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
  background-image: url('../../assets/images/主页/编组 32@2x.png');
  background-position: left center;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: space-between;
}
.header > div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-left,
.header-right {
  width: 20%;
  /* background-color: aqua; */
}
.header-center {
  width: 60%;
}
.header-center a {
  text-align: center;
}
.header-logo {
  width: 100%;
  max-width: 200px;
}
</style>
