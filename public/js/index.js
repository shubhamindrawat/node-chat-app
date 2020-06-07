var socket = io();
socket.on('connect', function(){
    console.log('Connected to server');
});

socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format('Do MMM, YYYY  hh:mm:ss a');
    var li = $('<div></div>');
    li.text(`(${formattedTime}) ${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newEmail', function(email){
    console.log('New Email', email);
});

socket.on('newLocationMessage',  function(message){
    var formattedTime = moment(message.createdAt).format('Do MMM, YYYY  hh:mm:ss a')
    var li = $('<div></div>');
    var a = $('<a target="_BLANK">My Current Location</a>');
    li.text(`(${formattedTime}) ${message.from}: `);
    a.attr('href', message.url)
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function(e){
    var messageTextbox = $('[name=message]');
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function(){
        messageTextbox.val('');
    });
});

var locationButton = $('#sendLocation');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch your location');
    });
});