(function () {
'use strict';

// Service definition
angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");

// Service injections
MenuDataService.$inject = ['$http','$q', 'ApiBasePath']
function MenuDataService($http, $q,  ApiBasePath) {
  var service = this;

  // Service methods
  // Get All Categories
  service.getAllCategories = function () {
    var deferred = $q.defer();

    var httpPromise = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });
    httpPromise.then(
      function (response) {
        deferred.resolve(response.data);
      },
      function (httpError) {
        deferred.reject(httpError.status + " : " + httpErro.data);
      }
    );

    return deferred.promise;
  };

  // Get items for specific category
  service.getItemsForCategory = function (categoryShortName) {
    var deferred = $q.defer();

    var httpPromise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: categoryShortName
      }
    });
    httpPromise.then(
      function (response) {
        deferred.resolve(response.data.menu_items);
      },
      function (httpError) {
        deferred.reject(httpError.status + " : " + httpErro.data);
      }
    );

    return deferred.promise;
  };
}

})();
