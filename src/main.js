import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
window.bus = new Vue()
import App from './App.vue'

import 'normalize.css'
import './assets/css/base.scss'

Vue.use(VueSocketio, 'http://localhost:3000')

var vm = new Vue({
  el: '#app',
  render: h => h(App)
})

bus.$on('contactChange',function(id){
  console.log('emit '+id)
})
