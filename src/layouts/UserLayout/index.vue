<template>
  <div class="user-layout">
    <div class="content">
      <div class="top">
        <div class="header">
          <router-link
            to="/"
          >
            <img class="logo" src="../../assets/images/logo.png" alt="">
            <span class="title">Vue Element Admin</span>
          </router-link>
        </div>
        <p class="desc">Vue Element Admin 演示</p>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserLayout'
  }
</script>

<style scoped lang="scss">
  @import "~element-ui/packages/theme-chalk/src/common/var";

  .user-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background: #f0f2f5;

    .content {
      flex: 1;
      padding: 32px 0;
    }

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .logo {
          height: 44px;
          margin-right: 16px;
          vertical-align: top;
        }

        .title {
          position: relative;
          top: 2px;
          color: $--color-black;
          font-weight: 600;
          font-size: 33px;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
        }
      }

      .desc {
        margin-top: 12px;
        margin-bottom: 40px;
        color: rgba(0, 0, 0, 0.45);
        font-size: $--font-size-base;
      }
    }
  }

  @media (min-width: $--sm) {
    .user-layout {
      background-image: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
      background-repeat: no-repeat;
      background-position: center 110px;
      background-size: 100%;

      .content {
        padding: 112px 0 24px 0;
      }
    }
  }
</style>
