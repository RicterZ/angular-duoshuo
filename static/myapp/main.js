/**
 * Created by Ricter on 14-3-14.
 */

window.duoshuoQuery = {
    short_name: "angular-hentai"
};

var demo = angular.module('demo', ['ngRoute', 'ngDuoshuo']);

function demoRouteConfig($routeProvider) {
    $routeProvider.
        when('/page/:id', {
            controller: DetailController,
            templateUrl: '/static/myapp/templates/detail.html'
        }).
        otherwise({
            redirectTo: '/'
        })
}


function DetailController($scope, $routeParams) {
    $scope.id = $routeParams.id;
}


demo.config(demoRouteConfig);
