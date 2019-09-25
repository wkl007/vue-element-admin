<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot/>
  </component>
</template>

<script>
  import { isExternalUrl } from '@/utils'

  export default {
    name: 'Link',
    props: {
      to: {
        type: String,
        required: true
      }
    },
    methods: {
      linkProps (url) {
        if (isExternalUrl(url)) {
          return {
            is: 'a',
            href: url,
            target: '_blank',
            rel: 'noopener'
          }
        } else {
          return {
            is: 'router-link',
            to: url
          }
        }
      }
    }
  }
</script>
