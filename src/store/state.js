import { loadSessionStorage, LOGIN_STATUS, ACCESS_TOKEN, USER_INFO } from '@/utils/cache'

const state = {
  loginStatus: loadSessionStorage(LOGIN_STATUS, false),
  accessToken: loadSessionStorage(ACCESS_TOKEN, ''),
  userInfo: loadSessionStorage(USER_INFO, {}),
}

export default state
