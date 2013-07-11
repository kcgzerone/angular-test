function SearchFlickrController($scope, $http) {
    
    $scope.thumbSize = 'small';
    $scope.setThumbSize = function (size) { $scope.thumbSize = size; };
    
    $scope.photos = [];
    $scope.items = [];
    
    $scope.search = function() {
        $scope.photos = [];
        
        var apiUrl = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=84ad829261f6347dbfc4bf23fc1afdbd&tags=' + $scope.keyword + '&format=json&nojsoncallback=1';

        $http.defaults.useXDomain = true;
        delete $http.defaults.headers.common['X-Requested-With']; // Prevent to send OPTIONS request instead of GET request.

        //Calling Web API to fetch pics
        $http.get(apiUrl).success(function (data) {
            var parsedData = angular.fromJson(data);
            $scope.items = parsedData.photos.photo;

            for (var i = 0; i < $scope.items.length; i++) {
                var photo = $scope.items[i];
                $scope.photos.push({ title: photo.title, thumbUrl: ' http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg' });
            }
            
            $scope.keyword = '';
        }).error(function (error) {
            //Sending a friendly error message in case of failure
            //deferred.reject("An error occured while fetching items");
        });
    };
}