const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});
io.on('connection', (socket) => {
    console.log('A user Connected' + socket.id)
    socket.on('disconnect', () => {
        console.log('User disconnected' + socket.id)
    })
    socket.on('Chat meassage', (msg) => {
        io.sockets.emit('Chat message', msg);
    })
    socket.on('sender', function (data) {
        socket.broadcast.emit('sender', data);
        console.log("Event exist")
    })
})

server.listen(3000, () => {
    console.log('Listening on *:3000')
});