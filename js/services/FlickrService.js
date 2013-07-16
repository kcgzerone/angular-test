'use strict';

angular.module('flickrServices', ['ngResource']).factory('FlickrService', function($resource, $q) {
    
    var FLICKR_API_KEY = '84ad829261f6347dbfc4bf23fc1afdbd';
    var FLICKR_ITEMS_PER_PAGE = 48;
    
    return {
        findAllFlickrPhotos: function(keyword, page) {
            var deferred = $q.defer();
            var apiUrl = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + FLICKR_API_KEY + '&tags=' + keyword + '&format=json&nojsoncallback=1&per_page=' + FLICKR_ITEMS_PER_PAGE + '&page=:page';
            var resource = $resource(apiUrl, {'page': '@id'});
            resource.get({'page': page}, function (data) {
                deferred.resolve(data);
            }, function() {
                deferred.reject("An error occured while fetching items");
            });
            
            return deferred.promise;
        }
    };
});