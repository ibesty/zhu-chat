import Express from 'express'
import Http from 'http'
import Socket from 'socket.io'
import fs from 'fs'
import chatRobot from './module/chat-robot'

const app = Express()
const http = Http.Server(app)
const io = Socket(http)

var userList = {}

app.use(Express.static('img'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', socket => {
    console.log('a user connected')

    socket.broadcast.emit('user connect')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('login', userInfo => {
        userList[parseInt(userInfo.userID)] = userInfo
        userList[parseInt(userInfo.userID)].socketID = socket.id
        //console.log(userList[parseInt(userInfo.userID)])
        console.log(userInfo.nickname + '已经登陆, ID是: ' + userList[parseInt(userInfo.userID)].userID)
        console.log('当前在线的用户： ')
        for (var item in userList) {
            console.log('昵称: ' + userList[item].nickname + ' | ID: ' + userList[item].userID)
        }
        io.sockets.emit('login', {
            'userInfo': userInfo,
            'userList': userList
        })
    })

    socket.on('message', msgData => {
        console.log(msgData.sourceID + '对 ' + msgData.targetID + ' 说: ' + msgData.msgText)
        //console.log(userList[parseInt(msgData.targetID)].socketID)
        msgData.msgType = 2
        io.sockets.sockets[userList[parseInt(msgData.targetID)].socketID].emit('message', msgData)
        //io.sockets[userList[parseInt(msgData.targetID)].socketID].emit('message', msgData)
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000')
    chatRobot()
})
