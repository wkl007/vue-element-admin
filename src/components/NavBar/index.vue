<template>
  <div class="nav-bar">
    <div class="hamburger-container" @click="toggleSideBar">
      <svg
        :class="{'is-active':settings.openSideMenu}"
        class="hamburger"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
      >
        <path
          d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"/>
      </svg>
    </div>
    <div class="breadcrumb-container">
      <el-breadcrumb
        separator="/"
      >
        <transition-group name="breadcrumb">
          <el-breadcrumb-item
            class="nav-bar-breadcrumb"
            v-for="(item,index) in breadcrumbList"
            :key="item.path"
          >
            <span
              v-if="item.redirect==='noRedirect'||index===breadcrumbList.length-1"
              class="no-redirect"
            >
              {{ item.meta.title }}
            </span>
            <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="userInfo.avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/wkl007/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display: block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import pathToRegexp from 'path-to-regexp'
  import { mapGetters, mapActions } from 'vuex'
  import { resetRouter } from '@/router'

  export default {
    name: 'NavBar',
    computed: {
      ...mapGetters(['settings', 'userInfo'])
    },
    watch: {
      $route () {
        this.getBreadcrumb()
      }
    },
    data () {
      return {
        breadcrumbList: []
      }
    },
    created () {
      this.getBreadcrumb()
    },
    methods: {
      // 获取面包屑
      getBreadcrumb () {
        let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
        const first = matched[0]
        if (!this.isDashboard(first)) {
          matched = [{ path: '/dashboard', meta: { title: '仪表板' } }].concat(matched)
        }
        this.breadcrumbList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      },
      // 是否是首页
      isDashboard (route) {
        const name = route && route.name
        if (!name) return false
        return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
      },
      // 切换侧导航状态
      toggleSideBar () {
        let settings = { ...this.settings }
        settings.openSideMenu = !this.settings.openSideMenu
        this.setSettings(settings)
      },
      // 路径处理
      pathCompile (path) {
        // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
        const { params } = this.$route
        let toPath = pathToRegexp.compile(path)
        return toPath(params)
      },
      // 面包屑点击
      handleLink (item) {
        const { redirect, path } = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
      },
      logout () {
        this.setLoginStatus(false)
        this.setAccessToken('')
        this.setUserInfo({})
        this.setPermission({
          asyncRoutes: [],
          routes: []
        })
        resetRouter()
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      ...mapActions(['setSettings', 'setLoginStatus', 'setAccessToken', 'setUserInfo', 'setPermission'])
    }
  }
</script>

<style scoped lang="scss">
  .nav-bar {
    position: relative;
    height: 50px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
      float: left;
      height: 100%;
      padding: 0 15px;
      line-height: 46px;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }

      .hamburger {
        display: inline-block;
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }

      .hamburger.is-active {
        transform: rotate(180deg);
      }
    }

    .breadcrumb-container {
      float: left;
      line-height: 50px;

      .el-breadcrumb {
        display: inline-block;
        margin-left: 8px;
        font-size: 14px;
        line-height: 50px;

        .no-redirect {
          color: #97a8be;
          cursor: text;
        }
      }
    }

    .right-menu {
      float: right;
      height: 100%;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        height: 100%;
        padding: 0 8px;
        color: #5a5e66;
        font-size: 18px;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          position: relative;
          margin-top: 5px;

          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            cursor: pointer;
          }

          .el-icon-caret-bottom {
            position: absolute;
            top: 15px;
            right: -20px;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
