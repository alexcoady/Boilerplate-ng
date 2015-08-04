angular.module("App")
.directive("appPostSummary", function () {

  return {
    restrict: "A",
    templateUrl: "templates/post-summary.html",
    scope: {
      "id": "=",
      "slug": "=",
      "caption": "=",
      "photos": "=",
      "type": "=",
      "tags": "="
    },
    controller: function ( $scope, ROUTES ) {

      $scope.ROUTES = ROUTES;
    }
  };
});
