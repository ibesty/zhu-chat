<template>
    <!-- begin panel -->
    <div class="panel">
        <!-- begin header -->
        <div class="header">
            <div class="avatar">
                <img class="img" :src="userInfo.userAvatar" @click="showProfile">
            </div>
            <div class="info">
                <h3 class="nickname">
                    <span class="display_name">{{userInfo.nickname}}</span>
                    <a class="opt">
                        <i class="web_wechat_add"></i>
                    </a>
                </h3>
            </div>
        </div>
        <!-- end header -->
        <!-- begin search -->
        <div class="search_bar">
            <i class="web_wechat_search"></i>
            <input v-model="searchWord" placeholder="搜索" type="text" class="frm_search">
        </div>
        <!-- end search -->
        <!-- begin tab -->
        <div class="tab">
        </div>
        <!-- end tab -->
        <!-- begin chat list -->
        <!-- use vue-nice-scrollbar to set a scrollbar for chat list -->
        <vue-nice-scrollbar classes="chat_list" theme="light" :speed=50>
            <div class="scroll_content">
                <div v-for="chatContact in this.noSelfContact" :class="{current_chat: chatContact.currentChat}" class="chat_item" @click="selectContact(chatContact)">
                    <div class="avatar">
                        <img :src="chatContact.userAvatar" class="img">
                    </div>
                    <div class="info">
                        <h3 class="nickname">
                            <span class="nickname_text">{{chatContact.nickname}}</span>
                        </h3>
                    </div>
                </div>
            </div>
        </vue-nice-scrollbar>
        <!-- end chat list -->
    </div>
    <!-- end panel -->
</template>
<style lang="sass">
/* begin panel */

.panel {
    position: relative;
    width: 280px;
    height: 100%;
    float: left;
    background: #2e3238;
    // begin header
    .header {
        padding: 18px;
        position: relative;
        .avatar {
            display: table-cell;
            vertical-align: middle;
            word-wrap: break-word;
            word-break: break-all;
            white-space: nowrap;
            padding-right: 10.625px;
            .img {
                width: 40px;
                height: 40px;
                border-radius: 2px;
                display: block;
                cursor: pointer;
            }
        }
        .info {
            display: table-cell;
            vertical-align: middle;
            word-wrap: break-word;
            word-break: break-all;
            width: 2000px;
            .nickname {
                .display_name {
                    display: inline-block;
                    font-weight: 400;
                    text-align: left;
                    width: 156px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-wrap: normal;
                    color: #fff;
                    font-size: 18px;
                    vertical-align: top;
                    line-height: 31px;
                    text-decoration: none;
                }
                .opt {
                    display: inline-block;
                    vertical-align: top;
                    .web_wechat_add {
                        background: url('../assets/img/sprite31e225.png') 0 -406px;
                        width: 30px;
                        height: 30px;
                        vertical-align: middle;
                        display: inline-block;
                    }
                }
            }
        }
    }
    // end header
    // begin search_bar
    .search_bar {
        position: relative;
        width: 244px;
        margin: 0 auto 6px;
        .web_wechat_search {
            background: url('../assets/img/sprite31e225.png') 0 -1946px;
            position: absolute;
            z-index: 101;
            top: 1px;
            width: 30px;
            height: 30px;
            vertical-align: middle;
            display: inline-block;
        }
        .frm_search {
            width: 214px;
            height: 32px;
            line-height: 32px;
            border: 0;
            border-radius: 2px;
            -moz-border-radius: 2px;
            -webkit-border-radius: 2px;
            background-color: #26292E;
            color: #fff;
            padding-left: 30px;
            font-size: 12px;
        }
    }
    // end search_bar
    // begin tab
    .tab {
        position: relative;
        overflow: hidden;
        height: 35px;
        padding-bottom: 4px;
        &:after {
            content: '';
            position: absolute;
            border-bottom: 1px solid #24272C;
            height: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
    // end tab
    // begin chat_list
    .chat_list {
        max-height: 604px;
        .current_chat {
            background-color: rgb(44, 62, 80);
        }
        .chat_item {
            overflow: hidden;
            padding: 12px 18px 11px;
            border-bottom: 1px solid #292C33;
            cursor: pointer;
            position: relative;
            .avatar {
                float: left;
                margin-right: 10px;
                position: relative;
                .img {
                    display: block;
                    width: 40px;
                    height: 40px;
                    border-radius: 2px;
                    -moz-border-radius: 2px;
                    -webkit-border-radius: 2px;
                }
            }
            .info {
                overflow: hidden;
                .nickname {
                    font-weight: 400;
                    font-size: 13px;
                    color: #FFF;
                    line-height: 20px;
                    .nickname_text {
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-wrap: normal;
                        text-align: left;
                    }
                }
            }
        }
    }
    // end chat_list
}


/* end panel */
</style>
<script>
import vueNiceScrollbar from '../components/vue-nice-scrollbar.vue'

export default {
    components: {
        vueNiceScrollbar
    },
    props: ['userList', 'userInfo'],
    data: function() {
        return {
            headerImgSrc: require('../assets/img/avatar.jpg'),
            searchWord: ''
        }
    },
    computed: {
        noSelfContact: function() { //去除自身的信息
            let temp = []
            for (let contact in this.userList) {
                if (contact != this.userInfo.userID) {
                    temp.push(this.userList[contact])
                }
            }
            return temp;
        }
    },
    methods: {
        showProfile: function() {
            //alert(this.userInfo.nickname)
            console.log(this.noSelfContact)
            console.log(typeof this.userInfo.userID)
        },
        selectContact: function(chatContact) {
            //alert(chatContact.nickname)
            console.log('当前聊天对象: ' + chatContact.nickname + ' ID: ' + chatContact.userID)
            for (var item in this.userList) {
                this.userList[item].currentChat = false
            }
            //                this.chatList.forEach(function (chatContact) {
            //                    chatContact.currentChat = false
            //                })
            chatContact.currentChat = true
            this.$emit('currentContactChange', chatContact)
        },
    },
}
</script>
