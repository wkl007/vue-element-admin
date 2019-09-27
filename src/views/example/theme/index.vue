<template>
  <div class="theme">
    <el-card class="box-card">
      <div class="box-item">
        <span class="field-label">更改主题 : </span>
        <el-switch v-model="theme"/>
        <aside style="margin-top: 15px;">
          Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。
        </aside>
      </div>
    </el-card>

    <div class="block">
      <el-button type="primary">
        Primary
      </el-button>
      <el-button type="success">
        Success
      </el-button>
      <el-button type="info">
        Info
      </el-button>
      <el-button type="warning">
        Warning
      </el-button>
      <el-button type="danger">
        Danger
      </el-button>
    </div>

    <div class="block">
      <el-button type="primary" icon="el-icon-edit"/>
      <el-button type="primary" icon="el-icon-share"/>
      <el-button type="primary" icon="el-icon-delete"/>
      <el-button type="primary" icon="el-icon-search">
        Search
      </el-button>
      <el-button type="primary">
        Upload
        <i class="el-icon-upload el-icon-right"/>
      </el-button>
    </div>

    <div class="block">
      <el-tag v-for="tag in tags" :key="tag.type" :type="tag.type" class="tag-item">
        {{ tag.name }}
      </el-tag>
    </div>

    <div class="block">
      <el-radio-group v-model="radio">
        <el-radio :label="3">
          Option A
        </el-radio>
        <el-radio :label="6">
          Option B
        </el-radio>
        <el-radio :label="9">
          Option C
        </el-radio>
      </el-radio-group>
    </div>

    <div class="block">
      <el-slider v-model="slideValue"/>
    </div>
  </div>
</template>

<script>
  import { toggleClass } from '@/utils'
  import '@/assets/styles/custom-theme/index.css'

  export default {
    name: 'exampleTheme',
    data () {
      return {
        theme: false,
        tags: [
          { name: 'Tag One', type: '' },
          { name: 'Tag Two', type: 'info' },
          { name: 'Tag Three', type: 'success' },
          { name: 'Tag Four', type: 'warning' },
          { name: 'Tag Five', type: 'danger' }
        ],
        slideValue: 50,
        radio: 3
      }
    },
    watch: {
      theme () {
        toggleClass(document.body, 'custom-theme')
      }
    }
  }
</script>

<style scoped lang="scss">
  .theme {
    .field-label {
      vertical-align: middle;
    }

    .box-card {
      width: 400px;
      max-width: 100%;
      margin: 20px auto;
    }

    .block {
      padding: 30px 24px;
    }

    .tag-item {
      margin-right: 15px;
    }
  }
</style>
