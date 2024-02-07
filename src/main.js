import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

import App from './App.vue'
import router from './router'

Vue.use(PiniaVuePlugin)

export const pinia = createPinia()

new Vue({
  router,
  pinia,
  render: (h) => h(App)
}).$mount('#app')
