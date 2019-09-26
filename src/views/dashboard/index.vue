<template>
  <div class="dashboard">
    <p class="dashboard-text">
      姓名：
      <span>{{userInfo.name}}</span>
    </p>
    <p class="dashboard-text">
      角色：
      <span
        v-for="(item,index) in userInfo.roles"
        :key="index"
      >
        {{item}}
      </span>
    </p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters(['userInfo'])
    }
  }
</script>

<style scoped lang="scss">
  .dashboard {
    margin: 30px;

    &-text {
      margin: 0;
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
