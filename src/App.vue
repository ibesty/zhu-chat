<template>
    <div id="app">
        <modal v-if="modal_show" @close="close">
            <h3 slot="header">请输入一个名字</h3>
            <input slot="body" type="text" name="username" value="" v-model="userInfo.nickname">
            <button slot="footer" @click="close(),login()">确定</button>
        </modal>
        <panel :userList="userList" :userInfo="userInfo" @currentContact="currentContactChange"></panel>
        <chat-area :currentContact="currentContact" @sendConfirm="sendMsg"></chat-area>
        <button @click="aaa" style="z-index:999;position: absolute;top: 400px;left: 400px;">点击push</button>
    </div>
</template>

<script>
    import Modal from './components/Modal.vue'
    import Panel from './components/Panel.vue'
    import ChatArea from './components/ChatArea.vue'

    const avatar1 = require('./assets/img/avatar.jpg')
    const avatar2 = require('./assets/img/contact-avatar.jpg')

    export default {
        name: 'app',
        components: {
            Modal,
            Panel,
            ChatArea
        },
        data() {
            return {
                userInfo: {
                    nickname: '',
                    userID: '',
                    userAvatar: avatar1
                },
                msgData: {
                    type: 1,
                    sourceID: '',
                    targetID: '',
                    msgText: ''
                },
                userList: [],
                messageList: [],
                currentContact: '',
                modal_show: true
            }
        },
        created() { //创建实例时检查是否已经登陆过，如果是的话直接从localStorage中获取nickname和userID
            this.userInfo.nickname = localStorage.getItem('nickname') || ''
            this.userInfo.userID = localStorage.getItem('userID') || this.rand()
            if (this.userInfo.nickname !== '') {
                this.modal_show = false
                this.login()
            }
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            login: function (userInfo) {
                userInfo.currentChat = false
                console.log(userInfo)
                console.log(this.userList)
                //this.userList.push(userInfo)
                console.log(userInfo.nickname +'已登陆'+this.userList.toString())
            },
            message: function (msgData) {
                this.messageList[msgData.sourceID].push(msgData)
            }
        },
        methods: {
            close: function () {
                this.userInfo.nickname.trim() === '' ? alert('请输入一个名字') : this.modal_show = false;
            },
            rand: function rand() {
                return Math.floor((Math.random() * (10 - 1) + 1) * 10000000)
            },
            login: function () {
                localStorage.setItem('userID', this.userInfo.userID)
                localStorage.setItem('nickname', this.userInfo.nickname)
                this.$socket.emit('login', this.userInfo)
            },
            sendMessage: function (msgText) {
                this.msgData.sourceID = this.userInfo.userID
                this.msgData.targetID = this.currentContact
                this.msgData.msgText = msgText
                this.messageList[this.currentContact].push(this.msgData)
                this.$socket.emit('message', this.msgData)
            },
            currentContactChange: function (chatContact) {
                this.currentContact = chatContact.userID
            },
            aaa: function () {
                this.userList.push({aaa: 'aaa'})
                console.log(this.userList)
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
