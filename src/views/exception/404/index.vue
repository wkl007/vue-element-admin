<template>
  <div class="exception">
    <div class="content-con">
      <img :src="src" :alt="code">
      <div class="text-con">
        <h4>{{ code }}</h4>
        <h5>{{ desc }}</h5>
      </div>
      <back-button-group class="back-btn-group"></back-button-group>
    </div>
  </div>
</template>

<script>
  import error404 from '@/assets/images/404.svg'
  import BackButtonGroup from '@/components/BackButtonGroup'

  export default {
    name: 'Exception404',
    components: {
      BackButtonGroup
    },
    data () {
      return {
        src: error404,
        code: '404',
        desc: 'Oh~~您的页面好像飞走了~'
      }
    }
  }
</script>

<style scoped lang="scss">
  .exception {
    position: relative;
    width: 100%;
    min-height: calc(100vh - 90px);
    background: #f8f8f9;

    .content-con {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 700px;
      height: 600px;
      transform: translate(-50%, -60%);

      img {
        display: block;
        width: 100%;
        height: 100%;
      }

      .text-con {
        position: absolute;
        top: 0;
        left: 0;

        h4 {
          position: absolute;
          top: 0;
          left: 0;
          margin: 0;
          color: #348eed;
          font-weight: 700;
          font-size: 80px;
        }

        h5 {
          position: absolute;
          top: 100px;
          left: 0;
          width: 700px;
          margin: 0;
          color: #67647d;
          font-weight: 700;
          font-size: 20px;
        }
      }
    }
  }
</style>
