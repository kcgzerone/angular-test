'use strict';

angular.module('flickrService', []).factory('FlickrService', function($resource) {            
    $resource.defaults.useXDomain = true;
    delete $resource.defaults.headers.common['X-Requested-With']; // Prevent to send OPTIONS request instead of GET request.

    return {
        findAllFlickrPhotos: function(keyword, $q) {
            var deferred = $q.defer();
            var apiUrl = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + FLICKR_API_KEY + '&tags=' + keyword + '&format=json&nojsoncallback=1';
            
            $resource.get(apiUrl).success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject("An error occured while fetching items");
            });
            
            return deferred.promise;
        }
    };
});
