import { createRouter, createWebHistory } from 'vue-router'
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

import DataExport from '@/views/DataExport'
import SystemManagement from '@/views/SystemManagement'
import UserManagement from '@/views/SystemManagement/UserManagement'
import RoleManagement from '@/views/SystemManagement/RoleManagement'

import AlgorithmDetail from '@/views/AlgorithmDetail'

import Client from '@/views/Client'
import login from '@/views/Client/login.vue'
import reg from '@/views/Client/reg.vue'

import GraphShower from '@/views/GraphShower'
import graphTrace from '@/views/GraphShower/graphs/graphTrace.vue'
import graphCalendar from '@/views/GraphShower/graphs/graphCalendar.vue'

const routes = [
  {
    path: '/client',
    name: 'Client',
    redirect: '/client/login',
    component: Client,
    children: [
      {
        path: 'login',
        name: 'ClientLogin',
        component: login
      },
      {
        path: 'reg',
        name: 'ClientReg',
        component: reg
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      header: 'home'
    }
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
    name: 'DataExport',
    path: '/dataExport',
    component: DataExport,
    meta: {
      header: 'dataExport'
    }
  },
  {
    name: 'DataDetailExport',
    path: '/dataExport/:type',
    component: DataExport,
    meta: {
      header: 'dataExport'
    }
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
          header: 'systemManagement'
        }
      },
      {
        path: 'roleManagement',
        name: 'roleManagement',
        component: RoleManagement,
        meta: {
          header: 'systemManagement'
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
  },
  {
    name: 'GraphShower',
    path: '/graphShower',
    component: GraphShower,
    redirect: '/graphShower/graphTrace',
    children: [
      {
        path: 'graphTrace',
        component: graphTrace
      },
      {
        path: 'graphCalendar',
        component: graphCalendar
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
