import { ACCESS_TOKEN, LOGIN_STATUS, removeSessionStorage, saveSessionStorage, SETTINGS } from '@/utils/cache'
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
 * 设置
 * @param commit
 * @param state
 * @param query
 */
export const setSettings = ({ commit, state }, query) => {
  commit(types.SET_SETTINGS, saveSessionStorage(SETTINGS, query))
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

export const addView = ({ dispatch }, query) => {
  dispatch('addVisitedView', query)
  dispatch('addCachedView', query)
}

/**
 * 添加访问页面
 * @param commit
 * @param state
 * @param query
 */
export const addVisitedView = ({ commit, state }, query) => {
  let { tagsView: { visitedViews, cachedViews } } = state
  if (visitedViews.some(v => v.path === query.path)) return
  let visitedViewItem = { ...query, title: query.meta.title || 'no-name', }
  // matched太多导致页面卡顿
  delete visitedViewItem.matched

  visitedViews.push(visitedViewItem)
  let tagsView = { cachedViews, visitedViews }
  commit(types.SET_TAGS_VIEW, tagsView)
}

/**
 * 添加缓存的页面
 * @param commit
 * @param state
 * @param query
 */
export const addCachedView = ({ commit, state }, query) => {
  let { tagsView: { visitedViews, cachedViews } } = state
  if (cachedViews.includes(query.name)) return
  if (!query.meta.noCache) {
    cachedViews.push(query.name)
    let tagsView = { cachedViews, visitedViews }
    commit(types.SET_TAGS_VIEW, tagsView)
  }
}

export const deleteView = ({ dispatch, state }, query) => {
  return new Promise(resolve => {
    dispatch('deleteVisitedView', query)
    dispatch('deleteCachedView', query)
    resolve({
      visitedViews: [...state.tagsView.visitedViews],
      cachedViews: [...state.tagsView.cachedViews],
    })
  })
}

/**
 * 删除访问页面
 * @param commit
 * @param state
 * @param query
 */
export const deleteVisitedView = ({ commit, state }, query) => {
  return new Promise(resolve => {
    let { tagsView: { visitedViews, cachedViews } } = state
    for (const [i, v] of visitedViews.entries()) {
      if (v.path === query.path) {
        visitedViews.splice(i, 1)
        break
      }
    }
    let tagsView = { cachedViews, visitedViews }
    commit(types.SET_TAGS_VIEW, tagsView)
    resolve([...state.tagsView.visitedViews])
  })
}

/**
 * 删除缓存页面
 * @param commit
 * @param state
 * @param query
 */
export const deleteCachedView = ({ commit, state }, query) => {
  return new Promise(resolve => {
    let { tagsView: { visitedViews, cachedViews } } = state
    for (const i of cachedViews) {
      if (i === query.name) {
        const index = cachedViews.indexOf(i)
        cachedViews.splice(index, 1)
        break
      }
    }
    let tagsView = { cachedViews, visitedViews }
    commit(types.SET_TAGS_VIEW, tagsView)
    resolve([...state.tagsView.cachedViews])
  })
}

export const deleteOtherViews = ({ dispatch, state }, query) => {
  return new Promise(resolve => {
    dispatch('deleteOtherVisitedViews', query)
    dispatch('deleteOtherCachedViews', query)
    resolve({
      visitedViews: [...state.tagsView.visitedViews],
      cachedViews: [...state.tagsView.cachedViews],
    })
  })
}

/**
 * 删除剩余访问页面
 * @param commit
 * @param state
 * @param query
 */
export const deleteOtherVisitedViews = ({ commit, state }, query) => {
  return new Promise(resolve => {
    let { tagsView: { visitedViews, cachedViews } } = state
    let data = visitedViews.filter(v => {
      return v.meta.affix || v.path === query.path
    })
    let tagsView = { cachedViews, visitedViews: data }
    commit(types.SET_TAGS_VIEW, tagsView)
    resolve([...state.tagsView.visitedViews])
  })
}

/**
 * 删除剩余缓存页面
 * @param commit
 * @param state
 * @param query
 */
export const deleteOtherCachedViews = ({ commit, state }, query) => {
  return new Promise(resolve => {
    let { tagsView: { visitedViews, cachedViews } } = state
    let data = []
    for (const i of cachedViews) {
      if (i === query.name) {
        const index = state.tagsView.cachedViews.indexOf(i)
        data = cachedViews.slice(index, index + 1)
        break
      }
    }
    let tagsView = { cachedViews: data, visitedViews }
    commit(types.SET_TAGS_VIEW, tagsView)
    resolve([...state.tagsView.cachedViews])
  })
}

export const deleteAllViews = ({ dispatch, state }, query) => {
  return new Promise(resolve => {
    dispatch('deleteAllVisitedViews', query)
    dispatch('deleteAllCachedViews', query)
    resolve({
      visitedViews: [...state.tagsView.visitedViews],
      cachedViews: [...state.tagsView.cachedViews],
    })
  })
}

/**
 * 删除所有访问页面
 * @param commit
 * @param state
 * @param query
 */
export const deleteAllVisitedViews = ({ commit, state }, query) => {
  return new Promise(resolve => {
    let { tagsView: { visitedViews, cachedViews } } = state
    visitedViews = visitedViews.filter(tag => tag.meta.affix)
    let tagsView = { cachedViews, visitedViews }
    commit(types.SET_TAGS_VIEW, tagsView)
    resolve([...state.tagsView.visitedViews])
  })
}

/**
 * 删除所有缓存页面
 * @param commit
 * @param state
 * @param query
 */
export const deleteAllCachedViews = ({ commit, state }, query) => {
  return new Promise(resolve => {
    let { tagsView: { visitedViews } } = state
    let tagsView = { cachedViews: [], visitedViews }
    commit(types.SET_TAGS_VIEW, tagsView)
    resolve([...state.tagsView.cachedViews])
  })
}

/**
 * 更新访问页面
 * @param commit
 * @param state
 * @param query
 */
export const updateVisitedView = ({ commit, state }, query) => {
  let { tagsView: { visitedViews, cachedViews } } = state
  for (let v of visitedViews) {
    if (v.path === query.path) {
      v = { ...v, ...query }
      break
    }
  }
  let tagsView = { cachedViews, visitedViews }
  commit(types.SET_TAGS_VIEW, tagsView)
}
