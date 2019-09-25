import { ACCESS_TOKEN, loadSessionStorage, LOGIN_STATUS } from '@/utils/cache'
import defaultSettings from '@/utils/settings'

const state = {
  loginStatus: loadSessionStorage(LOGIN_STATUS, false),
  accessToken: loadSessionStorage(ACCESS_TOKEN, ''),
  userInfo: {},
  permission: {
    asyncRoutes: [],
    routes: []
  },
  settings: defaultSettings
}

export default state
