import Vue from 'vue'
import Router from 'vue-router'

const UserLayout = () => import(/* webpackChunkName: "userLayout" */'@/layouts/UserLayout')
const BasicLayout = () => import(/* webpackChunkName: "basicLayout" */'@/layouts/BasicLayout')

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1(默认 false)
 * alwaysShow: true               你可以设置 alwaysShow: true，这样它就会一直显示根路由
 *                                当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 * redirect: 'noRedirect'         当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','normal']    设置该路由进入的权限，支持多个权限叠加
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    activeMenu: '/example/list'  如果设置，则侧导航高亮
  }
 */

export const constantRoutes = [
  {
    path: '/user',
    component: UserLayout,
    hidden: true,
    children: [
      {
        path: 'login',
        component: () => import(/* webpackChunkName: "login" */'@/views/login'),
        meta: {
          title: '登录'
        },
      }
    ]
  },
  {
    path: '/',
    component: BasicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */'@/views/dashboard'),
        meta: {
          title: '仪表板',
          icon: 'el-icon-s-home'
        }
      }
    ]
  },
  {
    path: '/example',
    component: BasicLayout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: '例子',
      icon: 'el-icon-orange'
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import(/* webpackChunkName: "table" */'@/views/example/table'),
        meta: {
          title: '表格',
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import(/* webpackChunkName: "table" */'@/views/example/tree'),
        meta: {
          title: '树',
        }
      }
    ]
  },
  {
    path: '/exception',
    component: BasicLayout,
    hidden: true,
    children: [
      {
        path: '404',
        component: () => import(/* webpackChunkName: "404" */'@/views/exception/404'),
        meta: {
          title: '404'
        }
      }
    ]
  },
  {
    path: '/404',
    redirect: '/exception/404',
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/form',
    component: BasicLayout,
    meta: {
      roles: ['admin'],
    },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import(/* webpackChunkName: "form" */'@/views/form'),
        meta: {
          title: '表单',
          icon: 'el-icon-s-platform',
        }
      }
    ]
  },
  {
    path: '/nested',
    component: BasicLayout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'el-icon-more'
    },
    children: [
      {
        path: 'menu1',
        component: () => import(/* webpackChunkName: "menu1" */'@/views/nested/menu1'),
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import(/* webpackChunkName: "menu1-1" */'@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import(/* webpackChunkName: "menu1-2" */'@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import(/* webpackChunkName: "menu1-2-1" */'@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import(/* webpackChunkName: "menu1-2-2" */'@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import(/* webpackChunkName: "menu1-3" */'@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import(/* webpackChunkName: "menu2" */'@/views/nested/menu2'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
