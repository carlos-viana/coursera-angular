(function () {
'use strict';

// Module declaration
angular.module('Data', []);

// Module getter
angular.module('Data')
.config(function () {
  console.log("Data config fired.");
}).
run(function () {
  console.log("Data run fired.");
});

})();
