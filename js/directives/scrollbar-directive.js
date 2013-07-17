'use strict';

angular.module('scrollbarDirective', []).directive('scrollbar', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            var default_sc_attrs = {
                advanced: {
                    updateOnContentResize: true
                },
                scrollButtons: {
                    enable:true
                }
            };
            
            var sc_attrs = scope.$eval(attrs.scrollbar);
            
            for (var param1 in default_sc_attrs) {
                if (sc_attrs[param1])
                    continue;
                
                if (typeof default_sc_attrs[param1] == 'Object')
                    for (var param2 in default_sc_attrs[param1]) {
                        if (sc_attrs[param1][param2])
                            continue;
                    }
                else
                    sc_attrs[param1] = default_sc_attrs[param1];
            }
            
            if (sc_attrs.set_height) {
                elem.css('max-height', sc_attrs.set_height + 'px');
                sc_attrs.set_height = false;
            }
            
            elem.mCustomScrollbar(sc_attrs);
            elem.after($('<div>').addClass('mCSB-loading-indicator'));
        }
    };
});