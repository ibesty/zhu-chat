import Vue from 'vue'
import App from './App.vue'

import 'normalize.css'
import './assets/css/base.scss'

var vm = new Vue({
  el: '#app',
  render: h => h(App)
})