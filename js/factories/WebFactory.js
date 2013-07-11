'use strict';

seoApp.factory('WebFactory', function($resource, $cacheFactory, $rootScope) {
    var cache = $cacheFactory('WebFactory');

    /*== private method ==*/
    function onGetWebRankings()
    {
        return $resource('v1/index.php/keywords/rankings');
    }
    function onGetAvgRanking()
    {
        return $resource('v1/index.php/keywords/avgrankings');
    }
    function onGetPagesPerVisit()
    {
        return $resource('v1/index.php/keywords/pagespervisit/');
    }
    function onGetAvgTimeOnSite()
    {
        return $resource('v1/index.php/keywords/avgtimeonsite/');
    }
    function onGetTopKeywordRankings()
    {
        return $resource('v1/index.php/keywords/toprankings/');
    }

    $rootScope.tmp_WebRankings = undefined;
    $rootScope.$watch('tmp_WebRankings', function(value)
    {
        if (value && value[0])
        {
            $rootScope.WebRankings = value[0].data;
        }
    }, true);

    $rootScope.tmp_AvgRanking = undefined;
    $rootScope.$watch('tmp_AvgRanking', function(value)
    {
        if (value && value[0])
        {
            $rootScope.AvgRanking = value[0].data;
        }
    }, true);

    $rootScope.tmp_PagesPerVisit = undefined;
    $rootScope.$watch('tmp_PagesPerVisit', function(value)
    {
        if (value && value[0])
        {
            $rootScope.PagesPerVisit = value[0].data;
        }
    }, true);

    $rootScope.tmp_AvgTimeOnSite = undefined;
    $rootScope.$watch('tmp_AvgTimeOnSite', function(value)
    {
        if (value && value[0])
        {
            $rootScope.AvgTimeOnSite = value[0].data;
        }
    }, true);

    $rootScope.tmp_TopKeywordRankings = undefined;
    $rootScope.$watch('tmp_TopKeywordRankings', function(value)
    {
        if(value && value[0])
        {
            $rootScope.branded_arr = new Array();
            $rootScope.notbranded_arr = new Array();
            $rootScope.notprovided_arr = new Array();
            $rootScope.headterms_arr = new Array();
            $rootScope.longtail_arr = new Array();

            for(var i = 0; i < value[0].data.TopKeywordRankings.length; i++)
            {
                for(var k = 0; k < value[0].data.TopKeywordRankings[i].TypeColl.length; k++)
                {
                    var type = value[0].data.TopKeywordRankings[i].TypeColl[k].toLowerCase();
                    if(type == "branded")
                        $rootScope.branded_arr.push(value[0].data.TopKeywordRankings[i]);
                    else if(type == "not-branded")
                        $rootScope.notbranded_arr.push(value[0].data.TopKeywordRankings[i]);
                    else if(type == "not provided")
                        $rootScope.notprovided_arr.push(value[0].data.TopKeywordRankings[i]);
                    else if(type == "head terms")
                        $rootScope.headterms_arr.push(value[0].data.TopKeywordRankings[i]);
                    else if(type == "long tail")
                        $rootScope.longtail_arr.push(value[0].data.TopKeywordRankings[i]);
                }
            }
        }
    }, true);

    /*== return data ==*/
    return {
        getWebRankingsInfo: function()
        {
            var rs = cache.get('WebRankings');
            if(!rs)
            {
                $rootScope.tmp_WebRankings = onGetWebRankings().query();
                cache.put('WebRankings', $rootScope.tmp_WebRankings);
            }
            return rs;
        },
        getAvgRankingInfo: function()
        {
            var rs = cache.get('AvgRanking');
            if(!rs)
            {
                $rootScope.tmp_AvgRanking = onGetAvgRanking().query();
                cache.put('AvgRanking', $rootScope.tmp_AvgRanking);
            }
            return rs;
        },
        getPagesPerVisitInfo: function()
        {
            var rs = cache.get('PagesPerVisit');
            if(!rs)
            {
                $rootScope.tmp_PagesPerVisit = onGetPagesPerVisit().query();
                cache.put('PagesPerVisit', $rootScope.tmp_PagesPerVisit);
            }
            return rs;
        },
        getAvgTimeOnSiteInfo: function()
        {
            var rs = cache.get('AvgTimeOnSite');
            if(!rs)
            {
                $rootScope.tmp_AvgTimeOnSite = onGetAvgTimeOnSite().query();
                cache.put('AvgTimeOnSite', $rootScope.tmp_AvgTimeOnSite);
            }
            return rs;
        },
        getTopKeywordRankings: function()
        {
            var rs = cache.get('TopKeywordRankings');
            if(!rs)
            {
                $rootScope.tmp_TopKeywordRankings = onGetTopKeywordRankings().query();
                cache.put('TopKeywordRankings', $rootScope.tmp_TopKeywordRankings);
            }
            return rs;
        }
    };
});
