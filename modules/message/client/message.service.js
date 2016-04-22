'use strict';

angular
    .module('message')
    .factory('MessageService', MessageService);

MessageService.$inject = ['$resource', '$q'];

function MessageService($resource, $q) {
  var service = {
    listMyChannels: listMyChannels,
    message: message,
    channel: channel,
    campaignChannel: campaignChannel,
    myChannelRef: myChannelRef
  };

  var channels;

  return service;

  function listMyChannels() {
    return $q(function(resolve, reject) {
      var ApiMyChannel = apiMyChannel();
      ApiMyChannel.query({}, function (response) {
        channels = response;
        resolve(channels);
      }, function (error) {
        console.log(error);
        reject(error);
      });
    });
  }

  function message () {
     return $resource('/api/message/:messageId', {messageId:'@Id'}, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }

  function channel () {
     return $resource('/api/channel/:channelId/message/:messageId', {channelId: '@channelId', messageId:'@Id'}, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }

  function campaignChannel () {
     return $resource('/api/campaign/:campaignId/channel/:channelId', {channelId: '@Id', campaignId:'@campaignId'}, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }

  function apiMyChannel () {
     return $resource('/api/my/channel', {}, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }

  function myChannelRef () {
     return $resource('/api/my/channel/ref/:id', {id: '@id'}, { 'update': {method:'PUT'}, 'query': {method:'GET', isArray:true} } );
  }
}
