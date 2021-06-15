const express= require('express');
const app= express();
const http =require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

http.listen(PORT, ()=>{
    console.log("listening on port "+ PORT)
});
app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})
app.use(express.static('public'))


io.on('connection', function(socket){
    console.log("client is connected " + socket.id)
    socket.on("userMessage",function(data){
        io.sockets.emit("userMessage", data);
    });
    socket.on("userTyping",function(data){
        socket.broadcast.emit("userTyping", data);
    });
});

