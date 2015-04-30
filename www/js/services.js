angular.module('starter.services', [])

.service('WeatherService', function Weather() {

    var weathers = '';

    var setWeather = function (weather) {
        weathers = weather;
    }

    var getWeather = function () {
        return weathers;
    }

    return {
        setWeather: setWeather,
        getWeather: getWeather
    };
})

.service('RechercheService', ['$localstorage', function Recherche($localstorage) {

    var recherche = $localstorage.getObject('cities');

    if (!recherche.length) {
        recherche = [];
    }

    var appendList = function (name) {

        var exist = true;

        for (var i = 0; i < recherche.length; i++) {
            if (recherche[i] == name) exist = false;
        }

        if (exist) {
            recherche.push(name);
            $localstorage.setObject('cities', recherche);
        }
    }

    var remove = function (name) {

        for (var i in recherche) {
            if (recherche[i] == name) {
                recherche.splice(i, 1);
                break;
            }
        }

        $localstorage.setObject('cities', recherche);
    }

    var getList = function () {
        return recherche;
    }

    return {
        appendList: appendList,
        getList: getList,
        remove: remove
    };
}])

.factory('$localstorage', ['$window', function ($window) {
    return {
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}]);
