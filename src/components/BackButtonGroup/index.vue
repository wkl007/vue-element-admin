<template>
  <div class="back-button-group">
    <el-button type="primary" @click="backHome">返回首页</el-button>
    <el-button @click="backPrev">返回上一页（ {{second}}s ）</el-button>
  </div>
</template>

<script>
  export default {
    name: 'BackButtonGroup',
    data () {
      return {
        second: 5,
        timer: null
      }
    },
    methods: {
      backHome () {
        this.$router.replace('/')
      },
      backPrev () {
        this.$router.go(-1)
      }
    },
    mounted () {
      this.timer = setInterval(() => {
        if (this.second === 0) this.backPrev()
        else this.second--
      }, 1000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped>
  .back-button-group {
    position: absolute;
    right: 0;
    bottom: 20px;
  }
</style>
