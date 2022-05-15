// Connect with socket
let socket = io.connect('localhost:3000')
let params = window.location.search;
let searchParams = new URLSearchParams(params);
const roomManager = document.querySelector('#room-manager');
const userManager = document.querySelector('#user-manager');

let username;
let roomType = searchParams.get('type');
searchParams.get('username') ? username = searchParams.get('username') : console.log("Input Something");

socket.emit('userdata', { username, roomType });

document.getElementById('message-form').addEventListener('submit', e => {
    e.preventDefault();
    let msgValue = e.target.elements.msg.value;
    if (!msgValue) alert('Input Something!!!');
    else {
        socket.emit('chatMessage', msgValue);
        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();
    }
})
// document.querySelector('#msg').addEventListener('focus', (event) => {
//     event.target.value = "";
// })
let output = (data) => {
    let chatMsg = document.querySelector('#chat-box-items');
    let div = document.createElement('div');
    if (data.msg == 'Chat Bot') {
        div.classList.add('welcome');
        div.innerHTML = `   <span> ${data.msg} ${data.time}</span>
                        <p> ${data.text} </p>`;
        chatMsg.appendChild(div);
    } else {
        div.classList.add('message');
        div.innerHTML = `   <span> ${data.msg} ${data.time}</span>
                        <p> ${data.text} </p>`;
        chatMsg.appendChild(div);
    }
}
socket.on('message', (data) => {
    output(data);
})
socket.on('chatMessage', (data) => {
    if (!data) {
        alert("Input Something!");
    }
    else {
        output(data);
    }
})
socket.on('roomUser', ({ room, user }) => {
    outputRoom(room);
    outputUsers(user);
})
const outputRoom = (room) => {
    roomManager.innerText = room;
}
const outputUsers = (user) => {
    userManager.innerHTML = `
    ${user.map(us => `<li> ${us.username}</li>`)}
    `;
}
document.querySelector("#leave").addEventListener('click', () => {
    const confirmMsg = confirm('Are you sure to leave');
    if (confirmMsg) {
        window.location = '../index.html';
    }
})
