import * as types from './mutationTypes'

const mutations = {
  [types.SET_LOGIN_STATUS] (state, loginStatus) {
    state.loginStatus = loginStatus
  },
  [types.SET_ACCESS_TOKEN] (state, accessToken) {
    state.accessToken = accessToken
  },
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_PERMISSION] (state, permission) {
    state.permission = permission
  },
  [types.SET_SETTINGS] (state, settings) {
    state.settings = settings
  },
  [types.SET_TAGS_VIEW] (state, tagsView) {
    state.tagsView = tagsView
  }
}

export default mutations
