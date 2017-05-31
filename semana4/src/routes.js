(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menu/templates/home.template.html'
  })

  // Category list page
  .state('categoryList', {
    url: '/categories',
    templateUrl: 'src/menu/templates/main-categorylist.template.html',
    controller: 'MainCategoryListController as categoryListCtrl',
    resolve: {
      response: ['MenuDataService', function (MenuDataService) {
        var respServ = MenuDataService.getAllCategories();
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('itemsList', {
    url: '/items/{shortName}',
    templateUrl: 'src/menu/templates/main-itemlist.template.html',
    controller: 'ItemsController as itemsListCtrl',
    resolve: {
      responseItems: ['$stateParams', 'MenuDataService',
        function ($stateParams, MenuDataService) {
          var respServ = MenuDataService.getItemsForCategory($stateParams.shortName);
          return MenuDataService.getItemsForCategory($stateParams.shortName);
        }
      ]
    }
  });

}

})();
