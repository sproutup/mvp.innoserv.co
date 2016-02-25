'use strict';

angular
  .module('message')
  .directive('upMessageChannel', upMessageChannel);

function upMessageChannel() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'modules/message/client/message-channel.template.html',
    scope: {
      channelId: '=',
      state: '@',
      params: '='
    },
    link: linkFunc,
    controller: MessageChannelController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;

  function linkFunc(scope, element, attr, ctrl) {
  }
}

MessageChannelController.$inject = ['$scope', 'Authentication', 'Socket', 'MessageService'];

function MessageChannelController($scope, Authentication, Socket, MessageService) {
    var vm = this;
    vm.commentToggle = commentToggle;
    vm.send = send;
    vm.load = load;
    vm.messages = [];
    init();

    function init() {
      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
      }

      // Add an event listener to the 'chatMessage' event
      Socket.on('chatMessage', function (message) {
        console.log('msg: ', message);
        message.inbound = (Authentication.user.id !== message.user.id);
        vm.messages.unshift(message);
      });

      // Remove the event listener when the controller instance is destroyed
      $scope.$on('$destroy', function () {
        console.log('destroy message channel');
        Socket.removeListener('chatMessage');
      });
    }

    // Create a controller method for sending messages
    function send() {
      // Create a new message object
      var message = {
        text: vm.body
      };

      var Message = MessageService.message();
      var item = new Message({
        body: vm.body,
        channelId: vm.channelId
      });

      item.$save(function (response) {
        // Emit a 'chatMessage' message event
        Socket.emit('chatMessage', message);
        // Clear the message text
        vm.body = '';
      }, function (errorResponse) {
        console.log(errorResponse);
        vm.error = errorResponse.data.message;
      });
    }

    function load(){
      var ChannelMessage = MessageService.channel();

      ChannelMessage.query({channelId: vm.channelId}, function (response) {
        vm.messages = response;
      }, function (errorResponse) {
        console.log(errorResponse);
        vm.error = errorResponse.data.message;
      });
    }

    function commentToggle() {
        if (!vm.content.commenting) {
            vm.content.commenting = true;
        } else {
            vm.content.commenting = false;
        }
    }
}
