(function() {
  "use strict";

  angular.module('common')
    .service('MenuService', MenuService);

  MenuService.$inject = ['$http', '$q','ApiPath'];
  function MenuService($http, $q, ApiPath) {
    var service = this;

    service.getCategories = function() {
      return $http.get(ApiPath + '/categories.json').then(function(response) {
        return response.data;
      });
    };

    service.getMenuItems = function(category) {
      var config = {};
      if (category) {
        config.params = {
          'category': category
        };
      }
      var deferred = $q.defer();

      $http.get(ApiPath + '/menu_items.json', config)
        .then(
          function(response) {
            deferred.resolve(response.data);
          },
          function(error) {
            deferred.reject(error.status);
          });

      return deferred.promise;
    }// end getMenuItems

    service.getFavoriteMenuItems = function(shortName) {
      var deferred = $q.defer();

      $http.get(ApiPath + '/menu_items/' + shortName + '.json')
        .then(
          function sucessCall(response) {
            deferred.resolve(response.data);
          },
          function errorCall(error) {
            deferred.reject("network error:"+error);
          });

      return deferred.promise;
    } // end getMatchedMenuItems

  } // end MenuService



})();
