angular.module('starter', ['ionic', 
    'starter.config',
    'starter.meteo',
    'starter.options'
])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.views.maxCache(0);

        $stateProvider

            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Meteo
            .state('tab.meteo', {
                url: '/meteo',
                views: {
                    'tab-meteo': {
                        templateUrl: 'meteo/meteo.html',
                        controller: 'MeteoCtrl as meteo'
                    }
                }
            })

            // Options
            .state('tab.options', {
                url: '/options',
                views: {
                    'tab-options': {
                        templateUrl: 'options/options.html',
                        controller: 'OptionsCtrl as options'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/meteo');

    });
