'use strict';

// Create the 'chat' controller
angular.module('message').controller('MessageController', ['$scope', 'MessageService', '$location', 'Authentication', 'Socket', '$state',
  function ($scope, messageService, $location, Authentication, Socket, $state) {
    var vm = this;

    // Create a messages array
    $scope.messages = [];
    vm.channels = [];

    // If user is not signed in then redirect back home
    if (!Authentication.user) {
      $location.path('/');
    }

    vm.getChannelId = function() {
      return $state.params.channelId;
    };

    vm.listMyChannels = function(){
      vm.channels = messageService.listMyChannels().then(function(res){
        vm.channels = res;
      }, function(err){
        console.log('err: ', err);
      });
    };

    // Make sure the Socket is connected
    if (!Socket.socket) {
      Socket.connect();
    }

    // Add an event listener to the 'chatMessage' event
    Socket.on('chatMessage', function (message) {
      $scope.messages.unshift(message);
    });

    // Create a controller method for sending messages
    $scope.sendMessage = function () {
      // Create a new message object
      var message = {
        text: this.messageText
      };

      // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', message);

      // Clear the message text
      this.messageText = '';
    };

    // Remove the event listener when the controller instance is destroyed
    $scope.$on('$destroy', function () {
      Socket.removeListener('chatMessage');
    });
  }
]);
