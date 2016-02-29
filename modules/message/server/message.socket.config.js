'use strict';

// Create the chat configuration
module.exports = function (io, socket) {
  // Emit the status event when a new socket client is connected
  io.emit('chatMessage', {
    type: 'status',
    text: 'Is now connected',
    created: Date.now(),
    user: socket.request.user
  });

  socket.on('start', function(channel) {
    console.log('start channel', channel);
    socket.join(channel);
  });

  socket.on('join', function(channel) {
    console.log('joining channel', channel);
    socket.join(channel);
  });

  socket.on('leave', function(channel) {
    console.log('leaving channel', channel);
    socket.leave(channel);
  });

  // Send a chat messages to all connected sockets when a message is received
  socket.on('chatMessage', function (message) {
    console.log('message: ', message);
    message.type = 'message';
    message.created = Date.now();
    message.user = socket.request.user;

    // Emit the 'chatMessage' event
    io.emit('chatMessage', message);
  });

  // Send a chat messages to all connected sockets when a message is received
  socket.on('message', function (message) {
    console.log('message: ', message);
    message.type = 'message';
    message.created = Date.now();
    message.user = socket.request.user;

    // Emit the 'message' event to all sockets in channel
    io.sockets.in(message.channel).emit('message', message);
  });

  socket.on('send', function(message) {
    console.log('send: ', message);
    message.type = 'message';
    message.created = Date.now();
    message.user = socket.request.user;

    // Emit 'message' to the channel
    socket.to(message.channel).emit('message', message);
//    io.sockets.in(message.channel).emit('message', message);
  });

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    console.log('disconnect');
    io.emit('chatMessage', {
      type: 'status',
      text: 'disconnected',
      created: Date.now(),
      username: socket.request.user.username
    });
  });
};
