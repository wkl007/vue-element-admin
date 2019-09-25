<template>
  <div class="basic-layout" :class="classObj">
    <div v-if="settings.device==='mobile'" class="drawer-bg"></div>
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
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SideMenu from '@/components/SideMenu'
  import NavBar from '@/components/NavBar'

  export default {
    name: 'BasicLayout',
    components: {
      SideMenu,
      NavBar
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
    methods: {}
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

        /* 50 = navbar */
        min-height: calc(100vh - 50px);
        overflow: hidden;
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
