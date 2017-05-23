(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', MenuFoundItemsListDirective);

  function MenuFoundItemsListDirective() {
    var ddo = {
      templateUrl: 'foundItemsList.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: MenuFoundItemsListDirectiveController,
      controllerAs: 'dirCtrl',
      bindToController: true
    };

    return ddo;
  }

  function MenuFoundItemsListDirectiveController () {
    var menu = this;

    menu.itemIsNotInList = function () {
      if (menu.found != undefined && menu.found.length == 0) {
        return true;
      }
      return false;
    };
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.searchTerm = "";

    menu.searchByTerm = function(searchTerm) {
      if (searchTerm == "") {
        menu.found = [];
        return;
      }

      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

      promise.then(function (response) {
        menu.found = response;
      })
      .catch(function (error) {
        console.log("[AT CONTROLLER] error: ", error);
      })
    }; // end searchByTerm

    menu.removeItem = function(itemIndex) {
      menu.found.splice(itemIndex, 1);
      if (menu.found.length == 0) {
        menu.found = undefined;
        menu.searchTerm = "";
      }
    }; // end removeItem

  } // end controller

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
        })
        .then(function(result) {
          var objMenuItems = result.data;
          var aMenuItems = result.data.menu_items;
          var foundItems = [];
          for (var i = 0; i < aMenuItems.length; i++) {
            var menuItem = aMenuItems[i];
            var aDescrItens = menuItem.description.split(' ');
            for (var j = 0; j < aDescrItens.length; j++) {
              if (searchTerm.toLowerCase() == aDescrItens[j]) {
                foundItems.push(aMenuItems[i]);
                break;
              }
            } // para todos os termos da descricao
          } // para todos os itens do menu
          return foundItems;
        })
        .catch(function(error) {
          console.log("[AT SERVICE] erro: ", error);
        });
    };
  }

}());
