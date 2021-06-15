const socket= io();
const message = document.getElementById("message");
const handle = document.getElementById("handle");
const output = document.getElementById("output");
const button = document.getElementById("button");
const typing = document.getElementById("typing");


    //send typing message
    message.addEventListener('keypress',()=>{
        socket.emit("userTyping",handle.value)
    })

    //send messages to clients
      button.addEventListener("click",function(event){
          event.preventDefault();
          socket.emit("userMessage", {
              handle: handle.value,
              message: message.value
          });
          document.getElementById('message'.value="")
          message.value='';
      });


      //listen for events from server
      socket.on('userMessage',(data)=>{ 
          typing.innerHTML=""
           output.innerHTML += '<p><strong>' + data.handle + ': </strong>'+ data.message +'</p>'
        })

      socket.on('userTyping',(data)=>{
        typing.innerHTML ='<p><em>'+ data + ' is typing...</em></p>'
      })