import { ACCESS_TOKEN, loadSessionStorage, LOGIN_STATUS } from '@/utils/cache'

const state = {
  loginStatus: loadSessionStorage(LOGIN_STATUS, false),
  accessToken: loadSessionStorage(ACCESS_TOKEN, ''),
  userInfo: {},
  permission: {
    asyncRoutes: [],
    routes: []
  }
}

export default state
