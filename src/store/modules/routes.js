/**
 * @FileDescription
 * a store about creating dynamic routes given a specific role
 * @Author
 * Zedong Jia
 * @Date
 * 2023/9/14
 * @LastEditors
 * Zedong Jia
 * @LastEditTime
 * 2023/9/14
 */

import { getAuthorityDict } from '@/api/user'
import { asyncRoutes } from '@/router'
import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'
const state = {
  hasLoadRoute: false,
  asyncRoutes: []
}

const actions = {
  /**
   * @description
   * return dynamic routes
   * @returns {[{routes}]} dynamic routes
   */
  async createRoutes() {
    // getAuthorityDict
    await getAuthorityDict()
      .then((data) => {
        // return
        const authorityDict = data
        const routes = asyncRoutes.filter((item) => !item.name || authorityDict[item.name])
        state.asyncRoutes = routes
        state.hasLoadRoute = true
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default {
  namespaced: true,
  state,
  actions
}
