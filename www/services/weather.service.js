(function () {
    'use strict';

    angular
        .module('starter.weather', ['starter.config'])
        .factory('Weather', Weather);

    Weather.inject = ['KEY', '$http', '$q'];

    function Weather(KEY, $http, $q) {

        var host_weather = "http://api.openweathermap.org/data/2.5/weather?units=metric&lang=fr&APPID=" + KEY.weather + "&q=";
        var host_forecast = "http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=fr&APPID=" + KEY.weather + "&q=";

        var service = {
            getWeather: getWeather,
            getForecastWeather: getForecastWeather
        };

        return service;

        ////////////////

        function getWeather(town) {
            var deferred = $q.defer();

            $http.get(host_weather + town).then(function (response) {
                deferred.resolve({
                    status: response.status,
                    main: response.data.main,
                    weather: response.data.weather[0]
                });
            }).catch(function (msg) {
                deferred.reject(msg);
            });

            return deferred.promise;
        }

        function getForecastWeather(town) {
            var deferred = $q.defer();

            $http.get(host_forecast + town).then(function (response) {
                deferred.resolve({
                    status: response.status,
                    name: response.data.city.name,
                    list: response.data.list
                });
            }).catch(function (msg) {
                deferred.reject(msg);
            });

            return deferred.promise;
        }
    }
})();