const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
let formatMessage = require('./utlis/formatMessage');
let { userJoin, currentUser, userLeave, roomUser } = require('./utlis/users.js');
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
const name = "Chat Bot";
// Defining root route
// app.get('/', (req, rep) => {
//     rep.send('Root route');
// })
// set static folder 
app.use(express.static(path.join(__dirname, '/public')));


let port = process.env.PORT || 3000;
io.on('connection', (socket) => {
    socket.on('userdata', ({ username, roomType }) => {
        let user = userJoin(socket.id, username, roomType);
        socket.join(user.room);
        socket.emit('message', formatMessage(name, 'Welcome from chat room'));
        socket.broadcast.to(user.room).emit('message', formatMessage(name, `${user.username} Joined the chat`));
        io.to(user.room).emit('roomUser', {
            room: user.room,
            user: roomUser(user.room)
        })
    })
    socket.on('chatMessage', function (data) {
        let selectUser = currentUser(socket.id);
        io.to(selectUser.room).emit('chatMessage', formatMessage(`${selectUser.username}`, data));
    })
    socket.on('disconnect', () => {
        let user1 = userLeave(socket.id);
        if (user1) {
            io.to(user1.room).emit('message', formatMessage(name, `${user1.username} Disconnected`));
        }
    })
})


server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});