/**
 * angular-duoshuo 0.1.0
 * http://github.com/ricterz/angular-duoshuo
 *
 * Licensed under the MIT license
 */

(function (angular, window) {
    'use strict';

    var duoshuoModule = angular.module('ngDuoshuo', []);

    duoshuoModule.provider('$duoshuo', function(){
        /*function addScriptTag() {
            var container = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0],
                script = document.createElement('script');

            script.type = 'text/javascript';
            script.async = true;
            script.src = 'http://static.duoshuo.com/embed.js';
            script.charset = 'UTF-8';
            container.appendChild(script);
        }*/

        function reSetCommit(id, url) {
            var el = document.createElement('div'),
                ds = document.getElementById('ds-thread');
            el.setAttribute('data-thread-key', id);
            el.setAttribute('data-url', url);
            DUOSHUO.EmbedThread(el);
            ds.appendChild(el);
        }

        this.$get = ['$location', function($location) {
            function commit(id) {
                reSetCommit(id, $location.absUrl());
                /*if (!angular.isDefined(window.DUOSHUO)) {
                    addScriptTag($location);
                } else {
                    reSetCommit(id, $location.absUrl());
                }*/
            }

            return {
                commit: commit
            }
        }];



    });

    duoshuoModule.directive('duoshuo', ['$duoshuo', function($duoshuo) {
        return {
            restrict: 'AC',
            replace: true,
            scope: {
                id: '=duoshuo'
            },
            template: '<div id="ds-thread"></div>',
            link: function link(scope) {
                scope.$watch('id', function(id) {
                    if (angular.isDefined(id)) {
                        $duoshuo.commit(id);
                    }
                })
            }
        }
    }]);


})(angular, window);


