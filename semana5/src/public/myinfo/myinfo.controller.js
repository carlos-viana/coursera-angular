(function() {
  'use strict';

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['SignupService']
function MyInfoController(SignupService) {
  var vm = this;
  vm.user = SignupService.user;
  vm.menuitem = SignupService.menuitem;
}

}());
