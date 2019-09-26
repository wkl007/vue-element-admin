import { Message } from 'element-ui'
import NProgress from 'nprogress'
import router, { constantRoutes, asyncRoutes, resetRouter } from '@/router'
import store from '@/store'
import { filterAsyncRoutes, getPageTitle } from '@/utils'

import 'nprogress/nprogress.css'

const WHITE_LIST = ['/user/login'] // 重定向白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)
  const { loginStatus, userInfo: { roles }, accessToken } = store.getters
  if (loginStatus) {
    if (to.path === '/user/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = roles && roles.length > 0
      if (hasRoles) {
        next()
        NProgress.done()
      } else {
        try {
          // 获取用户信息及角色信息
          const userInfo = {
            name: accessToken.includes('admin') ? 'admin' : 'normal',
            roles: accessToken.includes('admin') ? ['admin'] : ['normal'],
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          }

          await store.dispatch('setUserInfo', userInfo)

          const accessedRoutes = await generateRoutes(userInfo.roles) || []

          router.addRoutes(accessedRoutes)

          next({ ...to, replace: true })

          NProgress.done()
        } catch (err) {
          await store.dispatch('setLoginStatus', false)
          await store.dispatch('setAccessToken', '')
          await store.dispatch('setUserInfo', {})
          await store.dispatch('setPermission', {
            asyncRoutes: [],
            routes: []
          })

          resetRouter()
          Message.error(err || '系统错误')
          next(`/user/login?redirect=${to.path}`)

          NProgress.done()
        }
      }
    }
  } else {
    if (WHITE_LIST.indexOf(to.path) >= 0) {
      next()
    } else {
      let path = '/user/login'
      // if (to.path !== '/') { path = `${path}?redirect=${to.path}` }
      next(path)
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})

/**
 * 获取运行访问的路由
 * @param roles
 * @returns {Promise<unknown>}
 */
function generateRoutes (roles) {
  return new Promise(async (resolve, reject) => {
    try {
      let accessedRoutes = []
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      const permission = {
        asyncRoutes: accessedRoutes,
        routes: [...constantRoutes, ...accessedRoutes]
      }
      await store.dispatch('setPermission', permission)
      resolve(accessedRoutes)
    } catch (err) {
      reject(err)
    }
  })
}
