angular.module("App")
.controller("PostController", ["$scope", "$sce", "data", function ( $scope, $sce, data ) {

  $scope.post = data.response.posts[0];
  $scope.post.captionHTML = $sce.trustAsHtml( $scope.post.caption );
}]);
