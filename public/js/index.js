var socket = io();
socket.on('connect', function(){
    console.log('Connected to server');
    
    socket.emit('createMessage', {
        from: 'shubham',
        text: 'Hello, how are you?'
    });
});

socket.on('newMessage', function(message){
    console.log('newMessage', message);
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newEmail', function(email){
    console.log('New Email', email);
});