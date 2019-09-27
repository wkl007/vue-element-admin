<template>
  <div class="settings-drawer">
    <el-drawer
      :visible.sync="settings.openSettings"
      :show-close="false"
      size="260px"
      @close="closeSettings"
    >
      <div class="drawer-container">
        <h3 class="drawer-title">系统布局配置</h3>

        <div class="drawer-item">
          <span>主题色</span>
          <theme-picker
            style="float: right; height: 26px; margin: -3px 8px 0 0;"
            @change="changeSettings('theme',$event)"
          />
        </div>

        <div class="drawer-item">
          <span>开启 Tags-View</span>
          <el-switch
            v-model="settings.tagsView"
            class="drawer-switch"
            @onChange="changeSettings('tagsView',$event)"
          />
        </div>

        <div class="drawer-item">
          <span>固定 Header</span>
          <el-switch
            v-model="settings.fixedHeader"
            class="drawer-switch"
            @onChange="changeSettings('fixedHeader',$event)"
          />
        </div>

        <div class="drawer-item">
          <span>侧边栏 Logo</span>
          <el-switch
            v-model="settings.sideMenuLogo"
            class="drawer-switch"
            @onChange="changeSettings('sideMenuLogo',$event)"
          />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ThemePicker from '@/components/ThemePicker'

  export default {
    name: 'settingDrawer',
    components: {
      ThemePicker
    },
    computed: {
      ...mapGetters(['settings'])
    },
    methods: {
      // 更改设置
      changeSettings (name, val) {
        let settings = { ...this.settings }
        settings[name] = val
        this.setSettings(settings)
      },
      // 打开设置
      closeSettings () {
        let settings = { ...this.settings }
        settings.openSettings = false
        this.setSettings(settings)
      },
      ...mapActions(['setSettings'])
    }
  }
</script>

<style lang="scss">
  .el-drawer {
    .drawer-container {
      padding: 24px;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;

      .drawer-title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 22px;
      }

      .drawer-item {
        padding: 12px 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
      }

      .drawer-switch {
        float: right;
      }
    }

    .el-drawer__header {
      display: none;
    }
  }
</style>
