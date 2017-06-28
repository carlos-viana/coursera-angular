(function() {
  'use strict';

angular.module('public')
.component('myInfo', {
  templateUrl: 'src/public/myinfo/myinfo.template.html',
  controller: 'MyInfoController',
  controllerAs: 'vm'
});

}());
