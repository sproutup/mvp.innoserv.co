'use strict';

angular
  .module('message')
  .directive('upMessageChannel', upMessageChannel);

function upMessageChannel() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'modules/message/client/message-channel.template.html',
    scope: {
      channel: '&channelId',
      refId: '&refId',
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
    scope.$watch(scope.vm.channel(), function(val, old) {
      console.log('channelId: ', scope.vm.channel());
      console.log('val: ', val);
      console.log('old: ', old);
      if(val) {
        console.log('channelId: ', scope.vm.channel());
      }
    });
    scope.$watch(scope.vm.refId(), function() {
      if(scope.vm.refId()) {
        console.log('refId: ', scope.vm.refId());
        scope.vm.loadByRef(scope.vm.refId());
      }
    });
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
        Socket.emit('chatMessage', item);
        // Clear the message text
        vm.body = '';
      }, function (errorResponse) {
        console.log(errorResponse);
        vm.error = errorResponse.data.message;
      });
    }

    function load(){
      console.log('load channel: ', vm.channelId);
      var ChannelMessage = MessageService.channel();
      ChannelMessage.query({channelId: vm.channelId}, function (response) {
        vm.messages = response;
        init();
        vm.empty = false;
      }, function (errorResponse) {
        console.log(errorResponse);
        vm.error = errorResponse.data.message;
      });
    }

    function loadByRef(refId){
      console.log('load by ref: ', refId);
      var myChannelRef = MessageService.myChannelRef();
      myChannelRef.get({refId: refId}, function (channel) {
        if(channel.id){
          vm.channelId = channel.id;
          load();
        }
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
