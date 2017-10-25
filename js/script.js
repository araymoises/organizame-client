(function(angular) {
  'use strict';

var logged = false;

angular.module('App', ['ngRoute'])

 .controller('MainController', function($window, $scope, $route, $routeParams, $location) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
 })

 .controller('HomeController', function($location, $window, $scope, $routeParams) {
     if (!logged) {
       $location.path('/login');
     }
 })

 .controller('HistoryController', function($location, $window, $scope, $routeParams, $http) {
     if (!logged) {
       $location.path('/login');
     }
     $http.get('http://localhost:7000/api/history')
      .success(function(data, status, headers, config) {
        $scope.documents = data;
      })
      .error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
     $scope.name = "History";
     $scope.params = $routeParams;
 })

 .controller('DetailsController', function($location, $window, $scope, $routeParams, $http) {
     if (!logged) {
       $location.path('/login');
     }
     $scope.params = $routeParams;
     $http.get('http://localhost:7000/api/history/' + $scope.params.documentId)
      .success(function(data, status, headers, config) {
        $scope.details = data;
        console.log(data);
        console.log('bien');
        console.log($scope.details.unidad_medida);
      })
      .error(function(data, status, headers, config) {
        console.log(data);
        console.log('mal');
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      $scope.name = "Details of document #" + $scope.params.documentId;
 })

 .controller('AddController', function($location, $window, $scope, $routeParams, $http) {
   if (!logged) {
     $location.path('/login');
   }
      $scope.params = $routeParams;
      $scope.detailsLength = [0];

      $scope.addDetailField = function() {
        $scope.detailsLength.push($scope.detailsLength.length);
        //var newDetails = $scope.choices.length + 1;
        //$scope.choices.push({'id':'choice' + newDetails});
      };
      $scope.addDocument = function() {
        $scope.document.fecha = $scope.document.fecha.toString();
        var details = new Array();
        for (var i = 0; i < $scope.document.details.length; i++) {
          details.push($scope.document.details[i]);
        }
        console.log('Sin modificar');
        console.log($scope.document.details);
        //$scope.document.details = details;
//        $scope.document.details.push($scope.document.details[0]);
        console.log('$scope.document');
        console.log($scope.document);
        console.log('details');
        console.log(details);
        $http.post('http://localhost:7000/api/history/', $scope.document)
          .success(function(data, status, headers, config) {
            console.log(data);
            console.log('bien');
          })
          .error(function(data, status, headers, config) {
            console.log(data);
            console.log('mal');
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        //var newDetails = $scope.choices.length + 1;
        //$scope.choices.push({'id':'choice' + newDetails});
      };
      $scope.name = "Details of document #";
 })

 .controller('EditController', function($window, $scope, $routeParams, $http) {

 })

 .controller('DeleteController', function($window, $scope, $routeParams, $http) {

 })

 .controller('LoginController', function($location, $window, $scope, $routeParams, $http) {
     $scope.params = $routeParams;
     $scope.login = function() {
       if($scope.username == 'admin' && $scope.password == 'admin'){
         logged = true;
         $location.path('/');
       }
       //var newDetails = $scope.choices.length + 1;
       //$scope.choices.push({'id':'choice' + newDetails});
     };
 })

 .controller('PdfController', function($location, $window, $scope, $routeParams, $http) {
     if (!logged) {
       $location.path('/login');
     }
     $scope.params = $routeParams;
     $window.open('http://localhost:7000/pdf/'+$scope.params.documentId, '_blank');
 })
 .controller('LogoutController', function($location, $window, $scope, $routeParams, $http) {
     logged = false;
     $location.path('/');
 })

.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'components/home.html',
    controller: 'HomeController'
  })
  .when('/history', {
    templateUrl: 'components/history.html',
    controller: 'HistoryController'
  })
  .when('/history/:documentId', {
    templateUrl: 'components/details.html',
    controller: 'DetailsController'
  })
  .when('/history/:documentId/pdf', {
    templateUrl: 'components/home.html',
    controller: 'PdfController'
  })
  .when('/options/add', {
    templateUrl: 'components/options/add.html',
    controller: 'AddController'
  })
  .when('/options/edit', {
    templateUrl: 'components/options/edit.html',
    controller: 'EditController'
  })
  .when('/options/delete', {
    templateUrl: 'components/options/delete.html',
    controller: 'DeleteController'
  })
  .when('/login', {
    templateUrl: 'components/login.html',
    controller: 'LoginController'
  })
  .when('/logout', {
    templateUrl: 'components/home.html',
    controller: 'LogoutController'
  })
  .otherwise({
    redirectTo: '/'
  });;

  $locationProvider.html5Mode(true);
});
})(window.angular);
