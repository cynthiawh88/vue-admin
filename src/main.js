import Vue from 'vue'
import App from './App'
import router from './router'

//import components
import 'vue-beauty/package/style/vue-beauty.min.css'
import vueBeauty from 'vue-beauty'
Vue.use(vueBeauty)

//import store
import store from '@/store';


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
