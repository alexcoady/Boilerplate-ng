angular.module("App")
.directive("appNav", function () {

  return {
    restrict: "A",
    templateUrl: "templates/nav.html",
    controller: function ( $scope, ROUTES ) {

      $scope.ROUTES = ROUTES;
    }
  };
});
