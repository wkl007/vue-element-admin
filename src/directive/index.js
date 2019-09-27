import directives from '@/directive/directives'

const importDirective = Vue => {
  /**
   * clipboard指令 v-draggable="options"
   * options = {
   *  value:    /在输入框中使用v-model绑定的值/,
   *  success:  /复制成功后的回调/,
   *  error:    /复制失败后的回调/
   * }
   */
  Vue.directive('clipboard', directives.clipboard)

  /**
   * permission指令 v-permission="['admin','editor']"
   */
  Vue.directive('permission', directives.permission)
}

export default importDirective
