(function() {
  'use strict';

  angular.module('common')
    .service('SignupService', SignupService);

  SignupService.$inject = [];
  function SignupService() {
    var ss = this;
    // ss.user = null;
    ss.save = function (user, menuitem) {
      ss.user = user;
      ss.menuitem = menuitem;
    }
  }

}());
