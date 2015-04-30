angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleLightContent();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('dash', {
            url: '/dash',
            templateUrl: 'templates/home.html',
            controller: 'WeatherController'
        }).state('forecast', {
            url: '/forecast',
            templateUrl: 'templates/forecast.html',
            controller: 'ForeCastController'
        });

    $urlRouterProvider.otherwise('/dash');
});
