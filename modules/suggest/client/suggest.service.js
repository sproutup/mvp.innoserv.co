'use strict';

angular
    .module('suggest')
    .factory('SuggestService', SuggestService);

SuggestService.$inject = ['$resource'];

function SuggestService($resource){
  var service = {
    suggest: suggest
  };
  return service;

  function suggest() {
    return $resource('/api/suggest/:id', {id:'@id'}, {update:{method:'PUT'}} );
  }
}