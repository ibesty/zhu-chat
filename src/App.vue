<template>
    <div id="app">
        <modal v-if="modal_show" @close="close()">
            <h3 slot="header">请输入一个名字</h3>
            <input slot="body" type="text" name="username" value="" v-model="userInfo.nickname">
            <button slot="footer" @click="close(),login()">确定</button>
        </modal>
        <panel :userList="userList" :userInfo="userInfo" @currentContactChange="currentContactChange"></panel>
        <chat-area :currentContact="currentContact" :messageList="this.currentMessageList"
                   @sendConfirm="sendMessage"></chat-area>
    </div>
</template>

<script>
    import Modal from './components/Modal.vue'
    import Panel from './components/Panel.vue'
    import ChatArea from './components/ChatArea.vue'

    const avatar1 = require('./assets/img/avatar.jpg')
    const avatar2 = require('./assets/img/contact-avatar.jpg')

    function MsgData (msgType, sourceID, targetID, msgText) {
        this.msgType = msgType
        this.sourceID = sourceID
        this.targetID = targetID
        this.msgText = msgText
    }

    export default {
        name: 'app',
        components: {
            Modal,
            Panel,
            ChatArea
        },
        data: function () {
            return {
                userInfo: {
                    nickname: '',
                    userID: '',
                    userAvatar: avatar1,
                    currentChat: false
                },
                userList: {},
                messageList: {},
                //currentMessageList: [],
                currentContact: '',
                modal_show: true
            }
        },
        created: function () { //创建实例时检查是否已经登陆过，如果是的话直接从localStorage中获取nickname和userID
            this.userInfo.nickname = localStorage.getItem('nickname') || ''
            this.userInfo.userID = localStorage.getItem('userID') || this.rand()
            //this.userInfo.userID = this.rand()
            if (this.userInfo.nickname !== '') {
                this.modal_show = false
                this.login()
            }
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
                this.login()
            },
            login: function (data) {
                let userInfo = data.userInfo
                this.userList = data.userList
                console.log(userInfo)
                console.log(Object.keys(data.userList))
                //this.userList.push(userInfo)
                console.log(userInfo.nickname + '已登陆')
                for (var item in this.userList) {
                    console.log('昵称: ' + this.userList[item].nickname + ' | ID: ' + this.userList[item].userID)
                }
            },
            message: function (msgData) {
                if (typeof this.messageList[parseInt(msgData.sourceID)] == 'undefined') {
                    this.messageList[parseInt(msgData.sourceID)] = new Array()
                }
                //this.messageList[parseInt(msgData.sourceID)] = new Array
                this.messageList[parseInt(msgData.sourceID)].push(msgData)
                console.log('收到了 ' + msgData.sourceID + ' 发来的消息: ' + msgData.msgText)
                console.log(this.messageList[parseInt(msgData.sourceID)])
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
//                this.msgData.sourceID = this.userInfo.userID
//                this.msgData.targetID = this.currentContact.userID
//                this.msgData.msgText = msgText
                let TempMsgData = new MsgData(1,this.userInfo.userID,this.currentContact.userID,msgText)
                console.log(TempMsgData)
                this.currentMessageList.push(TempMsgData)
                console.log(this.currentMessageList)
                this.$socket.emit('message', TempMsgData)
                console.log('消息已发送给 ' + TempMsgData.targetID + ' : ' + TempMsgData.msgText　+ ' ' + TempMsgData.msgType)
            },
            currentContactChange: function (chatContact) {
                this.currentContact = chatContact
                //this.currentMessageList = this.messageList[parseInt(this.currentContact.userID)]
                console.log(this.currentContact.userID)
                console.log(this.currentMessageList)
            }
        },
        computed: {
            currentMessageList: function(){
                if (typeof this.messageList[parseInt(this.currentContact.userID)] == 'undefined') {
                    this.messageList[parseInt(this.currentContact.userID)] = new Array()
                }
                console.log(this.messageList[parseInt(this.currentContact.userID)])
                //let TempList = new Array()
                //TempList = this.messageList[parseInt(this.currentContact.userID)]
                return this.messageList[parseInt(this.currentContact.userID)]
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
