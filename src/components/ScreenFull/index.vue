<template>
  <div class="screen-full">
    <i
       :class="isScreenFull?'el-icon-zoom-out':'el-icon-zoom-in'"
       @click="click"
    ></i>
  </div>
</template>

<script>
  import screenFull from 'screenfull'

  export default {
    name: 'screenFull',
    data () {
      return {
        isScreenFull: false
      }
    },
    mounted () {
      this.init()
    },
    beforeDestroy () {
      this.destroy()
    },
    methods: {
      click () {
        if (!screenFull.isEnabled) {
          this.$message({
            message: '您的浏览器不支持',
            type: 'warning'
          })
          return false
        }
        screenFull.toggle()
      },
      change () {
        this.isScreenFull = screenFull.isFullscreen
      },
      init () {
        if (screenFull.isEnabled) {
          screenFull.on('change', this.change)
        }
      },
      destroy () {
        if (screenFull.isEnabled) {
          screenFull.off('change', this.change)
        }
      }
    }
  }
</script>

<style scoped>
  .screen-full {
    height: auto;
  }
</style>
