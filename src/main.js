import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import App from './App.vue'

import 'normalize.css'
import './assets/css/base.scss'

Vue.use(VueSocketio, 'http://localhost:3000')

window.vm = new Vue({
  el: '#app',
  render: h => h(App)
})
