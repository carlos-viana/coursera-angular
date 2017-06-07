(function () {
'use strict';

angular.module('MenuApp')
.controller('MainCategoryListController', MainCategoryListController);

MainCategoryListController.$inject = ['MenuDataService', 'categoryList'];
function MainCategoryListController(MenuDataService, categoryList) {
  var mainlist = this;
  mainlist.categories = categoryList;
}

})();
