(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToByController', ToByController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToByController.$inject = ['ShoppingListCheckOffService'];
function ToByController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.warningMessage = "Everything is bought!";
  toBuyList.items = ShoppingListCheckOffService.getToBuyItens();

  toBuyList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.warningMessage = "Nothing bought yet";
  boughtList.items = ShoppingListCheckOffService.getBoughtItens();
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItens = [
    {name: "Carne", quantity: 10 },
    {name: "Arroz", quantity: 20 },
    {name: "Mandioca", quantity: 30 },
    {name: "Frango", quantity: 40 },
    {name: "Farofa", quantity: 50 },
  ];
  var boughtItens = [];

  service.addItem = function (itemName, quantity, arrayItens) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      arrayItens.push(item);
  };

  service.removeItem = function (itemIndex) {
    var item = toBuyItens[itemIndex];
    this.addItem(item.name, item.quantity, boughtItens);
    toBuyItens.splice(itemIndex, 1);
  };

  service.getToBuyItens = function () {
    return toBuyItens;
  };

  service.getBoughtItens = function () {
    return boughtItens;
  };
}

})();
