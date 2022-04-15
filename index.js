const express = require('express')

// App Setup 
const app = express();

// Server Setup
const server = app.listen(3000, () => {
    console.log('Server started successfully at port 4000')
})

// Route Setup
app.get('/', (req, rep) => {
    rep.sendFile(__dirname + '/public/index.html');
})