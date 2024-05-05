import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '@/views/Home'

import DataMonitorError from '@/views/DataMonitorError'
import fault from '@/views/DataMonitorError/components/fault.vue'
import log from '@/views/DataMonitorError/components/log.vue'
import metric from '@/views/DataMonitorError/components/metric.vue'
import trace from '@/views/DataMonitorError/components/trace.vue'

import DataMonitorTopology from '@/views/DataMonitorTopology'
import AlgorithmManagement from '@/views/AlgorithmManagement'
import AlgorithmTemplate from '@/views/AlgorithmTemplate'
import EvaluateData from '@/views/EvaluateData'

import SystemManagement from '@/views/SystemManagement'
import UserManagement from '@/views/SystemManagement/UserManagement'
import RoleManagement from '@/views/SystemManagement/RoleManagement'

import AlgorithmDetail from '@/views/AlgorithmDetail'

import Client from '@/views/Client'
import login from '@/views/Client/login.vue'
import reg from '@/views/Client/reg.vue'

const routes = [
  {
    path: '/client',
    name: 'client',
    component: Client,
    children: [
      {
        path: 'login',
        name: 'login',
        component: login
      },
      {
        path: 'reg',
        name: 'reg',
        component: reg
      }
    ]
  },
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
    redirect: '/dataMonitor/error/fault'
  },
  {
    name: 'AlgorithmManagement',
    path: '/algorithmManagement',
    component: AlgorithmManagement,
    meta: {
      header: 'algorithmManagement'
    }
  },
  {
    name: 'AlgorithmTemplate',
    path: '/algorithmTemplate',
    component: AlgorithmTemplate,
    meta: {
      header: 'algorithmTemplate'
    }
  },
  {
    name: 'EvaluateData',
    path: '/evaluateData',
    component: EvaluateData,
    meta: {
      header: 'evaluateData'
    }
  },
  {
    name: 'SystemManagement',
    path:'/systemManagement',
    component: SystemManagement,
    children: [
      {
        path: 'userManagement',
        name: 'userManagement',
        component: UserManagement,
        meta: {
          header: 'SystemManagement',
          DMEName: 'userManagement',
          DMETLName: 'error'
        }
      },
      {
        path: 'roleManagement',
        name: 'roleManagement',
        component: RoleManagement,
        meta: {
          header: 'SystemManagement',
          DMEName: 'roleManagement',
          DMETLName: 'error'
        }
      }
    ],
    meta: {
      header: 'systemManagement'
    }
  },
  {
    name: 'AlgorithmDetail',
    path:'/algorithmDetail',
    component: AlgorithmDetail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
