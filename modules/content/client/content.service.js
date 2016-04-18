'use strict';

angular
    .module('content')
    .factory('ContentService', ContentService);

ContentService.$inject = ['$resource'];

function ContentService($resource){
  var model = {
    content: {},
    post: {},
    selectedVideo: {},
    state: ''
  };

  var service = {
    model: model,
    content: content
  };
  return service;

  function content() {
    return $resource('/api/content/:id', {id:'@id'}, {update:{method:'PUT'}} );
  }
}