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
    <!-- Admin can see this -->
    <el-tag v-permission="['admin']" v-clipboard="{value:'admin',success:success}">admin
    </el-tag>

    <!-- Editor can see this -->
    <el-tag v-permission="['normal']">normal</el-tag>

    <!-- Editor can see this -->
    <el-tag v-permission="['admin','normal']">Both admin or normal can see this</el-tag>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters(['userInfo'])
    },
    methods: {
      success () {
        console.log('复制成功')
      }
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

    .el-tag {
      margin-right: 20px;
    }
  }
</style>
