<template>
  <div id="app">
    <panel></panel>
    <chat-area></chat-area>
  </div>
</template>

<script>
import Panel from './components/Panel.vue'
import ChatArea from './components/ChatArea.vue'

export default {
  name: 'app',
  components:{Panel, ChatArea},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  border: 1px solid rgba(100,100,100,0.5);
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
