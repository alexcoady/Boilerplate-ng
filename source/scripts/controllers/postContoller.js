angular.module("App")
.controller("PostController", ["Post", "$routeParams", "$scope", "$sce", "API", function ( Post, $routeParams, $scope, $sce, API ) {

  $scope.post = {};

  Post.get( $routeParams.id )
  .then(function (data) {
    if ( data.response.posts.length ) {
      $scope.post = data.response.posts[0];
      $scope.post.captionHTML = $sce.trustAsHtml( $scope.post.caption );
    }
  });
}]);
