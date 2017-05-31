(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['$stateParams', 'MenuDataService', 'responseItems'];
function ItemsController($stateParams, MenuDataService, responseItems) {
  var itemsOfCategory = this;
  itemsOfCategory.items = responseItems.data.menu_items;
  itemsOfCategory.categoryShotName = $stateParams.shortName;
}

})();
