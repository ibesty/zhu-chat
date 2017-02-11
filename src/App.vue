<template>
<div id="app">
  <modal v-if="modal_show" @close="close">
    <h3 slot="header">请输入一个名字</h3>
    <input slot="body" type="text" name="username" value="" v-model="nickname">
  </modal>
  <panel :nickname="nickname"></panel>
  <chat-area></chat-area>
</div>
</template>

<script>
import Modal from './components/Modal.vue'
import Panel from './components/Panel.vue'
import ChatArea from './components/ChatArea.vue'

export default {
  name: 'app',
  components: {
    Modal,
    Panel,
    ChatArea
  },
  data() {
    return {
      nickname: '',
      currentContact: 'Welcome to Your Vue.js App',
      modal_show: true
    }
  },
  sockets: {
    connect: function () {
      console.log( 'socket connected' )
    },
    customEmit: function ( val ) {
      console.log( 'this method was fired by the socket server. eg: io.emit("customEmit", data)' )
    }
  },
  methods: {
    close: function(){
      this.nickname.trim()=='' ? alert('请输入一个名字') : this.modal_show=false;
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
  border: 1px solid rgba(100, 100, 100, 0.5);
}

h1,
h2 {
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
