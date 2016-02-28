'use strict';

angular
  .module('message')
  .directive('upMessageChannel', upMessageChannel);

function upMessageChannel() {
  var directive = {
    restrict: 'EA',
    templateUrl: 'modules/message/client/message-channel.template.html',
    scope: {
      channelId: '<channelId',
      refId: '<refId',
      userId: '<userId'
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
        return scope.vm.refId;
      },
      function(newVal, oldVal) {
        console.log('new refId: ', oldVal);
        console.log('old refId: ', newVal);
        if (oldVal !== newVal) {
          init();
        }
      }
    );

    scope.$watch(
      function(scope){
        return scope.vm.userId;
      },
      function(newVal, oldVal) {
        console.log('new userId: ', oldVal);
        console.log('old userId: ', newVal);
        if (oldVal !== newVal) {
          init();
        }
      }
    );

    function init(){
      if(scope.vm.refId && scope.vm.userId) {
        console.log('refId: ', scope.vm.refId);
        console.log('userId: ', scope.vm.userId);
        scope.vm.loadByRef(scope.vm.refId, scope.vm.userId);
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

        // Add an event listener to the 'chatMessage' event
        Socket.on('chatMessage', function (message) {
          console.log('msg: ', message);
          message.inbound = (Authentication.user.id !== message.user.id);
          vm.messages.push(message);
        });

        // Remove the event listener when the controller instance is destroyed
        $scope.$on('$destroy', function () {
          console.log('destroy message channel');
          Socket.removeListener('chatMessage');
        });
      }
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

    function loadByRef(refId, userId){
      console.log('load by ref: ', refId);
      var myChannelRef = MessageService.myChannelRef();
      var item = new myChannelRef({
        userId: userId
      });
      item.$save({refId: refId}, function (channel) {
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
