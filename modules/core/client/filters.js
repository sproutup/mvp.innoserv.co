/* jshint ignore:start */
'use strict';

angular.module('core').
  filter('fromNow', function() {
    return function(dateString) {
      return moment(dateString).fromNow();
    };
  });

angular.module('core').filter('urlify', function() {
    return function(text) {
        var urlRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
        if (text) {
            return text.replace(urlRegex, function(url) {
                var displayedUrl;
                if (url.length > 40) {
                    displayedUrl = url.substring(0, 40);
                    displayedUrl += '...';
                } else {
                    displayedUrl = url;
                }

                var index = url.indexOf('www');
                if (index === 0) {
                    url = 'http://' + url;
                }

                return '<a href="' + url + '" target="_blank">' + displayedUrl + '</a>';
            });
        }
    }
});

angular.module('core').filter('humanizeNumber', [
    function () {
        return function (n) {
            var num = parseInt(n, 10);
            if (isNaN(num)) {
                return n;
            }

            var si = [
            { value: 1E18, symbol: 'E' },
            { value: 1E15, symbol: 'P' },
            { value: 1E12, symbol: 'T' },
            { value: 1E9,  symbol: 'G' },
            { value: 1E6,  symbol: 'M' },
            { value: 1E3,  symbol: 'k' }
            ], i;
            for (i = 0; i < si.length; i++) {
              if (num >= si[i].value) {
                return (num / si[i].value).toFixed(1).replace(/\.?0+$/, '') + si[i].symbol;
              }
            }
            return num;
        };
    }
]);