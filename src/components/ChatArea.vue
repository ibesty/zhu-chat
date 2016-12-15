<template>
    <div id="chat-area" class="chat">
        <div class="chat_header">
            <div class="title_wrap">
                <div class="title">
                    <a href="javascript:" class="title_name">{{nickname}}</a>
                </div>
            </div>
        </div>
        <div class="chat_body">
            <!-- Temporarily left blank -->
        </div>
        <div class="chat_footer">
            <div class="toolbar">
                <!-- Temporarily left blank -->
            </div>
            <div class="input_content">
                <pre id="edit_area" v-model="inputContent" class="edit_area" contenteditable="true"></pre>
            </div>
            <div class="action">
                <a href="javascript:" class="btn btn_send">发送</a>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
// begin chat area
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
        padding: 0 19px;
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

// end chat area
</style>
<script>
export default {
    data: () => {
        return {
            nickname: '朱朱'
        }
    }
}
</script>
