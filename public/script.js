//console.log(io);
const socket = io('http://localhost:8000');
//just like on our server, our server has an:
// on method
// emit method

socket.on('welcome',(data)=>{
    console.log(data);
    //once welcome is emmitted from the server. we run this callback
    socket.emit('thankYou',[4,5,6]);
});

document.getElementById('messages-form').addEventListener('submit',(e)=>{
e.preventDefault();
const newMessage = document.getElementById('user-message').value;
document.getElementById('user-message').value='';
//this socket is sending an event to the server:
socket.emit('messageFromClientToServer',newMessage);
});

socket.on('messageToClient',newMessage=>{
    document.getElementById('messages').innerHTML +=`<li>${newMessage}</li>`
})