<template>
  <div>
    <el-alert :closable="false" title="menu 1-2">
      <router-view/>
    </el-alert>
  </div>
</template>

<script>
  export default {
    name: 'Menu1-2'
  }
</script>
