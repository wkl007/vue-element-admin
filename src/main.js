import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/configs/directive'
import '@/configs/element'
import '@/configs/filter'
import '@/configs/permission'
import '@/configs/registerServiceWorker'

import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/styles/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
