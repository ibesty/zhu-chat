import io from 'socket.io-client'
import axios from 'axios'

export default function chatRobot() {
	const socket = io.connect('http://127.0.0.1:3000')
	const api = 'http://www.tuling123.com/openapi/api'
	const apiKey = '286e02fba8834e7a967d2d747c1cfbd6'

	let userList = {}
	const robotInfo = {
		nickname: '美国队长',
		userID: '10000',
		userAvatar: 'http://192.168.1.2:3000/avatar.jpg',
		currentChat: false
	}

	function sendMessage({
		id,
		messageText
	}) {
		let msgData = {
			sourceID: '10000',
			targetID: id,
			msgText: messageText,
			msgType: 1
		}
		socket.emit('message', msgData)
		console.log('发送成功' + msgData.targetID)
	}

	socket.on('connect', () => {
		console.log('Robot 已启动')
		socket.emit('login', robotInfo)
	})

	socket.on('login', data => {
		userList = data.userList
		//console.log(data.userInfo.nickname + ' 登陆了')
	})

	socket.on('message', msgData => {
		//console.log('收到了 ' + msgData.sourceID + ' 发来的消息: ' + msgData.msgText)
		axios.post(api, {
			"key": apiKey,
			"info": msgData.msgText,
			"userid": msgData.sourceID.toString()
		}).then(response => {
			let res = response.data
			if (res.code === 100000) {
				sendMessage({
					id: parseInt(msgData.sourceID),
					messageText: res.text
				})
				//console.log('发送给: ' + msgData.sourceID + ' : ' + res.text)
			}
		}).catch(error => {
			console.log(error)
		})
	})
}