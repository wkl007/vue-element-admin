import { ACCESS_TOKEN, loadSessionStorage, LOGIN_STATUS, SETTINGS } from '@/utils/cache'
import defaultSettings from '@/utils/settings'
import variables from '@/assets/styles/element-variables.scss'

const state = {
  loginStatus: loadSessionStorage(LOGIN_STATUS, false),
  accessToken: loadSessionStorage(ACCESS_TOKEN, ''),
  settings: loadSessionStorage(
    SETTINGS,
    { ...defaultSettings, theme: variables.theme }
  ),
  userInfo: {},
  permission: {
    asyncRoutes: [],
    routes: []
  },
  tagsView: {
    cachedViews: [],
    visitedViews: [],
  }
}

export default state
