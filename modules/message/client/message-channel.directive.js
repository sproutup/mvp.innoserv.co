'use strict';

angular
  .module('message')
  .directive('upMessageChannel', upMessageChannel);

function upMessageChannel() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'modules/message/client/message-channel.template.html',
    scope: {
      channel: '<channel',
      start: '&onStart'
    },
    link: linkFunc,
    controller: MessageChannelController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;

  function linkFunc(scope, element, attr, ctrl) {
    init();

    scope.$watch(
      function(scope){
        return scope.vm.channel;
      },
      function(newVal, oldVal) {
        console.log('old channel: ', oldVal);
        console.log('new channel: ', newVal);
        if (oldVal !== newVal) {
          init();
        }
      }
    );

    function init(){
      if(scope.vm.channel) {
        scope.vm.load();
      }
    }
  }
}

MessageChannelController.$inject = ['$scope', 'Authentication', 'Socket', 'MessageService'];

function MessageChannelController($scope, Authentication, Socket, MessageService) {
    var vm = this;
    vm.empty = true;
    vm.commentToggle = commentToggle;
    vm.send = send;
    vm.load = load;
    vm.loadByRef = loadByRef;
    vm.messages = [];
    vm.me = Authentication.user;

    function init() {
      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();

      }
      // Add an event listener to the 'chatMessage' event
      Socket.on('chatMessage', function (message) {
        console.log('msg: ', message);
        message.inbound = (Authentication.user.id !== message.user.id);
        vm.messages.push(message);
      });

      // Add an event listener to the 'chatMessage' event
      Socket.on('message', function (message) {
        console.log('msg: ', message);
        vm.messages.push(message.item);
      });

      // Remove the event listener when the controller instance is destroyed
      $scope.$on('$destroy', function () {
        console.log('destroy message channel');
        leave(vm.channelId);
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
        channelId: vm.channel
      });

      item.$save(function (response) {
        // Emit a 'chatMessage' message event
        Socket.emit('message', {channel: vm.channel, item: item});
        // Clear the message text
        vm.body = '';
      }, function (errorResponse) {
        console.log(errorResponse);
        vm.error = errorResponse.data.message;
      });
    }

    function load(){
      console.log('load messages from channel: ', vm.channel);
      var ChannelMessage = MessageService.channel();
      ChannelMessage.query({channelId: vm.channel}, function (response) {
        vm.messages = response;
        join(vm.channel);
        init();
        vm.empty = false;
      }, function (errorResponse) {
        console.log(errorResponse);
        vm.error = errorResponse.data.message;
      });
    }

    function loadByRef(refId, userId){
      console.log('find channel by ref: ', refId);
      var myChannelRef = MessageService.myChannelRef();
      var item = new myChannelRef({
        userId: userId
      });
      // Use save to post a request. we are not really saving anything
      item.$save({refId: refId}, function (channel) {
        if(channel.id){
          vm.channelId = channel.id;
          // join the channel
          join(channel.id);
          // load the messages
          load();
        }
      }, function (errorResponse) {
        console.log(errorResponse);
        vm.error = errorResponse.data.message;
      });
    }

    function join(channel){
      if (Socket.socket) {
        console.log('join channel: ', channel);
        Socket.emit('join', channel);
      }
    }

    function leave(channel){
      if (Socket.socket) {
        console.log('leave channel: ', channel);
        Socket.emit('leave', channel);
      }
    }

    function commentToggle() {
        if (!vm.content.commenting) {
            vm.content.commenting = true;
        } else {
            vm.content.commenting = false;
        }
    }
}
