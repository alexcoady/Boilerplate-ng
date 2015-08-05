angular.module("App", ["ngRoute", "ngResource", "ngAnimate"])
.constant("ROUTES", {
  TAGS: "tags/",
  POSTS: "posts/",
  ROOT: "/"
})
.filter("firstline", function () {

  return function ( input ) {

    if ( !input ) return "";
    return input.substring( 0, input.indexOf("\n") );
  };
});
