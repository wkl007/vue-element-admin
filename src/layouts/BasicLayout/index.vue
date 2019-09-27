<template>
  <div class="basic-layout" :class="classObj">
    <div
      v-if="settings.device==='mobile'&&settings.openSideMenu"
      class="drawer-bg"
      @click="handleSetting"
    ></div>
    <side-menu/>
    <div class="main-container">
      <div :class="{'fixed-header':settings.fixedHeader}">
        <nav-bar/>
      </div>
      <div class="main-content">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key"/>
        </transition>
      </div>
    </div>
    <settings-drawer/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import SideMenu from '@/components/SideMenu'
  import NavBar from '@/components/NavBar'
  import SettingsDrawer from '@/components/SetttingsDrawer'
  import { resizeMixin } from '@/mixins'

  export default {
    name: 'BasicLayout',
    mixins: [resizeMixin],
    components: {
      SideMenu,
      NavBar,
      SettingsDrawer
    },
    computed: {
      key () {
        return this.$route.path
      },
      classObj () {
        return {
          hideSideBar: !this.settings.openSideMenu,
          openSideMenu: this.settings.openSideMenu,
          withoutAnimation: this.settings.withoutAnimation,
          mobile: this.settings.device === 'mobile',
        }
      },
      ...mapGetters(['settings'])
    },
    methods: {
      handleSetting () {
        let settings = { ...this.settings }
        settings.withoutAnimation = true
        settings.openSideMenu = false
        this.setSettings(settings)
      },
      ...mapActions(['setSettings'])
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/styles";

  .basic-layout {
    @include clear-fix;

    position: relative;
    width: 100%;
    height: 100vh;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }

    .drawer-bg {
      position: absolute;
      top: 0;
      z-index: 999;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0.3;
    }

    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      width: calc(100% - #{$sideBarWidth});
      transition: width 0.28s;
    }

    &.hideSideBar .fixed-header {
      width: calc(100% - 54px);
    }

    .mobile .fixed-header {
      width: 100%;
    }

    .main-container {
      position: relative;
      min-height: 100%;
      margin-left: $sideBarWidth;
      transition: margin-left 0.28s;

      .main-content {
        position: relative;
        width: 100%;
        min-height: calc(100vh - 50px);
        overflow: hidden;

        & > div {
          padding: 20px;
        }
      }

      .fixed-header + .main-content {
        padding-top: 50px;
      }
    }
  }
</style>
<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>
