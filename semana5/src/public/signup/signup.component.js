(function() {
  'use strict';

angular.module('public')
.component('signup',  {
  templateUrl: 'src/public/signup/signup.template.html',
  controller: 'SignupController',
  controllerAs: 'vm'
});

}());
