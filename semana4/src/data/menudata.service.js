(function () {
'use strict';

// Service definition
angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");

// Service injections
MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  // Service methods
  // Get All Categories
  service.getAllCategories = function () {
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });

    return promise;
  };

  // Get items for specific category
  service.getItemsForCategory = function (categoryShortName) {
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: categoryShortName
      }
    });

    return promise;
  };
}

})();
