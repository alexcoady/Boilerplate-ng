angular.module("App", ["ngRoute", "ngResource", "ngAnimate"])
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
.filter("firstline", function () {

  return function ( input ) {

    if ( !input ) return "";
    return input.substring( 0, input.indexOf("\n") );
  };
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
      controller: "PostsController",
      resolve: {
        posts: function ( Post ) {
          console.log(Post);
          return Post.all();
        }
      }
    })
    .when("/tags/:tag", {
      templateUrl: "templates/posts.html",
      controller: "PostsController"
    })
    .otherwise({
      redirectTo: "/posts"
    });
}]);
