const express = require("express");
const _http = require('http');
const _io = require('socket.io');

const app = express();
const http = _http.Server(app);
const io = _io(http);
let messages = [];

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('send message', function(msg) {
        if (msg.trim() !== '') {
            messages.push(msg);
            io.emit('receive message', msg);
        }
    });
    socket.emit('all messages', messages);
});


http.listen(3000, function() {
    console.log('listening on *:3000');
});
