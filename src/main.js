import Vue from 'vue'
window.bus = new Vue()
import App from './App.vue'

import 'normalize.css'
import './assets/css/base.scss'


var vm = new Vue({
  el: '#app',
  render: h => h(App)
})

bus.$on('contactChange',function(id){
  console.log('emit '+id)
})
