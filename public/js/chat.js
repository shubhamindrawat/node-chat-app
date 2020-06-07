var socket = io();

function scrollToBottom(){
    var messages = $('#messages');
    var newMessage = messages.children('div:last-child');
    var newMessageHeight = newMessage.innerHeight();

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function(){
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log('No error');
        }
    });
});

socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format('Do MMM, YYYY  hh:mm:ss a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        time: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
    var ol = $('<ol></ol>');
    users.forEach((user) => {
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
});

socket.on('newEmail', function(email){
    console.log('New Email', email);
});

socket.on('newLocationMessage',  function(message){
    var formattedTime = moment(message.createdAt).format('Do MMM, YYYY  hh:mm:ss a')
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        time: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
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