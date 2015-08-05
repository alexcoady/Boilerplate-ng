angular.module("App")
.controller("PostsController", [ "Post", "$routeParams", "$scope", function ( Post, $routeParams, $scope) {

  var promise;

  $scope.posts = [];

  if ( $routeParams.tag ) promise = Post.tag( $routeParams.tag );

  if ( !promise ) promise = Post.all();

  promise.then(function (data) {
    $scope.posts = data.response.posts;
  });

}]);
