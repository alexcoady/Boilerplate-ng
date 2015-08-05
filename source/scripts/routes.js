angular.module("App")
.config([ "$routeProvider", "$locationProvider", function ( $routeProvider, $locationProvider ) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when("/posts/:id", {
      templateUrl: "templates/post.html",
      controller: "PostController",
      resolve: {
        data: [ "$route", "Post", function ( $route, Post ) {
          return Post.get( $route.current.params.id );
        }]
      }
    })
    .when("/posts", {
      templateUrl: "templates/posts.html",
      controller: "PostsController",
      resolve: {
        data: ["Post", function ( Post ) {
          return Post.all();
        }]
      }
    })
    .when("/tags/:tag", {
      templateUrl: "templates/posts.html",
      controller: "PostsController",
      resolve: {
        data: [ "$route", "Post", function ( $route, Post ) {
          return Post.tag( $route.current.params.tag );
        }]
      }
    })
    .otherwise({
      templateUrl: "templates/posts.html",
      controller: "PostsController",
      resolve: {
        data: [ "Post", function ( Post ) {
          return Post.all();
        }]
      }
    });
}]);
