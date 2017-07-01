describe("SignupControllerTests", function() {

  beforeEach(module('public'));

  var $controller;
  var $q;
  var $rootScope;
  var signupController;
  var menuService;
  var signupService;
  var deferred;

  var l1Response = {
    'id':193,
    'short_name':'L1',
    'name':"Orange Chicken",
    "description":"chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra",
    "price_small":null,
    "price_large":9.75,
    "small_portion_name":null,
    "large_portion_name":null,
    "created_at":"2017-06-18T00:45:38.263Z",
    "updated_at":"2017-06-18T00:45:38.263Z",
    "category_short_name":"L",
    "image_present":true
  };

  beforeEach(function() {
    module('common')
    inject(function($injector) {
      menuService = $injector.get('MenuService');
      signupService = $injector.get('SignupService');
    });
  });

  beforeEach(inject(function ($injector) {
    $controller = $injector.get('$controller');
    $q = $injector.get('$q');
    $rootScope = $injector.get('$rootScope');

    deferred = $q.defer();

    // Using a Jasmine Spy to return the deferred promise.
    spyOn(menuService, 'getFavoriteMenuItems').and.returnValue(deferred.promise);

    // Define SignupController
    signupController =
    $controller('SignupController',
      {MenuService: menuService,
       SignupService: signupService});

  }));

  it("should change value of hasMenuItems to false", function() {
    signupController.user = {};
    signupController.user.menunumber = "abc";
    signupController.checkForMenuItems();

    deferred.reject();

    // Propagate promise resolution to then function using $apply
    $rootScope.$apply();
    expect(signupController.hasMenuItems).toBe(false);
  });

  it("should change value of hasMenuItems to true", function() {
    signupController.user = {};
    signupController.user.menunumber = "A1";
    signupController.checkForMenuItems();

    deferred.resolve();

    // Propagate promise resolution to then function using $apply
    $rootScope.$apply();
    expect(signupController.hasMenuItems).toBe(true);
  });

  it("should change value of hasMenuItems to null", function() {
    signupController.user = {};
    signupController.user.menunumber = undefined;
    signupController.checkForMenuItems();

    deferred.resolve();

    // Propagate promise resolution to then function using $apply
    $rootScope.$apply();
    expect(signupController.hasMenuItems).toBe(null);
  });

  it("should change value of menuitem to json data", function() {
    signupController.user = {};
    signupController.user.menunumber = "L1";
    signupController.checkForMenuItems();

    deferred.resolve(l1Response);

    // Propagate promise resolution to then function using $apply
    $rootScope.$apply();
    expect(signupController.menuitem).toEqual(l1Response);
  });

  it("should change value of dataWasSaved to true", function(){
    signupController.user = {};
    signupController.menuitem = l1Response;

    signupController.submit();
    expect(signupController.dataWasSaved).toBe(true);
  });

});
