<template>
  <div class="clipboard">
    <el-tabs v-model="activeName">
      <el-tab-pane
        label="使用方法"
        name="directly">
        <el-input
          v-model="inputValue"
          placeholder="Please input"
          style="width: 400px; max-width: 100%; margin-right: 20px;"/>
        <el-button
          type="primary"
          icon="el-icon-document"
          @click="handleCopy(inputValue,$event)">
          复制
        </el-button>
      </el-tab-pane>
      <el-tab-pane
        label="使用指令"
        name="v-directive">
        <el-input
          v-model="inputValue"
          placeholder="请输入"
          style="width: 400px; max-width: 100%; margin-right: 20px;"
        />
        <el-button
          icon="el-icon-document"
          v-clipboard="{value:inputValue,success:clipboardSuccess}"
        >
          复制
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import handleClipboard from '@/utils/clipboard'

  export default {
    name: 'ExampleClipboard',
    data () {
      return {
        activeName: 'directly',
        inputValue: 'vue-element-admin'
      }
    },
    methods: {
      handleCopy (text, event) {
        handleClipboard(text, event)
      },
      clipboardSuccess () {
        this.$message({
          message: '复制成功',
          type: 'success',
          duration: 1500
        })
      }
    }
  }
</script>
