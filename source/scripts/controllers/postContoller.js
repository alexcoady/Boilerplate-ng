angular.module("App")
.controller("PostController", ["$http", "$routeParams", "$scope", "$sce", "API", function ( $http, $routeParams, $scope, $sce, API ) {

  $scope.post = {};

  var apiUrl = API.ROOT + API.POSTS + API.AUTH + "&id=" + $routeParams.id;

  $http.jsonp( apiUrl )
  .success(function (data) {

    if ( data.response.posts.length ) {
      $scope.post = data.response.posts[0];
      $scope.post.captionHTML = $sce.trustAsHtml( $scope.post.caption );
    }
  });
}]);
