import { Message } from 'element-ui'
import NProgress from 'nprogress'
import router from '@/router'
import store from '@/store'
import { getPageTitle } from '@/utils'

import 'nprogress/nprogress.css'

const WHITE_LIST = ['/user/login'] // 重定向白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)
  const { loginStatus } = store.getters
  if (loginStatus) {
    if (to.path === '/user/login') {
      next({ path: '/' })
      NProgress.done()
    } else {}
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
