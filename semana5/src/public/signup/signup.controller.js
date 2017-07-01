(function() {

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService', 'SignupService']
function SignupController(MenuService, SignupService) {
  var vm = this;

  vm.$onInit = function() {
    vm.hasMenuItems = null;
    vm.dataWasSaved = false;
    vm.menuitem = null;
    vm.menunumber = null;
  }

  vm.checkForMenuItems = function() {
    if (vm.user.menunumber) {
      var promise = MenuService.getFavoriteMenuItems(vm.user.menunumber);
      promise.then(function (data) {
        vm.hasMenuItems = true;
        vm.menuitem = data;
      })
      .catch(function (error) {
        vm.hasMenuItems = false;
      });
    }
    else {
      vm.hasMenuItems = null;
    }
  }

  vm.submit = function () {
    SignupService.save(vm.user, vm.menuitem);
    vm.dataWasSaved = true;
  }; // end submit button function

} // end controller

}());
