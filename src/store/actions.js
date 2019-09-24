import { ACCESS_TOKEN, LOGIN_STATUS, removeSessionStorage, saveSessionStorage } from '@/utils/cache'
import * as types from './mutationTypes'

/**
 * 设置登录状态
 * @param commit
 * @param state
 * @param query
 */
export const setLoginStatus = ({ commit, state }, query) => {
  if ((!query) && process.env.NODE_ENV === 'production') {
    removeSessionStorage(ACCESS_TOKEN)
  }
  commit(types.SET_LOGIN_STATUS, saveSessionStorage(LOGIN_STATUS, query))
}

/**
 * 设置token
 * @param commit
 * @param state
 * @param query
 */
export const setAccessToken = ({ commit, state }, query) => {
  commit(types.SET_ACCESS_TOKEN, saveSessionStorage(ACCESS_TOKEN, query))
}

/**
 * 设置用户信息
 * @param commit
 * @param state
 * @param query
 */
export const setUserInfo = ({ commit, state }, query) => {
  commit(types.SET_USER_INFO, query)
}

/**
 * 设置权限路由
 * @param commit
 * @param state
 * @param query
 */
export const setPermission = ({ commit, state }, query) => {
  commit(types.SET_PERMISSION, query)
}
