'use strict';

angular
    .module('message')
    .factory('MessageService', MessageService);

MessageService.$inject = ['$resource'];

function MessageService($resource) {
  var service = {
    message: message,
    channel: channel,
    campaignChannel: campaignChannel,
    myChannelRef: myChannelRef
  };

  return service;

  function message () {
     return $resource('/api/message/:messageId', {messageId:'@Id'}, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }

  function channel () {
     return $resource('/api/channel/:channelId/message/:messageId', {channelId: '@channelId', messageId:'@Id'}, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }

  function campaignChannel () {
     return $resource('/api/campaign/:campaignId/channel/:channelId', {channelId: '@Id', campaignId:'@campaignId'}, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }

  function myChannelRef () {
     return $resource('/api/my/channel/ref/:refId', {refId: '@refId'}, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }
}
