<template>
  <div
    v-if="!item.hidden"
    class="side-menu-item"
  >
    <template
      v-if="hasOneShowChild(item.children,item)&&(!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <side-menu-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}">
          <i class="icon" :class="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"></i>
          <span slot="title">{{onlyOneChild.meta.title}}</span>
        </el-menu-item>
      </side-menu-link>
    </template>
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <div v-if="item.meta">
          <i class="icon" :class="item.meta && item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </div>
      </template>
      <side-menu-item
        v-for="child in item.children"
        :key="child.path"
        is-nest
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
  import path from 'path'
  import { isExternalUrl } from '@/utils'
  import SideMenuLink from '@/components/SideMenu/Link'

  export default {
    name: 'SideMenuItem',
    components: {
      SideMenuLink
    },
    props: {
      item: {
        type: Object,
        required: true
      },
      basePath: {
        type: String,
        default: ''
      },
      isNest: {
        type: Boolean,
        default: false
      }
    },
    data () {
      // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
      // TODO: refactor with render function
      return {
        onlyOneChild: ''
      }
    },
    created () {
      this.hasOneShowChild(this.item.children, this.item)
    },
    methods: {
      hasOneShowChild (children = [], parent) {
        const showingChildren = children.filter(item => {
          if (!item.hidden) {
            this.onlyOneChild = item
            return true
          }
          return false
        })

        if (showingChildren.length === 1) return true

        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
          return true
        }

        return false
      },
      resolvePath (routePath) {
        if (isExternalUrl(routePath)) return routePath
        if (isExternalUrl(this.basePath)) return this.basePath
        return path.resolve(this.basePath, routePath)
      }
    }
  }
</script>

<style scoped lang="scss">
  .side-menu-item {
    .icon {
      margin: 0 16px;
    }
  }
</style>
