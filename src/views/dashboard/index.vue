<template>
  <div class="dashboard">
    <p class="dashboard-text">
      <span>姓名：</span>
      <span>{{userInfo.name}}</span>
    </p>
    <p class="dashboard-text">
      <span>角色：</span>
      <span
        v-for="(item,index) in userInfo.roles"
        :key="index"
      >
        {{item}}
      </span>
    </p>
    <p class="dashboard-text">
      <span>权限测试：</span>
      <el-tag v-permission="['admin']" v-clipboard="{value:'admin',success:success}">管理员可见
      </el-tag>
      <el-tag v-permission="['normal']">普通用户可见</el-tag>
      <el-tag v-permission="['admin','normal']">管理员与普通用户都可见</el-tag>
    </p>
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
      display: flex;
      align-items: center;
      margin: 10px 0;
      font-size: 24px;
      line-height: 46px;
    }

    .el-tag {
      margin-right: 20px;
    }
  }
</style>
