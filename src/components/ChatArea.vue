<template>
    <div id="chat-area" class="chat">
        <div class="chat_header">
            <div class="title_wrap">
                <div class="title">
                    <a v-if="currentContact !== null" href="javascript:" class="title_name">{{currentContact.nickname}}</a>
                </div>
            </div>
        </div>
        <div class="chat_body">
            <vue-nice-scrollbar classes="chat_content" theme="light" :speed=50 :needToBottom="true">
                <div id="scroll_content" class="scroll_content">
                    <transition-group name="msg-fade">
                    <div v-for="message in msgList" :key="message" class="message_item">
                        <div class="clearfix" :class="{'system_msg' : message.msgType == 0,'self_msg': message.msgType == 1,'other_msg': message.msgType == 2}">
                            <img v-if="message.msgType !== 0" :src="message.msgType === 1 ? userInfo.userAvatar :currentContact.userAvatar" class="img">
                            <div class="msg_text">
                                <span class="text_content">
                                    {{message.msgText}}
                                </span>
                            </div>
                        </div>
                    </div>
                    </transition-group>
                </div>
            </vue-nice-scrollbar>
        </div>
        <div v-if="currentContact != null" class="chat_footer">
            <div class="toolbar">
                <!-- Temporarily left blank -->
            </div>
            <div class="input_content">
                <pre id="edit_area" class="edit_area" contenteditable="true" @keyup="changeData($event)" @keydown.enter.prevent @keyup.enter="sendConfirm"
                    @keyup.ctrl.enter=""></pre>
            </div>
            <div class="action">
                <a href="javascript:" @click="sendConfirm" class="btn btn_send">发送</a>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
    // begin chat area
    * {
        box-sizing: border-box;
    }
    
    .chat {
        position: relative;
        background-color: #eee;
        height: 100%;
        overflow: hidden;
        // begin chat header
        .chat_header {
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            line-height: 30px;
            .title_wrap {
                position: relative;
                padding: 10px 0;
                margin: 0 19px;
                border-bottom: 1px solid #d6d6d6;
                background-color: #EEE;
                z-index: 1024;
                .title {
                    font-weight: 400;
                    height: 25px;
                    display: inline-block;
                    font-size: 14px;
                    .title_name {
                        display: inline-block;
                        vertical-align: middle;
                        max-width: 300px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-wrap: normal;
                        text-decoration: none;
                        color: #000;
                        font-weight: 400;
                    }
                }
            }
        }
        // end chat header
        // begin chat body
        .chat_body {
            position: absolute;
            right: 0;
            left: 0;
            top: 51px;
            bottom: 180px;
            padding: 10px 19px;
            .chat_content {
                height: 100%;
            }
            .message_item {
                min-height: 3em;
                width: 99%;
                margin: 0 auto;
                padding: 0.25em;
                /*指向头像的三角形使用伪元素实现，父元素必须为相对定位或绝对定位*/
                .msg_text {
                    position: relative;
                    word-wrap: break-word;
                    word-break: break-all;
                    text-align: left;
                    max-width: 300px;
                    min-height: 2.5em;
                    margin: 0 10px;
                    padding: 0.5em 10px;
                    background: #B2E281;
                    border-radius: 2px;
                }
                .img {
                    height: 2.5em;
                }
                .self_msg {
                    .msg_text,
                    .img {
                        float: right;
                    }
                    .msg_text {
                        &:after {
                            content: "";
                            position: absolute;
                            left: 99%;
                            top: 14px;
                            border: 6px solid transparent;
                            border-left-color: #B2E281
                        }
                    }
                }
                .other_msg {
                    .msg_text,
                    .img {
                        float: left;
                    }
                    .msg_text {
                        background: #CCC;
                        &:before {
                            content: "";
                            position: absolute;
                            right: 99%;
                            top: 14px;
                            border: 6px solid transparent;
                            border-right-color: #CCC;
                        }
                    }
                }
            }
        }

                .msg-fade-enter-active, .msg-fade-leave-active {
                    transition: opacity .5s;
                }
                .msg-fade-enter, msg-fade-leave-to {
                    opacity: 0;
                }
        // end chat body
        .chat_footer {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            height: 180px;
            margin-right: 19px;
            border-top: 1px solid #d6d6d6;
            .toolbar {
                height: 30px;
                padding: 5px 17px;
            }
            .edit_area {
                text-align: left;
                height: 6em;
                overflow-y: auto;
                overflow-x: hidden;
                padding-left: 20px;
                outline: 0;
                border: 0;
                font-size: 14px;
                margin-top: 10px;
            }
            pre {
                margin: 0;
                font-family: inherit;
                font-size: inherit;
                white-space: pre-wrap;
                word-break: initial;
            }
            .action {
                text-align: right;
                margin-top: 5px;
                .btn_send {
                    background-color: #fff;
                    color: #222;
                    padding-left: 30px;
                    padding-right: 30px;
                    &:hover {
                        background-color: rgba(200, 200, 200, 0.1);
                    }
                }
                .btn {
                    display: inline-block;
                    border: 1px solid #c1c1c1;
                    border-radius: 4px;
                    -moz-border-radius: 4px;
                    -webkit-border-radius: 4px;
                    padding: 3px 20px;
                    font-size: 14px;
                }
            }
        }
    }
    
    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    
    // end chat area
</style>
<script>
    import vueNiceScrollbar from './vue-nice-scrollbar.vue'

    export default {
        components: {
            vueNiceScrollbar
        },
        props: ['userInfo','currentContact', 'messageList'],
        data: function () {
            return {
                inputContent: '',
                msgList: []
            }
        },
        watch: {
            messageList: function () {
                this.msgList = this.messageList
                console.log(this.msgList)
                document.querySelector('#scroll_content').parentNode.scrollTop = document.querySelector(
                    '#scroll_content').parentNode.scrollHeight
                console.log(document.querySelector('#scroll_content').parentNode.scrollHeight)
            }
        },
        methods: {
            changeData: function (event) {
                this.inputContent = event.srcElement.innerHTML;
            },
            sendConfirm: function () {
                this.inputContent.trim() === '' ? alert('不能发送空白消息') : this.$emit('sendConfirm', this.inputContent)
                document.getElementById('edit_area').innerHTML = ''
                this.inputContent = ''
                console.log(this.msgList)
            }

        }
    }
</script>