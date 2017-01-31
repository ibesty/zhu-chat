import Express from 'express'
import Http from 'http'
import Socket from 'socket.io'

const app = Express()
const http = Http.Server(app)
const io = Socket(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    console.log('a user connected');

    socket.broadcast.emit('user connect');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', msg => {
        console.log('message ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
