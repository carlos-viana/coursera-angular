(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['$stateParams', 'MenuDataService', 'categoryItemsList'];
function ItemsController($stateParams, MenuDataService, categoryItemsList) {
  var itemsOfCategory = this;
  itemsOfCategory.items = categoryItemsList;
}

})();
