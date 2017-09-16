angular.module('myAngularApplication', ['ngRoute', 'myAngularApplication.dashBoardService', 'myAngularApplication.DashboardController']).config(config);
config.$inject = ['$routeProvider'];

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/dashboard.htm',
            controller: 'DashboardController'
        })

    .otherwise({
        redirectTo: '/'
    });
}