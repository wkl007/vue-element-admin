import { Message } from 'element-ui'
import NProgress from 'nprogress'
import router, { constantRoutes, asyncRoutes } from '@/router'
import store from '@/store'
import { filterAsyncRoutes, getPageTitle } from '@/utils'

import 'nprogress/nprogress.css'

const WHITE_LIST = ['/user/login'] // 重定向白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)
  const { loginStatus, userInfo: { roles } } = store.getters
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
        // 获取用户信息及角色信息
        const userInfo = {
          name: 'admin',
          roles: ['admin'],
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        }
        await store.dispatch('setUserInfo', userInfo)

        const accessedRoutes = await generateRoutes(userInfo.roles) || []

        router.addRoutes(accessedRoutes)

        next({ ...to, replace: true })
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
  })
}
