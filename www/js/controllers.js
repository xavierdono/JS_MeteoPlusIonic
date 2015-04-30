angular.module('starter.controllers', ['starter.services'])

.controller('WeatherController', ['$scope', '$http', '$state', 'WeatherService', 'RechercheService', function ($scope, $http, $state, WeatherService, RechercheService) {

    $scope.ucity = '';
    $scope.Math = Math;

    $scope.liste = RechercheService.getList();

    $scope.addCity = function (city) {
        $scope.ucity = city;
    };

    $scope.delete = function (city) {
        RechercheService.remove(city);
    };

    $scope.removeCity = function (city) {
        RechercheService.remove(city);
    };

    $scope.search = function () {
        //cordova.plugins.Keyboard.close();
        var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + $scope.ucity + "&mode=json&units=metric&cnt=10";
        $scope.loader = true;
        $http.get(url).success(onSuccess).error(onError);
    };

    $scope.geolocate = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            $scope.loader = true;
            $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&mode=json&units=metric&cnt=10").success(onSuccess).error(onError);
        });
    };

    var onSuccess = function (position) {
        $state.go('forecast');
        $scope.loader = false;

        RechercheService.appendList(position.city.name);
        WeatherService.setWeather(position);
    };

    function onError(error) {
        $scope.loader = false;
        alert('Impossible de récupérer les informations !');
    };
}])

.controller('ForeCastController', ['$scope', '$ionicModal', 'WeatherService', function ($scope, $ionicModal, WeatherService) {

    $scope.Math = Math;
    $scope.weather = WeatherService.getWeather();

    $ionicModal.fromTemplateUrl('templates/modal/detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function (item) {
        $scope.t = item;
        $scope.modal.show();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
}]);
