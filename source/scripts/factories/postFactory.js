angular.module("App")
.factory("Post", [ "$http", "$q","API", function PostFactory ( $http, $q, API ) {

  var api = API.ROOT + API.POSTS + API.AUTH + "&filter=text";

  var all;
  var tags = {};
  var posts = {};

  return {
    all: function () {

      var deferred = $q.defer();

      if ( all ) {
        deferred.resolve( all );
        return deferred.promise;
      }

      $http.jsonp(api).success(function (data) {
        deferred.resolve(data);
        all = data;
      }).error(function (data, status, headers, config) {
        deferred.reject("Error: request returned status:", status);
      });

      return deferred.promise;
    },

    tag: function ( tag ) {

      var deferred = $q.defer();

      if ( tags[tag] ) {
        deferred.resolve( tags[tag] );
        return deferred.promise;
      }

      $http.jsonp(api + "&tag=" + tag).success(function (data) {
        deferred.resolve(data);
        tags[tag] = data;
      }).error(function (data, status, headers, config) {
        deferred.reject("Error: request returned status:", status);
      });

      return deferred.promise;
    },

    get: function ( id ) {

      var deferred = $q.defer();

      if ( posts[id] ) {
        deferred.resolve( posts[id] );
        return deferred.promise;
      }

      $http.jsonp(api + "&id=" + id).success(function (data) {
        deferred.resolve(data);
        posts[id] = data;
      }).error(function (data, status, headers, config) {
        deferred.reject("Error: request returned status:", status);
      });

      return deferred.promise;
    }
  };
}]);
