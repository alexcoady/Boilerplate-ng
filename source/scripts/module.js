angular.module("App", ["ngRoute"])
.constant("ROUTES", {
  TAGS: "tags/",
  POSTS: "posts/",
  ROOT: "/"
})
.constant("API", {
  ROOT: "http://api.tumblr.com/v2/blog/coadycode.tumblr.com/",
  POSTS: "posts/",
  AUTH: "?api_key=7jkDyxXAcJrTe6zMnkFFY6QcCwN3JgqEZ2CvZxeVk1GOYSVg0H&callback=JSON_CALLBACK"
})
.config([ "$routeProvider", "$locationProvider", function ( $routeProvider, $locationProvider ) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when("/posts/:id", {
      templateUrl: "templates/post.html",
      controller: "PostController"
    })
    .when("/posts", {
      templateUrl: "templates/posts.html",
      controller: "PostsController"
    })
    .when("/tags/:tag", {
      templateUrl: "templates/posts.html",
      controller: "PostsController"
    })
    .otherwise({
      redirectTo: "/posts"
    });
}]);
