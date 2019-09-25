<template>
  <div class="side-menu" :class="{'has-logo':settings.sidebarLogo}">
    <side-menu-logo v-if="settings.sidebarLogo" :collapse="!settings.openSideMenu"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="!settings.openSideMenu"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
        background-color="#304156"
        text-color=" #bfcbd9"
        active-text-color="#409eff"
      >
        <side-menu-item
          v-for="item in permission.routes"
          :key="item.path"
          :item="item"
          :base-path="item.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SideMenuLogo from '@/components/SideMenu/Logo'
  import SideMenuItem from '@/components/SideMenu/SideMenuItem'

  export default {
    name: 'SideMenu',
    components: {
      SideMenuLogo,
      SideMenuItem
    },
    computed: {
      activeMenu () {
        const route = this.$route
        const { meta, path } = route
        if (meta.activeMenu) return meta.activeMenu
        return path
      },
      ...mapGetters(['settings', 'permission'])
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/styles";

  .side-menu {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    width: $sideBarWidth !important;
    height: 100%;
    overflow: hidden;
    font-size: 0;
    background-color: $menuBg;
    transition: width 0.28s;

    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }

    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .el-scrollbar__bar.is-vertical {
      right: 0;
    }

    .el-scrollbar {
      height: 100%;
    }

    &.has-logo {
      .el-scrollbar {
        height: calc(100% - 50px);
      }
    }

    .is-horizontal {
      display: none;
    }

    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }

    .el-menu {
      width: 100% !important;
      height: 100%;
      border: none;
    }

    .submenu-title-noDropdown,
    .el-submenu__title {
      &:hover {
        background-color: $menuHover !important;
      }
    }

    .is-active > .el-submenu__title {
      color: $subMenuActiveText !important;
    }

    &.nest-menu .el-submenu > .el-submenu__title,
    &.el-submenu .el-menu-item {
      min-width: $sideBarWidth !important;
      background-color: $subMenuBg !important;

      &:hover {
        background-color: $subMenuHover !important;
      }
    }
  }

  .hideSideBar {
    .side-menu {
      width: 54px !important;
    }

    .main-container {
      margin-left: 54px !important;
    }

    .submenu-title-noDropdown {
      position: relative;
      padding: 0 !important;

      .el-tooltip {
        padding: 0 !important;

        .icon {
          margin-left: 20px;
        }
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0 !important;

        .icon {
          margin-left: 20px;
        }

        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }

    .el-menu--collapse {
      .el-submenu {
        & > .el-submenu__title {
          & > span {
            display: inline-block;
            width: 0;
            height: 0;
            overflow: hidden;
            visibility: hidden;
          }
        }
      }
    }
  }

  .el-menu--collapse .el-menu .el-submenu {
    min-width: $sideBarWidth !important;
  }

  // mobile responsive
  .mobile {
    .main-container {
      margin-left: 0;
    }

    .side-menu {
      width: $sideBarWidth !important;
      transition: transform 0.28s;
    }

    &.hideSideBar {
      .side-menu {
        transform: translate3d(-$sideBarWidth, 0, 0);
        transition-duration: 0.3s;
        pointer-events: none;
      }
    }
  }

  .withoutAnimation {
    .main-container,
    .side-menu {
      transition: none;
    }
  }

  // when menu collapsed
  .el-menu--vertical {
    & > .el-menu {
      .icon {
        margin-right: 16px;
      }
    }

    .nest-menu .el-submenu > .el-submenu__title,
    .el-menu-item {
      &:hover {
        // you can use $subMenuHover
        background-color: $menuHover !important;
      }
    }

    // the scroll bar appears when the subMenu is too long
    > .el-menu--popup {
      max-height: 100vh;
      overflow-y: auto;

      &::-webkit-scrollbar-track-piece {
        background: #d3dce6;
      }

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: #99a9bf;
        border-radius: 20px;
      }
    }
  }
</style>
