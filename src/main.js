import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import store from '@/store/index'
import router from './router'

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
}).$mount('#app')