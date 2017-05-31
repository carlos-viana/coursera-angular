(function () {
'use strict';

angular.module('MenuApp')
.controller('MainCategoryListController', MainCategoryListController);


MainCategoryListController.$inject = ['MenuDataService', 'response'];
function MainCategoryListController(MenuDataService, response) {
  var mainlist = this;
  mainlist.items = response.data;
}

})();
