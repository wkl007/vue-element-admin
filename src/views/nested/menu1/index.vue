<template>
  <div>
    <el-alert :closable="false" title="menu 1">
      <router-view/>
    </el-alert>
  </div>
</template>

<script>
  export default {
    name: 'menu1'
  }
</script>
