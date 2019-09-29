<template>
  <div class="tags-view">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper"
    >
      <router-link
        ref="tag"
        tag="span"
        class="tags-view-item"
        :class="isActive(item)?'active':''"
        v-for="item in tagsView.visitedViews"
        :key="item.path"
        :to="{path:item.path,query:item.query,fullPath:item.fullPath}"
        @click.middle.native="closeSelectedTag(item)"
        @contextmenu.prevent.native="openMenu(item,$event)"
      >
        {{item.title}}
        <span
          v-if="!item.meta.affix"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(item)"
        ></span>
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{left:left+'px',top:top+'px'}"
      class="contextMenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">关闭页面</li>
      <li @click="closeOtherTags">关闭其他页面</li>
      <li @click="closeAllTags(selectedTag)">关闭所有页面</li>
    </ul>
  </div>
</template>

<script>
  import path from 'path'
  import { mapActions, mapGetters } from 'vuex'
  import ScrollPane from './ScrollPane'

  export default {
    name: 'TagsView',
    components: {
      ScrollPane
    },
    computed: {
      ...mapGetters(['tagsView', 'permission'])
    },
    data () {
      return {
        visible: false,
        top: 0,
        left: 0,
        selectedTag: {},
        affixTags: []
      }
    },
    watch: {
      $route () {
        this.addTags()
        this.moveToCurrentTag()
      },
      visible (val) {
        if (val) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    },
    mounted () {
      this.initTags()
      this.addTags()
    },
    methods: {
      isActive (route) {
        return route.path === this.$route.path
      },
      filterAffixTags (routes, basePath = '/') {
        let tags = []
        routes.forEach(route => {
          if (route.meta && route.meta.affix) {
            const tagPath = path.resolve(basePath, route.path)
            tags.push({
              fullPath: tagPath,
              path: tagPath,
              name: route.name,
              meta: { ...route.meta }
            })
          }
          if (route.children) {
            const tempTags = this.filterAffixTags(route.children, route.path)
            if (tempTags.length >= 1) {
              tags = [...tags, ...tempTags]
            }
          }
        })
        return tags
      },
      // 初始化tags
      initTags () {
        const affixTags = this.affixTags = this.filterAffixTags(this.permission.routes)
        for (const tag of affixTags) {
          if (tag.name) {
            this.addVisitedView(tag)
          }
        }
      },
      // 添加tags
      addTags () {
        const { name } = this.$route
        if (name) {
          this.addVisitedView(this.$route)
          this.addCachedView(this.$route)
        }
      },
      // 移动到当前tag
      moveToCurrentTag () {
        const tags = this.$refs.tag
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to.path === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag)
              if (tag.to.fullPath !== this.$route.fullPath) {
                this.updateVisitedView(this.$route)
              }
              break
            }
          }
        })
      },
      // 刷新当前页面
      refreshSelectedTag (route) {
        this.deleteCachedView(route)
        const { fullPath } = route
        /* this.$nextTick(() => {
          this.$router.replace({
            path: `/redirect${fullPath}`
          })
        }) */
      },
      // 关闭当前页面标签
      closeSelectedTag (route) {},
      // 关闭其他页面
      closeOtherTags () {},
      // 关闭所有页面
      closeAllTags (route) {
        /*
        this.deleteAllVisitedViews()
        this.deleteAllCachedViews()
        */
      },
      // 前往最后一个标签
      toLastView (visitedViews, route) {
        const lastestView = visitedViews.slice(-1)[0]
        if (lastestView) {
          this.$router.push(lastestView)
        } else {
          if (route.name === 'Dashboard') {
            this.$router.replace({
              path: `/redirect${route.fullPath}`
            })
          } else {
            this.$router.push('/')
          }
        }
      },
      // 打开menu
      openMenu (tag, e) {
        const menuMinWidth = 105
        const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
        const offsetWidth = this.$el.offsetWidth // container width
        const maxLeft = offsetWidth - menuMinWidth // left boundary
        const left = e.clientX - offsetLeft + 15 // 15: margin right

        this.left = left > maxLeft ? maxLeft : left

        this.top = e.clientY
        this.visible = true
        this.selectedTag = tag
      },
      // 关闭menu
      closeMenu () {
        this.visible = false
      },
      ...mapActions(['addVisitedView', 'addCachedView', 'updateVisitedView', 'deleteCachedView', 'deleteAllVisitedViews', 'deleteAllCachedViews'])
    }
  }
</script>

<style scoped lang="scss">
  .tags-view {
    width: 100%;
    height: 34px;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

    .tags-view-wrapper {
      .tags-view-item {
        position: relative;
        display: inline-block;
        height: 26px;
        margin-top: 4px;
        margin-left: 5px;
        padding: 0 8px;
        color: #495060;
        font-size: 12px;
        line-height: 26px;
        background: #fff;
        border: 1px solid #d8dce5;
        cursor: pointer;

        &:first-of-type {
          margin-left: 15px;
        }

        &:last-of-type {
          margin-right: 15px;
        }

        &.active {
          color: #fff;
          background-color: #42b983;
          border-color: #42b983;

          &::before {
            position: relative;
            display: inline-block;
            width: 8px;
            height: 8px;
            margin-right: 2px;
            background: #fff;
            border-radius: 50%;
            content: '';
          }
        }
      }
    }

    .contextMenu {
      position: absolute;
      z-index: 3000;
      margin: 0;
      padding: 5px 0;
      color: #333;
      font-weight: 400;
      font-size: 12px;
      list-style-type: none;
      background: #fff;
      border-radius: 4px;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;

        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

<style lang="scss">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        text-align: center;
        vertical-align: 2px;
        border-radius: 50%;
        transform-origin: 100% 50%;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

        &::before {
          display: inline-block;
          vertical-align: -3px;
          transform: scale(0.6);
        }

        &:hover {
          color: #fff;
          background-color: #b4bccc;
        }
      }
    }
  }
</style>
