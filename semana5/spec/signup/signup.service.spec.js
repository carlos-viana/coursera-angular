describe("MenuServiceTests", function() {

  var menuservice;
  var $httpBackend;
  var ApiPath;

  beforeEach(function() {
    module('common');

    inject(function($injector) {
        menuservice = $injector.get('MenuService');
        $httpBackend = $injector.get('$httpBackend');
        ApiPath = $injector.get('ApiPath');
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should return categories list', function() {
    $httpBackend.whenGET(ApiPath + '/categories.json')
      .respond(['Lunch', 'Dessert']);
    menuservice.getCategories().then(function(data) {
      expect(data).toEqual(['Lunch', 'Dessert']);
    });
    $httpBackend.flush();
  });

  it('should return menu items for null category', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items.json')
      .respond(['Lunch', 'Dessert']);
    menuservice.getMenuItems(null).then(function(data) {
      expect(data).toEqual(['Lunch', 'Dessert']);
    });
    $httpBackend.flush();
  });

  it('should return menu items when Server Eror', function() {
    var result, error;

    $httpBackend.when('GET', ApiPath + '/menu_items.json')
      .respond(500);

    menuservice.getMenuItems(null).then(
      function(data) {
        result = data;
      },
      function(data) {
        error = data;
      }
    );

    $httpBackend.flush();

    expect(result).toBeUndefined();
    expect(error).toEqual(500);
  });

  it('should return menu items for specific menu item short name', function() {
    var shortName = "A1";
    var httpResponse = { menu_items: 'A1' };

    $httpBackend.when('GET', ApiPath + '/menu_items/'+shortName+ '.json')
      .respond(200, httpResponse);

    menuservice.getFavoriteMenuItems(shortName).then(function(data) {
      expect(data).toEqual(httpResponse);
    });

    $httpBackend.flush();
  });

  it('should return Error Message for specific menu item short name', function() {
    var shortName = "ABC";
    var result;
    var errorObj = {status: "500", error: "Internal Server Error"};
    var errorMsg = "network error:"+errorObj;

    $httpBackend.when('GET', ApiPath + '/menu_items/'+shortName+ '.json')
      .respond(500);

    menuservice.getFavoriteMenuItems(shortName).then(
      function(data) {
        result = data;
      },
      function(data) {
        error = data;
      }
    );

    $httpBackend.flush();

    expect(result).toBeUndefined();
    expect(error).toEqual(errorMsg);
  });

});
