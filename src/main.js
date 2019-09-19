import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import '@/configs/element'
import '@/configs/filter'
import '@/configs/registerServiceWorker'
import store from './store.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
