<template>
  <div
    class="side-menu-logo"
    :class="{'collapse':collapse}"
  >
    <transition name="el-fade-in">
      <router-link
        v-if="collapse"
        key="collapse"
        class="side-menu-logo-link"
        to="/"
      >
        <img v-if="logo" :src="logo" alt="logo" class="logo-img">
        <h1 v-else class="side-menu-title">{{title}}</h1>
      </router-link>
      <router-link
        v-else
        key="expand"
        class="side-menu-logo-link"
        to="/"
      >
        <img v-if="logo" :src="logo" alt="logo" class="logo-img">
        <h1 class="side-menu-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
  import defaultSettings from '@/utils/settings'

  export default {
    name: 'Logo',
    props: {
      collapse: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        title: defaultSettings.title,
        logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
      }
    }
  }
</script>

<style scoped lang="scss">
  .side-menu-logo {
    position: relative;
    width: 100%;
    height: 50px;
    overflow: hidden;
    line-height: 50px;
    text-align: center;
    background: #2b2f3a;

    .side-menu-logo-link {
      width: 100%;
      height: 100%;

      .logo-img {
        width: 32px;
        height: 32px;
        margin-right: 12px;
        vertical-align: middle;
      }

      .side-menu-title {
        display: inline-block;
        margin: 0;
        color: #fff;
        font-weight: 600;
        font-size: 20px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        line-height: 50px;
        vertical-align: middle;
      }
    }

    &.collapse {
      .logo-img {
        margin-right: 0;
      }
    }
  }
</style>
