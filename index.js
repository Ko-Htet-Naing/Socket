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

let port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    console.log("Started on port " + port)
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
    })
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});