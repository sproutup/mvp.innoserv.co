'use strict';

angular
  .module('slug')
  .factory('SlugService', SlugService);

SlugService.$inject = ['$http', '$q', '$state'];

function SlugService($http, $q, $state) {
  var model = {
    item: null
  };
  var service = {
    check: check,
    find: find,
    getCurrent: getItem
  };

  return service;

  function check(id) {
    return $http({
        method: 'POST',
        url: '/api/slug/check',
        data: {id: id},
        headers: {'Content-Type': 'application/json'}
      });
  }

  function find(id) {
    return $http({
       method: 'GET',
       url: '/api/slug/' + id,
       headers: {'Content-Type': 'application/json'}
     }).then(function(val){
       model.item = val.data.item;
       return val;
     });
  }

  function getItem() {
    return model.item;
  }
}
