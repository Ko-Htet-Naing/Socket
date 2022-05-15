let users = [];

function userJoin(id, username, room) {
    let user = { id, username, room };
    users.push(user);

    return user;
}
function currentUser(id) {
    let selectUser = users.find(user => user.id === id);
    return selectUser;
}
function userLeave(id) {
    let index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}
// Get room user 
function roomUser(room) {
    return users.filter(user => user.room === room);
}
module.exports = {
    userJoin,
    currentUser,
    userLeave,
    roomUser
}