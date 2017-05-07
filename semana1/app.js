(function() {
  'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchItens = "";
  $scope.outmsg = "";

  $scope.displayIfTooMuch = function () {
    if ($scope.lunchItens == "") {
      $scope.outmsg = "Please enter data first";
      return;
    }
    var nItens = calculateNumberOfNotEmptyItensForString($scope.lunchItens);
    if (nItens <= 3) {
      $scope.outmsg = "Enjoy!";
    }
    else {
      $scope.outmsg = "Too much!";
    }
  };

  // Calcula número de itens considerando os itens vazios.
  function calculateNumberOfNotEmptyItensForString(string) {
    var aStrings = string.split(',');
    var notEmptyItens = 0;
    for (var i = 0; i < aStrings.length; i++) {
      if (aStrings[i].trim() != "") {
        notEmptyItens += 1;
      }
    }
    return notEmptyItens;
  }

  // Calcula número de itens sem tratar os itens vazios.
  // function calculateNumberOfItensForString(string) {
  //   var aStrings = string.split(',');
  //   return aString.length;
  // }

}

}());
