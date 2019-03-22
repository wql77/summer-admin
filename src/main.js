// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import axios from 'axios'
//import 'element-ui/lib/theme-default/index.css'
//import locale from 'element-ui/lib/locale/lang/en'
// const Vue = require('vue')
// const ElementUI = require('element-ui')
// const axios = require('axios')

import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限

Vue.prototype.$ajax=axios
// Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
