angular.module("App")
.directive("appNav", function ( $location ) {

  return {
    restrict: "A",
    templateUrl: "templates/nav.html",
    controller: function ( $scope, ROUTES ) {

      $scope.ROUTES = ROUTES;

      $scope.isActive = function ( url ) {

        return $location.url() === url;
      };
    }
  };
});
