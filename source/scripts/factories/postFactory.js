angular.module("App")
.constant("API", {
  ROOT: "http://api.tumblr.com/v2/blog/coadycode.tumblr.com/",
  POSTS: "posts/",
  AUTH: "?api_key=7jkDyxXAcJrTe6zMnkFFY6QcCwN3JgqEZ2CvZxeVk1GOYSVg0H&callback=JSON_CALLBACK"
})
.factory("Post", [ "$http", "$q", "$cacheFactory", "API", function PostFactory ( $http, $q, $cacheFactory, API ) {

  var api = API.ROOT + API.POSTS + API.AUTH + "&filter=text";

  var tags = {};
  var posts = {};

  var cache = $cacheFactory("posts");

  return {
    all: function () {

      var deferred = $q.defer();
      var result;

      if ( cache.get("all") ) {
        deferred.resolve( cache.get("all") );
        return deferred.promise;
      }

      $http.jsonp(api).success(function (data) {
        deferred.resolve(data);
        cache.put("all", data);
      }).error(function (data, status) {
        deferred.reject("Error: request returned status:", status);
      });

      return deferred.promise;
    },

    tag: function ( tag ) {

      var deferred = $q.defer();

      if ( cache.get("tag-" + tag) ) {
        deferred.resolve( cache.get("tag-" + tag) );
        return deferred.promise;
      }

      $http.jsonp(api + "&tag=" + tag).success(function (data) {
        deferred.resolve(data);
        cache.put("tag-" + tag, data);
      }).error(function (data, status, headers, config) {
        deferred.reject("Error: request returned status:", status);
      });

      return deferred.promise;
    },

    get: function ( id ) {

      var deferred = $q.defer();

      if ( cache.get("post-" + id) ) {
        deferred.resolve( cache.get("post-" + id) );
        return deferred.promise;
      }

      $http.jsonp(api + "&id=" + id).success(function (data) {
        deferred.resolve(data);
        cache.put("post-" + id, data);
      }).error(function (data, status, headers, config) {
        deferred.reject("Error: request returned status:", status);
      });

      return deferred.promise;
    }
  };
}]);
