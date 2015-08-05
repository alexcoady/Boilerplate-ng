angular.module("App")
.controller("PostsController", [ "Post", "$routeParams", "$scope", "data", function ( Post, $routeParams, $scope, data) {

  $scope.posts = data.response.posts;

}]);
