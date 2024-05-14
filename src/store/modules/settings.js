import Cookies from 'js-cookie'

export const defaultSettings = {
  showSettings: true, // 例如：显示设置菜单
  fixedHeader: true,   // 例如：固定头部
  sidebarLogo: true    // 例如：显示侧边栏logo
}
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings
const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
