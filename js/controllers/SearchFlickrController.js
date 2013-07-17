function SearchFlickrController($scope, $http, FlickrService) {
    
    $scope.thumbSize = 'small';
    
    $scope.photos = [];
    $scope.items = [];
    $scope.totalPage = 0;
    $scope.curPage = 1;
    
    $scope.search = function(fromEvent) {
        
        if ($scope.totalPage == 0 || typeof fromEvent == 'undefined') { // when searching first.
            $scope.photos = [];
            $scope.totalPage = 0;
            $scope.curPage = 1;
        }
        
        $('.mCSB-loading-indicator').css('visibility', 'visible');
        
        FlickrService.findAllFlickrPhotos($scope.keyword, $scope.curPage).then(function (data) {
            
            $('.mCSB-loading-indicator').css('visibility', 'hidden');
            
            $scope.totalPage = data.photos.pages;
            $scope.curPage = data.photos.page;
            
            $scope.items = data.photos.photo;

            for (var i = 0; i < $scope.items.length; i++) {
                var photo = $scope.items[i];
                $scope.photos.push({ title: photo.title, thumbUrl: ' http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg' });
            }
        },
        function (errorMessage) {
            $scope.error = errorMessage;
        });
    };
    
    $scope.nextPage = function() {
        var nextPage = $scope.curPage + 1;
        if (nextPage > $scope.totalPage)
            return;
        
        $scope.curPage = nextPage;
        $scope.$apply("search(false)");
    }
}