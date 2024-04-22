import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '@/views/Home'

import DataMonitorError from '@/views/DataMonitorError'
import fault from '@/views/DataMonitorError/components/fault.vue'
import log from '@/views/DataMonitorError/components/log.vue'
import metric from '@/views/DataMonitorError/components/metric.vue'
import trace from '@/views/DataMonitorError/components/trace.vue'

import DataMonitorTopology from '@/views/DataMonitorTopology'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      header: 'home'
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    name: 'DataMonitorTopology',
    path: '/dataMonitor/topology',
    component: DataMonitorTopology,
    meta: {
      header: 'dataMonitor',
      DMETLName: 'topology'
    }
  },
  {
    name: 'DataMonitorError',
    path: '/dataMonitor/error',
    redirect: '/dataMonitor/error/fault',
    component: DataMonitorError,
    children: [
      {
        path: 'fault',
        name: 'fault',
        component: fault,
        meta: {
          header: 'dataMonitor',
          DMEName: 'fault',
          DMETLName: 'error'
        }
      },
      {
        path: 'log',
        name: 'log',
        component: log,
        meta: {
          header: 'dataMonitor',
          DMEName: 'log',
          DMETLName: 'error'
        }
      },
      {
        path: 'metric',
        name: 'metric',
        component: metric,
        meta: {
          header: 'dataMonitor',
          DMEName: 'metric',
          DMETLName: 'error'
        }
      },
      {
        path: 'trace',
        name: 'trace',
        component: trace,
        meta: {
          header: 'dataMonitor',
          DMEName: 'trace',
          DMETLName: 'error'
        }
      }
    ],
    meta: {
      header: 'dataMonitor'
    }
  },
  {
    name: 'DataMonitor',
    path: '/dataMonitor',
    redirect: '/dataMonitor/error/fault',
    meta: {
      breadcrumb: null
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
